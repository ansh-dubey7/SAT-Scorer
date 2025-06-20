import express from "express"
import { getNotification, markAsRead, createNotification, getAllNotificaitions, deleteNotification } from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get('/notifications',authMiddleware, getNotification );
notificationRouter.put('/read/:id',authMiddleware, markAsRead );

notificationRouter.post('/',authMiddleware, createNotification );
notificationRouter.get('/',authMiddleware, getAllNotificaitions );
notificationRouter.delete('/:id',authMiddleware, deleteNotification );

export default notificationRouter