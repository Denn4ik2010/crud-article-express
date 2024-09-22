import { JWT_SECRET } from '../config/constants';
import IncorrectPasswordError from '../errors/incorrect-password.error';
import NotFoundError from '../errors/not-found.error';
import AlreadyExistsError from '../errors/user-alredy-exist.error';
import UserRepository from '../repository/user.repository';
import { IUser } from '../types/user.types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authService = {
    async registerUser(username: string, password: string): Promise<void> {
        const userExists: IUser | null = await this._checkUser(username);

        if (userExists) {
            throw new AlreadyExistsError('User already exist');
        } else {
            const hashedPassword = bcrypt.hashSync(password, 5);

            const userRole = await UserRepository.findRole("USER");

            await UserRepository.create(
                username,
                hashedPassword,
                userRole!.value as string
            );
        }
    },
    async _checkUser(username: string): Promise<IUser | null> {
        const findedUser: IUser | null = await UserRepository.findByUsername(
            username
        );

        return findedUser;
    },

    async login(username: string, password: string):Promise<string> {
        const user: IUser | null = await this._checkUser(username);
        if (!user) {
            throw new NotFoundError('User not found');
        } else {
            const validPassword: boolean = bcrypt.compareSync(
                password,
                user.password as string
            );
            if (!validPassword) {
                throw new IncorrectPasswordError('Incorrect password');
            } else {
                const token: string = await this._generateAccessToken(
                    user._id,
                    user.roles as string[]
                );
                return token;
            }
        }
    },

    async _generateAccessToken(id: string, roles: string[]): Promise<string> {
        const payload = { id, roles };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    },

    async getAllUsers(): Promise<IUser[]>{
        return await UserRepository.findAllUsers();
    }


};

export default authService;
