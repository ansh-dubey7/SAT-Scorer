import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Many-to-many with User
  type: { type: String, enum: ['announcement', 'reminder'], required: true },
  recipient: { type: String }, // e.g., specific user, all users
  link: { type: String }, // Optional course or live session link
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

NotificationSchema.index({ userId: 1 });

const NotificationModel = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

export default NotificationModel;