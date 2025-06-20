import mongoose from 'mongoose';
import { Cashfree } from 'cashfree-pg';
import crypto from 'crypto';
import PaymentModel from '../models/PaymentModel.js';
import UserModel from '../models/UserModel.js';
import CourseModel from '../models/CourseModel.js';
import EnrollmentModel from '../models/EnrollmentModel.js';

// Initialize Cashfree SDK
const cashfree = new Cashfree({
    appId: process.env.CASHFREE_APP_ID,
    secretKey: process.env.CASHFREE_SECRET_KEY,
    env: process.env.CASHFREE_ENV || 'sandbox'
});

// Initiate a payment (Authenticated users)
const initiatePayment = async (req, res) => {
    try {
        const { courseId, amount } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!courseId || !amount) {
            return res.status(400).json({ message: 'courseId and amount are required' });
        }

        // Validate IDs
        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Verify course exists
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Verify user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate amount
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }
        if (amount !== course.price) {
            return res.status(400).json({ message: 'Amount does not match course price' });
        }

        // Check if already enrolled
        const existingEnrollment = await EnrollmentModel.findOne({ userId, courseId, status: 'active' });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        // Create payment record
        const payment = new PaymentModel({
            userId,
            courseId,
            amount,
            status: 'pending',
            paymentDate: new Date()
        });
        await payment.save();

        // Create Cashfree order
        const orderId = `order_${payment._id}_${Date.now()}`;
        const order = {
            order_id: orderId,
            order_amount: amount,
            order_currency: 'INR',
            customer_details: {
                customer_id: userId,
                customer_name: user.name,
                customer_email: user.email,
                customer_phone: user.phone || '9999999999'
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL}/payment-status?order_id={order_id}&order_token={order_token}`,
                notify_url: `${req.protocol}://${req.get('host')}/api/payment/webhook`
            }
        };

        const cashfreeOrder = await cashfree.orders.create(order);

        if (!cashfreeOrder || !cashfreeOrder.payment_session_id) {
            await PaymentModel.findByIdAndUpdate(payment._id, { status: 'failed' });
            return res.status(500).json({ message: 'Failed to create Cashfree order' });
        }

        // Update user payments
        await UserModel.findByIdAndUpdate(userId, { $push: { payments: payment._id } });

        res.status(200).json({
            message: 'Payment initiated successfully',
            paymentSessionId: cashfreeOrder.payment_session_id,
            orderId: cashfreeOrder.order_id,
            payment
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ message: 'Server error while initiating payment', error: error.message });
    }
};

// Get user's payment history (Authenticated users)
const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const payments = await PaymentModel
            .find({ userId })
            .populate('userId', 'name email')
            .populate('courseId', 'title examType');

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payment history found for this user' });
        }

        res.status(200).json({
            message: 'Payment history retrieved successfully',
            count: payments.length,
            payments
        });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Server error while fetching payment history', error: error.message });
    }
};

// Get all payments (Admin only)
const getAllPayment = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const payments = await PaymentModel
            .find()
            .populate('userId', 'name email')
            .populate('courseId', 'title examType');

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payments found' });
        }

        res.status(200).json({
            message: 'All payments retrieved successfully',
            count: payments.length,
            payments
        });
    } catch (error) {
        console.error('Error fetching all payments:', error);
        res.status(500).json({ message: 'Server error while fetching all payments', error: error.message });
    }
};

// Get payments for a specific user (Admin only)
const getPaymentForAUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Verify user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const payments = await PaymentModel
            .find({ userId })
            .populate('userId', 'name email')
            .populate('courseId', 'title examType');

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this user' });
        }

        res.status(200).json({
            message: 'Payments for user retrieved successfully',
            count: payments.length,
            payments
        });
    } catch (error) {
        console.error('Error fetching payments for user:', error);
        res.status(500).json({ message: 'Server error while fetching payments', error: error.message });
    }
};

// Update payment status (Admin only or Webhook)
const updatePaymentStatus = async (req, res) => {
    try {
        // Check if request is from webhook (no authMiddleware for webhook)
        const isWebhook = req.headers['x-webhook-signature'];
        let paymentId;

        if (isWebhook) {
            // Webhook request
            const signature = req.headers['x-webhook-signature'];
            const rawBody = JSON.stringify(req.body);

            // Verify webhook signature
            const expectedSignature = crypto
                .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
                .update(rawBody)
                .digest('base64');

            if (signature !== expectedSignature) {
                return res.status(401).json({ message: 'Invalid webhook signature' });
            }

            const { data } = req.body;
            if (!data.order || !data.order.order_id) {
                return res.status(400).json({ message: 'Invalid webhook payload' });
            }

            // Extract paymentId from order_id (format: order_paymentId_timestamp)
            const orderIdParts = data.order.order_id.split('_');
            if (orderIdParts.length < 2) {
                return res.status(400).json({ message: 'Invalid order ID format' });
            }
            paymentId = orderIdParts[1];

        } else {
            // Admin request
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admin privileges required' });
            }
            paymentId = req.params.id;
        }

        if (!mongoose.isValidObjectId(paymentId)) {
            return res.status(400).json({ message: 'Invalid payment ID' });
        }

        const payment = await PaymentModel.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        let newStatus;
        if (isWebhook) {
            const { data } = req.body;
            const paymentStatus = data.payment && data.payment.payment_status;

            if (paymentStatus === 'SUCCESS') {
                newStatus = 'completed';
            } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
                newStatus = 'failed';
            } else {
                return res.status(400).json({ message: 'Unknown payment status' });
            }
        } else {
            // Admin manual update
            newStatus = req.body.status;
            if (!['pending', 'completed', 'failed'].includes(newStatus)) {
                return res.status(400).json({ message: 'Invalid status. Must be pending, completed, or failed' });
            }
        }

        // Update payment status
        payment.status = newStatus;
        await payment.save();

        // If payment is completed, create enrollment
        if (newStatus === 'completed' && payment.courseId) {
            const existingEnrollment = await EnrollmentModel.findOne({
                userId: payment.userId,
                courseId: payment.courseId,
                status: 'active'
            });

            if (!existingEnrollment) {
                const enrollment = new EnrollmentModel({
                    userId: payment.userId,
                    courseId: payment.courseId,
                    enrolledAt: new Date(),
                    status: 'active'
                });
                await enrollment.save();

                // Update course enrollments
                await CourseModel.findByIdAndUpdate(payment.courseId, {
                    $push: { enrollments: enrollment._id }
                });
                await UserModel.findByIdAndUpdate(payment.userId, {
                    $push: { enrolledCourses: enrollment._id }
                });
            }
        }

        res.status(200).json({
            message: 'Payment status updated successfully',
            payment
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Server error while updating payment status', error: error.message });
    }
};

export { initiatePayment, getPaymentHistory, getAllPayment, getPaymentForAUser, updatePaymentStatus };