import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import AlreadyExistsError from '../errors/user-alredy-exist.error';
import IncorrectPasswordError from '../errors/incorrect-password.error';
import NotFoundError from '../errors/not-found.error';
import { LoginUserModel, RegisterModel } from '../models/users-view.model';
import { BodyRequest } from '../types/request.types';
import RegisterDto from '../dto/register-user.dto';
import LoginDto from '../dto/login-user.dto';

const authController = {
    async register(
        req: BodyRequest<RegisterDto>,
        res: Response<RegisterModel>
    ): Promise<void> {
        try {
            const { username, password } = req.body;

            await AuthService.registerUser(username, password);
            res.status(201).json({ message: 'User created' });
        } catch (err: unknown) {
            if (err instanceof AlreadyExistsError) {
                res.status(400).json({ message: 'User already exist' });
            }
        }
    },

    async login(
        req: BodyRequest<LoginDto>,
        res: Response<LoginUserModel>
    ): Promise<void> {
        const { username, password } = req.body;

        try {
            const token: string = await AuthService.login(username, password);
            res.status(200).json({ token });
        } catch (error: unknown) {
            switch (true) {
                case error instanceof NotFoundError:
                    res.status(404).json({ message: 'User not found' });
                    break;
                case error instanceof IncorrectPasswordError:
                    res.status(400).json({ message: 'Incorret password' });
                    break;
            }
        }
    },
} as const;

export default authController;
