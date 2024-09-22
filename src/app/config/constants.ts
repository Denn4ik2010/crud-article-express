import { config } from 'dotenv';

config();

export const PORT: number = parseInt(process.env.PORT!) || 3000;
export const MONGO_URI: string = process.env.LOCAL_MONGO_URI!;
export const JWT_SECRET: string = process.env.JWT_SECRET!;
