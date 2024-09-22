import { IArticle } from '../types/article.types';
import ArticleModel from '../schemas/article.schema';
import { ObjectId } from 'mongodb';

export default class ArticleRepository {
    static async findAll(
        offset: number,
        limit: number,
        title?: string,
        author?: string
    ): Promise<IArticle[]> {
        const filter: { [key: string]: any } = {};

        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };

        return await ArticleModel.find(filter).skip(offset).limit(limit);
    }

    static async findById(id: string): Promise<IArticle | null> {
        return await ArticleModel.findOne({ _id: new ObjectId(id) });
    }

    static async create(article: IArticle): Promise<IArticle> {
        const articleModel = new ArticleModel(article);
        return await articleModel.save();
    }

    static async updateById(
        id: string,
        updateData: Partial<IArticle>
    ): Promise<IArticle | null> {
        return await ArticleModel.findByIdAndUpdate(id, updateData);
    }
    static async deleteById(id: string): Promise<IArticle | null> {
        return await ArticleModel.findOneAndDelete({_id: new ObjectId(id)})
    }
}
