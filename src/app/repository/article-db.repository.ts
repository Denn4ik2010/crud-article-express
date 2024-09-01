import { collection as articleCollection, runDb } from '../db/db';
import { ObjectId } from 'mongodb';
import { IArticle } from '../types/article.types';

export default class ArticleRepository {
    static async findAll(title?: string, author?: string) {
        const filter: { [key: string]: any } = {};
        // {[key: string] : any}

        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };

        return await articleCollection.find(filter).toArray();
    }

    static async findById(id: string) {
        return await articleCollection.findOne({ _id: new ObjectId(id) });
    }

    static async create(article: IArticle) {
        return await articleCollection.insertOne(article);
    }

    static async updateById(id: string, updateData: Partial<IArticle>) {
        return await articleCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
    }
    static async deleteById(id: string) {
        return await articleCollection.deleteOne({ _id: new ObjectId(id) });
    }
}
