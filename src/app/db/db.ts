import { MongoClient, Db, Collection } from 'mongodb';
import { IArticle } from '../types/article.types';
import { config } from 'dotenv';

config();
const MONGO_URI = process.env.LOCAL_MONGO_URI!;

export const client = new MongoClient(MONGO_URI);
let db: Db;
export let collection: Collection<IArticle>;

export async function runDb() {
    try {
        await client.connect();
        db = client.db('Articles');
        collection = db.collection<IArticle>('articles');
        console.log(`INFO:    Connected to ${MONGO_URI}`);
    } catch (error) {
        console.error(`ERROR: Cannot connect to ${MONGO_URI}`, error);
        await client.close();
    }

    // .\mongo-db\mongo\bin
    // .\mongod.exe --dbpath .\data\db
}
