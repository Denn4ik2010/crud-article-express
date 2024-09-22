import { Schema, model } from 'mongoose';
import { IUserRole } from '../types/user.types';

const userRoleSchema: Schema<IUserRole> = new Schema<IUserRole>({
    value: { type: String, unique: true, default: 'USER' },
});

export default model<IUserRole>('Role', userRoleSchema);
