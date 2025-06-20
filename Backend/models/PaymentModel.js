import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Many-to-one with User
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Many-to-one with Course
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  paymentDate: { type: Date },
}, { timestamps: true });

PaymentSchema.index({ userId: 1 });

const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default PaymentModel;