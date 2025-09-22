import express from 'express';
import userAuth from '../middleware/userAuth';
import { chatCompletionValidator } from '../controllers/authController';
import { generateChatCompletion } from '../controllers/chatController';
export const chatRouter = express.Router();

chatRouter.post('/chat',chatCompletionValidator, userAuth, generateChatCompletion);
export default chatRouter;