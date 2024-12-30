import { config } from 'dotenv';

config();

export const PORT: number = parseInt(process.env.PORT!) || 3000;
export const DATABASE_URL: string = process.env.DATABASE_URL!;
export const JWT_SECRET: string = process.env.JWT_SECRET!;
