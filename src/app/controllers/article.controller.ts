import {
    BodyParamsRequest,
    BodyRequest,
    ParamsRequest,
    QueryRequest,
} from '../types/request.types';
import GetArticleQueryModel from '../models/get-article-query.model';
import {
    ArticleDeleteResult,
    ArticleInsertResult,
    ArticlesViewModel,
    ArticleUpdateResult,
    ArticleViewModel,
} from '../models/articles-views.model';
import { Response } from 'express';
import { IArticle } from '../types/article.types';
import ArticleService from '../services/article.service';
import ParamArticleIdModel from '../models/article-id-uri-param.model';
import NotFoundError from '../errors/not-found.error';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';
import PermissionError from '../errors/Permission.error';

const articleController = {
    async getArticles(
        req: QueryRequest<GetArticleQueryModel>,
        res: Response<ArticlesViewModel>
    ): Promise<void> {
        try {
            const articles: IArticle[] = await ArticleService.findArticles(
                req.query.page,
                req.query.limit,
                req.query.title,
                req.query.author
            );
            res.json(articles);
        } catch (err: unknown) {
            res.sendStatus(500);
            console.error(err);
        }
    },

    async getArticleById(
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> {
        try {
            const article: IArticle = await ArticleService.findArticleById(
                req.params.id
            );
            res.json(article);
        } catch (err: unknown) {
            if (err instanceof NotFoundError) {
                res.status(404).json({ message: 'Article not found' });
                console.error(err);
            } else {
                res.sendStatus(500);
                console.error('Unknown error:', err);
            }
        }
    },

    async createArticle(
        req: BodyRequest<CreateArticleDto>,
        res: Response<ArticleInsertResult>
    ): Promise<void> {
        try {
            const createArticleDto: CreateArticleDto = req.body;

            console.log('Creating article with data:', createArticleDto);

            const newArticle: IArticle = await ArticleService.createArticle(
                createArticleDto,
                (req as any).user.id
            );

            console.log('Article created:', newArticle);
            res.status(201).json(newArticle);
        } catch (err: unknown) {
            console.error('Error during article creation:', err);
            res.sendStatus(500);
        }
    },
    async updateArticle(
        req: BodyParamsRequest<UpdateArticleDto, ParamArticleIdModel>,
        res: Response<ArticleUpdateResult>
    ): Promise<void> {
        try {
            const updateArticleDto: UpdateArticleDto = req.body;

            const updatedArticle: IArticle | null =
                await ArticleService.updateArticle(
                    req.params.id,
                    updateArticleDto,
                    (req as any).user.id
                );
            if (!updatedArticle) {
                res.status(404).json({ message: 'Article not found' });
            } else {
                res.json(updatedArticle);
            }
        } catch (err: unknown) {
            switch (true) {
                case err instanceof NotFoundError:
                    console.error(err);
                    res.status(404).json({ message: 'Article not found' });
                case err instanceof PermissionError:
                    res.status(403).json({ message: 'unathorizaed' });
                    console.error(err);
            }
        }
    },

    async deleteArticle(
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleDeleteResult>
    ): Promise<void> {
        try {
            const deletedArticle = await ArticleService.deleteArticle(
                req.params.id,
                (req as any).user.id
            );
            res.status(200).json(deletedArticle);
        } catch (err: unknown) {
            switch (true) {
                case err instanceof NotFoundError:
                    console.error(err);
                    res.status(404).json({ message: 'Artile not found' });
                case err instanceof PermissionError:
                    console.error(err);
                    res.status(403).json({ message: 'unathorizaeed' });
            }
        }
    },
} as const;

export default articleController;
