import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { userGetData } from '../controllers/userController.js';
import getUser from '../middleware/userMiddleware.js';

const userRouter = express.Router();
userRouter.get('/data', userAuth, userGetData )
userRouter.get('/user', getUser)

export default userRouter