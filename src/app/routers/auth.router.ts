import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';
import rolesMiddleware from '../middleware/roles.middleware';

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.get('/users', rolesMiddleware(['ADMIN']), AuthController.getUsers);

export default authRouter;
