import { Request, Response } from 'express';
import UserService from '../services/auth.service';
import AlreadyExistsError from '../errors/user-alredy-exist.error';
import IncorrectPasswordError from '../errors/incorrect-password.error';
import NotFoundError from '../errors/not-found.error';
import { IUser } from '../types/user.types';

const authController = {
    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            await UserService.registerUser(username, password);
            res.status(201).json({message: "User created"})
        } catch (err: unknown) {
            if (err instanceof AlreadyExistsError) {
                res.status(400).json({ message: 'User already exist' });
            }
        }
    },

    async login(req: Request, res: Response) {
        const {username, password} = req.body;

        try {
            const token: string = await UserService.login(username, password)
            res.status(200).json({token})
        } catch (error:unknown) {
            switch(true){
                case error instanceof NotFoundError:
                    res.status(404).json({message: 'User not found'})
                case error instanceof IncorrectPasswordError:
                    res.status(400).json({mesage: "Incorret password"})
            
                }
        }

    },

    async getUsers(req: Request, res: Response) {
        const users: IUser[] = await UserService.getAllUsers();
        
        res.status(200).json(users)
    }

};

export default authController;