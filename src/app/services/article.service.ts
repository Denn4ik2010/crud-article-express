import ArticleRepository from '../repository/article.repository';
import { IArticle } from '../types/article.types';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';
import NotFoundError from '../errors/not-found.error';
import PermissionError from '../errors/Permission.error';

const articleService = {
    async findArticles(
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
    },
    async findArticleById(id: string): Promise<IArticle> {
        const article: IArticle | null = await ArticleRepository.findById(id);
        if (!article) {
            throw new NotFoundError('Article not found');
        } else {
            return article;
        }
    },
    async createArticle(
        createArticleDto: CreateArticleDto,
        authorId: string
    ): Promise<IArticle> {
        const article: IArticle = {
            title: createArticleDto.title,
            author: authorId,
            text: createArticleDto.text,
            date: new Date(),
        };

        const createdArticle: IArticle = await ArticleRepository.create(
            article
        );
        return createdArticle;
    },

    async updateArticle(
        id: string,
        updateArticleDto: UpdateArticleDto,
        authorId: string
    ): Promise<IArticle | null> {
        const article = await ArticleRepository.findById(id);

        if (!article) {
            throw new NotFoundError('Article not found');
        }

        if (article.author.toString() !== authorId) {
            throw new PermissionError('Not enough permission');
        }

        const updatedData: Partial<IArticle> = {
            ...updateArticleDto,
        };

        return await ArticleRepository.updateById(id, updatedData);
    },
    async deleteArticle(
        articleId: string,
        authorId: string
    ): Promise<IArticle> {
        const article = await ArticleRepository.findById(articleId);

        if (!article) {
            throw new NotFoundError('Article not found');
        }

        if (article.author !== authorId) {
            throw new PermissionError('Not enough permission');
        }

        const deletedArticle = await ArticleRepository.deleteById(articleId);

        if (!deletedArticle) {
            throw new NotFoundError('Article not found');
        }
        return deletedArticle;
    },
} as const;

export default articleService;
