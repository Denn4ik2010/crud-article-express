import ArticleRepository from '../repository/article-db.repository';
import { Article, ArticleOrNone, IArticle } from '../types/article.types';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';
import { DeleteResult, InsertOneResult, UpdateResult, WithId } from 'mongodb';

export class ArticleService {
    static async findArticles(
        page?: number,
        limit?: number,
        title?: string,
        author?: string
    ): Promise<Article[]> {
        const limitValue: number = limit ?? 10;
        const pageValue: number = page ?? 1;

        const offset: number = (pageValue - 1) * limitValue;
        const findedArticles: Article[] = await ArticleRepository.findAll(
            offset,
            limitValue,
            title,
            author
        );
        return findedArticles;
    }

    static async findArticleById(id: string): Promise<Article | null> {
        const article: ArticleOrNone = await ArticleRepository.findById(id);
        return article;
    }

    static async createArticle(
        createArticleDto: CreateArticleDto
    ): Promise<InsertOneResult<IArticle>> {
        const article: IArticle = {
            title: createArticleDto.title,
            author: createArticleDto.author,
            text: createArticleDto.text,
            date: new Date(),
        };

        const createdArticle: InsertOneResult<IArticle> =
            await ArticleRepository.create(article);
        return createdArticle;
    }

    static async updateArticle(
        id: string,
        updateArticleDto: UpdateArticleDto
    ): Promise<UpdateResult<IArticle>> {
        const article: Partial<IArticle> = {
            title: updateArticleDto.title,
            text: updateArticleDto.text,
        };

        const updatedArticle: UpdateResult<IArticle> =
            await ArticleRepository.updateById(id, article);
        return updatedArticle;
    }

    static async deleteArticle(id: string): Promise<DeleteResult> {
        const deletedArticle: DeleteResult = await ArticleRepository.deleteById(
            id
        );
        return deletedArticle;
    }
}
