import mongoose from 'mongoose';
import { DATABASE_URL } from '../config/constants';

export async function runDb() {
    mongoose
        .connect(DATABASE_URL, {
            serverSelectionTimeoutMS: 5000, // Устанавливает максимальный таймаут для подключения
        })
        .then(() => {
            console.log(`Connected to ${DATABASE_URL}`);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });

    // .\mongo-db\mongo\bin
    // .\mongod.exe --dbpath .\data\db
}