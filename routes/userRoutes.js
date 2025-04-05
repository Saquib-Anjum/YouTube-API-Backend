import express from 'express';
import {signup ,login} from '../controllers/userController.js'
const userRouter = express.Router();

//all user routes
userRouter.post('/signup', signup);

userRouter.post('/login',login);
export default userRouter