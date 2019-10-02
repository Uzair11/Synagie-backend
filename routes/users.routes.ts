import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { userValidate } from '../middlewares/user.validate';


export const userRouter = Router();

userRouter.post('/register', userValidate.forRegister, UserController.register);
userRouter.post('/login', userValidate.forLogin, UserController.login);
userRouter.get('/user', UserController.get);
userRouter.get('/users', UserController.getAll);
userRouter.put('/password', UserController.updateUserPassword);
userRouter.put('/resetpassword', UserController.resetUserPassword);
