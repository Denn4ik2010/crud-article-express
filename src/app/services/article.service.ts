import ArticleRepository from '../repository/article.repository';
import { IArticle } from '../types/article.types';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';
import NotFoundError from '../errors/not-found.error';

export class ArticleService {
    static async findArticles(
        page: number = 1,
        limit: number = 10,
        title?: string,
        author?: string
    ): Promise<IArticle[]> {
        const offset: number = (page - 1) * limit;
        const findedArticles: IArticle[] = await ArticleRepository.findAll(
            offset,
            limit,
            title,
            author
        );
        return findedArticles;
    }

    static async findArticleById(id: string): Promise<IArticle> {
        const article: IArticle | null = await ArticleRepository.findById(id);
        if (!article) {
            throw new NotFoundError('Article not found');
        } else {
            return article;
        }
    }

    static async createArticle(
        createArticleDto: CreateArticleDto
    ): Promise<IArticle> {
        const article: IArticle = {
            title: createArticleDto.title,
            author: createArticleDto.author,
            text: createArticleDto.text,
            date: new Date(),
        };

        const createdArticle: IArticle = await ArticleRepository.create(article);
        return createdArticle;
    }

    static async updateArticle(
        id: string,
        updateArticleDto: UpdateArticleDto
    ): Promise<IArticle | null> {
        const article: Partial<IArticle> = {
            ...updateArticleDto,
        };

        const updatedArticle: IArticle | null =
            await ArticleRepository.updateById(id, article);
        return updatedArticle;
    }

    static async deleteArticle(id: string): Promise<IArticle> {
        const deletedArticle: IArticle | null =
            await ArticleRepository.deleteById(id);

        if (!deletedArticle) {
            throw new NotFoundError('Article not found');
        } else {
            return deletedArticle;
        }
    }
}
