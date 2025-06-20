import mongoose from 'mongoose';
import NotificationModel from '../models/NotificationModel.js';
import UserModel from '../models/UserModel.js';

// Get notifications for the authenticated user (Authenticated users)
const getNotification = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const notifications = await NotificationModel
            .find({ userId: userId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        res.status(200).json({
            message: 'Notifications retrieved successfully',
            count: notifications.length,
            notifications
        });
    } catch (error) {
        console.error('Error fetching user notifications:', error);
        res.status(500).json({ message: 'Server error while fetching notifications', error: error.message });
    }
};

// Mark a notification as read (Authenticated users)
const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = req.params.id;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!mongoose.isValidObjectId(notificationId)) {
            return res.status(400).json({ message: 'Invalid notification ID' });
        }

        const notification = await NotificationModel.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Check if user is a recipient
        if (!notification.userId.some(id => id.toString() === userId)) {
            return res.status(403).json({ message: 'Access denied. You are not a recipient of this notification' });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({
            message: 'Notification marked as read successfully',
            notification
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ message: 'Server error while marking notification as read', error: error.message });
    }
};

// Create a new notification (Admin only)
const createNotification = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const { title, message, type, recipient, link } = req.body;

        // Validate required fields
        if (!title || !message || !type) {
            return res.status(400).json({ message: 'title, message, and type are required' });
        }

        if (!['announcement', 'reminder'].includes(type)) {
            return res.status(400).json({ message: 'Type must be announcement or reminder' });
        }

        let userIds = [];

        // Handle recipient
        if (recipient === 'all') {
            const users = await UserModel.find({ status: 'active' }).select('_id');
            userIds = users.map(user => user._id);
        } else if (recipient) {
            if (!mongoose.isValidObjectId(recipient)) {
                return res.status(400).json({ message: 'Invalid recipient user ID' });
            }
            const user = await UserModel.findById(recipient);
            if (!user) {
                return res.status(404).json({ message: 'Recipient user not found' });
            }
            userIds = [recipient];
        } else {
            return res.status(400).json({ message: 'Recipient must be specified (all or a user ID)' });
        }

        // Create notification
        const notification = new NotificationModel({
            title,
            message,
            userId: userIds,
            type,
            recipient: recipient || 'all',
            link,
            isRead: false
        });

        await notification.save();

        // Update users' notifications
        await UserModel.updateMany(
            { _id: { $in: userIds } },
            { $push: { notifications: notification._id } }
        );

        res.status(201).json({
            message: 'Notification created successfully',
            notification
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Server error while creating notification', error: error.message });
    }
};

// Get all notifications (Admin only)
const getAllNotificaitions = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const notifications = await NotificationModel
            .find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found' });
        }

        res.status(200).json({
            message: 'All notifications retrieved successfully',
            count: notifications.length,
            notifications
        });
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Server error while fetching all notifications', error: error.message });
    }
};

// Delete a notification (Admin only)
const deleteNotification = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const notificationId = req.params.id;
        if (!mongoose.isValidObjectId(notificationId)) {
            return res.status(400).json({ message: 'Invalid notification ID' });
        }

        const notification = await NotificationModel.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Remove notification from users
        await UserModel.updateMany(
            { notifications: notificationId },
            { $pull: { notifications: notificationId } }
        );

        await NotificationModel.findByIdAndDelete(notificationId);

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Server error while deleting notification', error: error.message });
    }
};

export { getNotification, markAsRead, createNotification, getAllNotificaitions, deleteNotification };