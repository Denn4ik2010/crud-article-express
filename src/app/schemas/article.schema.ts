import { Schema, model } from 'mongoose';
import { IArticle } from '../types/article.types';

const articleSchema: Schema<IArticle> = new Schema<IArticle>({
    title: { type: String, required: true },
    author: { type: String, ref: 'User', required: true },
    date: { type: Date, default: new Date() },
    text: { type: String, required: true },
});

export default model<IArticle>('Article', articleSchema);
