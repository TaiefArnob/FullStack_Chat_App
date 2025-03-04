import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getUser, getMessages, sendMessage } from '../controllers/messageController.js';

export const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUser);
messageRouter.get('/:id', protectRoute, getMessages);  // Add missing getMessages function
messageRouter.post('/send/:id', protectRoute, sendMessage); // Add missing sendMessage function
