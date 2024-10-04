import NotFoundError from '../errors/not-found.error';
import UserRepository from '../repository/user.repository';
import { IUser } from '../types/user.types';

const userService = {
    async getAllUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
        const offset: number = (page - 1) * limit;
        return await UserRepository.findAllUsers(offset, limit);
    },

    async getUserById(id: string): Promise<IUser> {
        const user: IUser | null = await UserRepository.findById(id);

        if (!user) {
            throw new NotFoundError('User not found');
        } else {
            return user;
        }
    },
} as const;

export default userService;
