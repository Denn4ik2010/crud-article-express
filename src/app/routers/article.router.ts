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
} from '../middleware/input-validation.middlware';

export const articleRouter: Router = Router();
articleRouter.use(validationResultMiddleware)

articleRouter.get(
    '/',
    queryTitleValidator,
    queryAuthorValidator,
    async (
        req: QueryRequest<ArticleQueryModel>,
        res: Response<ArticleViewModel[]>
    ): Promise<void> => {
        const { title, author } = req.query;

        const findedArticles: Article[] = await ProductRepository.findArticles(
            title,
            author
        );

        res.status(200).json(findedArticles);
    }
);

articleRouter.get(
    '/:id',
    idValidator,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const findedArticle: ArticleOrNone =
            await ProductRepository.findArticleById(+req.params.id);

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
    async (
        req: BodyRequest<CreateArticleModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const { title, text, author } = req.body;

        const createdArticle = await ProductRepository.createArticle(
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
    async (
        req: BodyParamsRequest<UpdateArticleModel, ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const id: number = +req.params.id;
        const { title, text } = req.body;

        const updatedArticle = await ProductRepository.updateArticle(
            id,
            title,
            text
        );

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
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response
    ): Promise<void> => {
        const id: number = +req.params.id;

        const deletedArticleStatus: number =
            await ProductRepository.deleteArticle(id);

        if (deletedArticleStatus === 204) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
);
