import { collection as articleCollection } from '../db/db';
import {
    DeleteResult,
    InsertOneResult,
    ObjectId,
    UpdateResult,
    WithId,
} from 'mongodb';
import { IArticle } from '../types/article.types';

export default class ArticleRepository {
    static async findAll(
        offset: number,
        limit: number,
        title?: string,
        author?: string
    ): Promise<WithId<IArticle>[]> {
        const filter: { [key: string]: any } = {};
        // {[key: string] : any}

        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };

        return await articleCollection
            .find(filter)
            .skip(offset)
            .limit(limit)
            .toArray();
    }

    static async findById(id: string): Promise<WithId<IArticle> | null> {
        return await articleCollection.findOne({ _id: new ObjectId(id) });
    }

    static async create(article: IArticle): Promise<InsertOneResult<IArticle>> {
        return await articleCollection.insertOne(article);
    }

    static async updateById(
        id: string,
        updateData: Partial<IArticle>
    ): Promise<UpdateResult<IArticle>> {
        return await articleCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
    }
    static async deleteById(id: string): Promise<DeleteResult> {
        return await articleCollection.deleteOne({ _id: new ObjectId(id) });
    }
}
