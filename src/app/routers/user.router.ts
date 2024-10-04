import { Router } from 'express';
import userController from '../controllers/user.controller';
import rolesMiddleware from '../middleware/roles.middleware';
import authMiddleware from '../middleware/auth.middleware';

const userRouter: Router = Router();

userRouter.get('/', authMiddleware, userController.getUsers);
userRouter.get('/:id', authMiddleware, userController.getUserById);

export default userRouter;
