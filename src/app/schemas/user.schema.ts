import { Schema , model } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
});

export default model<IUser>("User" , userSchema)