import mongoose from 'mongoose';
import { MONGO_URI } from '../config/constants';

export async function runDb() {
    mongoose
        .connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Устанавливает максимальный таймаут для подключения
        })
        .then(() => {
            console.log(`Connected to ${MONGO_URI}`);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });

    // .\mongo-db\mongo\bin
    // .\mongod.exe --dbpath .\data\db
}
