import UserModel from '../schemas/user.schema';
import UserRoleModel from '../schemas/user-role.schema';
import { IUser } from '../types/user.types';

export default class UserRepository {
    static async findRole(value: string) {
        return await UserRoleModel.findOne({ value });
    }

    static async findByUsername(username: string): Promise<IUser | null> {
        return await UserModel.findOne({ username });
    }

    static async create(
        username: string,
        password: string,
        role: string
    ): Promise<IUser> {
        const newUser = new UserModel({ username, password, roles: [role] });

        return await newUser.save();
    }

    static async findAllUsers(): Promise<IUser[]> {
        return await UserModel.find({});
    }
}
