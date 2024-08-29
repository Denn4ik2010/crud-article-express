import { Response, Router } from 'express';
import {
    QueryRequest,
    BodyParamsRequest,
    ParamsRequest,
    BodyRequest,
} from '../types/request.types';
import { Article } from '../types/article.types';
import { ArticleOrNone } from '../types/article.types';

import { ArticleViewModel } from '../models/article-view.model';
import { ParamArticleIdModel } from '../models/uri-param-id.model';
import { ArticleQueryModel } from '../models/get-article-query.model';
import { CreateArticleModel } from '../models/create-article.model';
import { UpdateArticleModel } from '../models/update-article.model';
import { ProductRepository } from '../repository/article.repository';

import {
    idValidator,
    queryAuthorValidator,
    queryTitleValidator,
    textValidator,
    authorValidator,
    titleValidator,
    validationResultMiddleware,
} from '../middleware/input-validation.middware';

export const articleRouter: Router = Router();

articleRouter.get(
    '/',
    queryTitleValidator,
    queryAuthorValidator,
    validationResultMiddleware,
    async (
        req: QueryRequest<ArticleQueryModel>,
        res: Response<ArticleViewModel[]>
    ): Promise<void> => {
        const { title, author } = req.query;

        const findedArticles: Article[] = ProductRepository.findArticles(
            title,
            author
        );

        res.status(200).json(findedArticles);
    }
);

articleRouter.get(
    '/:id',
    idValidator,
    validationResultMiddleware,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const findedArticle: ArticleOrNone = ProductRepository.findArticleById(
            +req.params.id
        );

        if (!findedArticle) {
            res.sendStatus(404);
        } else {
            res.status(200).json(findedArticle);
        }
    }
);

articleRouter.post(
    '/',
    titleValidator,
    textValidator,
    authorValidator,
    validationResultMiddleware,
    async (
        req: BodyRequest<CreateArticleModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const { title, text, author } = req.body;

        const createdArticle = ProductRepository.createArticle(
            title,
            text,
            author
        );

        res.status(201).json(createdArticle);
    }
);

articleRouter.put(
    '/:id',
    idValidator,
    titleValidator,
    textValidator,
    validationResultMiddleware,
    async (
        req: BodyParamsRequest<UpdateArticleModel, ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const id: number = +req.params.id;
        const { title, text } = req.body;

        const updatedArticle = ProductRepository.updateArticle(id, title, text);

        if (updatedArticle) {
            res.status(200).json(updatedArticle);
        } else {
            res.sendStatus(400);
        }
    }
);

articleRouter.delete(
    '/:id',
    idValidator,
    validationResultMiddleware,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response
    ): Promise<void> => {
        const id: number = +req.params.id;

        const deletedArticleStatus: number =
            ProductRepository.deleteArticle(id);

        if (deletedArticleStatus === 204) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
);
