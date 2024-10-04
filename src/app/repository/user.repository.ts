import UserModel from '../schemas/user.schema';
import UserRoleModel from '../schemas/user-role.schema';
import { IUser } from '../types/user.types';

const userRepository = {
    async findAllUsers(offset: number, limit: number): Promise<IUser[]> {
        return await UserModel.find({}).skip(offset).limit(limit);
    },
    async findById(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ _id: id });
    },

    async findRole(value: string) {
        return await UserRoleModel.findOne({ value });
    },
    async findByUsername(username: string): Promise<IUser | null> {
        return await UserModel.findOne({ username });
    },
    async create(
        username: string,
        password: string,
        role: string
    ): Promise<IUser> {
        const newUser = new UserModel({ username, password, roles: [role] });

        return await newUser.save();
    },
} as const;

export default userRepository;
