import express from "express"
import { initiatePayment, getPaymentHistory, getAllPayment, getPaymentForAUser, updatePaymentStatus } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post('/',authMiddleware, initiatePayment );
paymentRouter.get('/mypayments',authMiddleware, getPaymentHistory );

paymentRouter.get('/',authMiddleware, getAllPayment );
paymentRouter.get('/user/:userId',authMiddleware, getPaymentForAUser );
paymentRouter.put('/:id',authMiddleware, updatePaymentStatus );

export default paymentRouter