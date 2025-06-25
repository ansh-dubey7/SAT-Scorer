import mongoose from 'mongoose';
import NotificationModel from '../models/NotificationModel.js';
import UserModel from '../models/UserModel.js';
import CourseModel from '../models/CourseModel.js';
import { emitNotification } from '../utils/Socket.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import EnrollmentModel from '../models/EnrollmentModel.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { oauth2Client, getAccessToken } from '../config/googleAuth.js';

const getNotification = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const notifications = await NotificationModel
      .find({ userId: userId, status: 'sent' })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found for this user' });
    }

    res.status(200).json({
      message: 'Notifications retrieved successfully',
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({ message: 'Server error while fetching notifications', error: error.message });
  }
};

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

    if (!notification.userId.some(id => id.toString() === userId)) {
      return res.status(403).json({ message: 'Access denied. You are not a recipient of this notification' });
    }

    if (!notification.readBy.includes(userId)) {
      notification.readBy.push(userId);
      await notification.save();
    }

    await UserModel.updateOne(
      { _id: userId },
      { $pull: { notifications: notificationId } }
    );

    if (notification.readBy.length === notification.userId.length) {
      if (notification.image) {
        await deleteFromCloudinary(notification.image);
      }
      await NotificationModel.findByIdAndDelete(notificationId);
      return res.status(200).json({
        message: 'Notification marked as read and deleted from database as all users have read it',
      });
    }

    res.status(200).json({
      message: 'Notification marked as read successfully',
      notification,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error while marking notification as read', error: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required' });
    }

    const { title, message, type, recipient, audienceType, scheduledAt, channel } = req.body;

    if (!title || !message || !type || !audienceType || !channel) {
      return res.status(400).json({ message: 'Title, message, type, audience type, and channel are required' });
    }

    if (!['announcement', 'reminder'].includes(type)) {
      return res.status(400).json({ message: 'Type must be announcement or reminder' });
    }

    if (!['all', 'course', 'student'].includes(audienceType)) {
      return res.status(400).json({ message: 'Invalid audience type' });
    }

    if (!['in-app', 'email'].includes(channel)) {
      return res.status(400).json({ message: 'Invalid notification channel' });
    }

    let userIds = [];
    let recipientValue = recipient;
    let emailAddresses = [];

    if (audienceType === 'all') {
      const users = await UserModel.find({ status: 'active', role: 'student' }).select('_id email');
      userIds = users.map(user => user._id);
      emailAddresses = users.map(user => user.email);
      recipientValue = 'all';
    } else if (audienceType === 'course') {
      if (!mongoose.isValidObjectId(recipient)) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }
      const course = await CourseModel.findById(recipient);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      const enrollments = await EnrollmentModel.find({ courseId: recipient }).populate('userId');
      const activeStudents = enrollments
        .map(enrollment => enrollment.userId)
        .filter(user => user.status === 'active' && user.role === 'student');
      userIds = activeStudents.map(user => user._id);
      emailAddresses = activeStudents.map(user => user.email);
      if (userIds.length === 0) {
        return res.status(400).json({ message: 'No active students enrolled in this course' });
      }
    } else if (audienceType === 'student') {
      if (!mongoose.isValidObjectId(recipient)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }
      const user = await UserModel.findById(recipient);
      if (!user || user.status !== 'active' || user.role !== 'student') {
        return res.status(404).json({ message: 'Active student not found' });
      }
      userIds = [recipient];
      emailAddresses = [user.email];
    }

    let imageUrl = '';
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.path, 'SATscorer/notifications');
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ message: 'Error uploading image', error: uploadError.message });
      }
    }

    const notification = new NotificationModel({
      title,
      message,
      image: imageUrl,
      userId: userIds,
      readBy: [],
      type,
      recipient: recipientValue,
      scheduledAt: channel === 'in-app' && scheduledAt ? new Date(scheduledAt) : null,
      status: channel === 'in-app' && scheduledAt ? 'pending' : 'sent',
      channel,
    });

    await notification.save();

    await UserModel.updateMany(
      { _id: { $in: userIds } },
      { $push: { notifications: notification._id } }
    );

    if (channel === 'email') {
      try {
        const accessToken = await getAccessToken();
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: emailAddresses.join(','),
          subject: title,
          text: message,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>${title}</h2>
              ${imageUrl ? `<img src="${imageUrl}" alt="Notification Image" style="max-width: 100%; height: auto; margin: 10px 0;" />` : ''}
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Save notification as failed if email sending fails
        notification.status = 'failed';
        await notification.save();
        return res.status(500).json({ message: 'Failed to send email', error: emailError.message });
      }
    } else if (channel === 'in-app' && !scheduledAt) {
      emitNotification(userIds.map(id => id.toString()), notification);
    }

    res.status(201).json({
      message: channel === 'email' ? 'Email notification sent successfully' : (scheduledAt ? 'Notification scheduled successfully' : 'Notification created successfully'),
      notification,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Server error while creating notification', error: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required' });
    }

    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const notifications = await NotificationModel
      .find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    const enrichedNotifications = await Promise.all(notifications.map(async (notification) => {
      let recipientDetails = {};
      if (notification.recipient === 'all') {
        recipientDetails = { type: 'all', value: 'All Students' };
      } else if (mongoose.isValidObjectId(notification.recipient)) {
        const course = await CourseModel.findById(notification.recipient);
        if (course) {
          recipientDetails = { type: 'course', value: course.title };
        } else {
          const user = await UserModel.findById(notification.recipient);
          if (user) {
            recipientDetails = { type: 'student', value: user.name };
          }
        }
      }
      return { ...notification.toObject(), recipientDetails };
    }));

    res.status(200).json({
      message: 'All notifications retrieved successfully',
      count: enrichedNotifications.length,
      notifications: enrichedNotifications,
    });
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    res.status(500).json({ message: 'Server error while fetching all notifications', error: error.message });
  }
};

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

    if (notification.image) {
      await deleteFromCloudinary(notification.image);
    }

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

const resendNotification = async (req, res) => {
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

    notification.status = 'sent';
    notification.createdAt = new Date();
    notification.readBy = [];
    await notification.save();

    await UserModel.updateMany(
      { _id: { $in: notification.userId } },
      { $push: { notifications: notification._id } }
    );

    if (notification.channel === 'email') {
      const users = await UserModel.find({ _id: { $in: notification.userId } }).select('email');
      const emailAddresses = users.map(user => user.email);

      try {
        const accessToken = await getAccessToken();
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: emailAddresses.join(','),
          subject: notification.title,
          text: notification.message,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>${notification.title}</h2>
              ${notification.image ? `<img src="${notification.image}" alt="Notification Image" style="max-width: 100%; height: auto; margin: 10px 0;" />` : ''}
              <p>${notification.message.replace(/\n/g, '<br>')}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Error resending email:', emailError);
        notification.status = 'failed';
        await notification.save();
        return res.status(500).json({ message: 'Failed to resend email', error: emailError.message });
      }
    } else {
      emitNotification(notification.userId.map(id => id.toString()), notification);
    }

    res.status(200).json({
      message: 'Notification resent successfully',
      notification,
    });
  } catch (error) {
    console.error('Error resending notification:', error);
    res.status(500).json({ message: 'Server error while resending notification', error: error.message });
  }
};

export { getNotification, markAsRead, createNotification, getAllNotifications, deleteNotification, resendNotification };
