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
import { ArticleService } from '../services/article.service';
import ParamArticleIdModel from '../models/article-id-uri-param.model';
import NotFoundError from '../errors/not-found.error';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';

export default class ArticleController {
    static async getArticles(
        req: QueryRequest<GetArticleQueryModel>,
        res: Response<ArticlesViewModel>
    ) {
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
    }

    static async getArticleById(
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ) {
        try {
            const article: IArticle = await ArticleService.findArticleById(
                req.params.id
            );
            res.json(article);
        } catch (err: unknown) {
            if( err instanceof NotFoundError){
                res.status(404).json({ message: 'Article not found' });
                console.error(err);
            } else {
                res.sendStatus(500);
                    console.error('Unknown error:', err);
            }

        }
    }

    static async createArticle(
        req: BodyRequest<CreateArticleDto>,
        res: Response<ArticleInsertResult>
    ): Promise<void> {
        try {
            const createArticleDto: CreateArticleDto = req.body;

            const newArticle: IArticle = await ArticleService.createArticle(
                createArticleDto
            );
            res.status(201).json(newArticle);
        } catch (err: unknown) {
            res.sendStatus(500);
            console.error(err);
        }
    }

    static async updateArticle(
        req: BodyParamsRequest<UpdateArticleDto, ParamArticleIdModel>,
        res: Response<ArticleUpdateResult>
    ): Promise<void> {
        try {
            const updateArticleDto: UpdateArticleDto = req.body;

            const updatedArticle: IArticle | null =
                await ArticleService.updateArticle(
                    req.params.id,
                    updateArticleDto
                );
            if (!updatedArticle) {
                res.status(404).json({ message: 'Article not found' });
            } else {
                res.json(updatedArticle);
            }
        } catch (err: unknown) {
            if (err instanceof NotFoundError) {
                res.status(404).json({message: "Article not found"})
            }
                res.sendStatus(500);
                console.error(err);
        }
    }

    static async deleteArticle(
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleDeleteResult>
    ): Promise<void> {
        try {
            const deletedArticle = await ArticleService.deleteArticle(
                req.params.id
            );
            res.json(deletedArticle);
        } catch (err: unknown) {
                if (err instanceof NotFoundError){
                    res.status(404).json({message: "Artile not found"})
                }
            }
        }
    }
