import { Request, Response, Router } from 'express';
import {
    QueryRequest,
    BodyParamsRequest,
    ParamsRequest,
    BodyRequest,
} from '../types/request-types';
import { Article } from '../types/article-types';
import { ArticleOrNone } from '../types/article-types';

import { ArticleViewModel } from '../models/article-view.model';
import { ParamArticleIdModel } from '../models/uri-param-id.model';
import { ArticleQueryModel } from '../models/get-article-query.model';
import { CreateArticleModel } from '../models/create-article.model';
import { UpdateArticleModel } from '../models/update-article.model';
import { getUniqueId } from '../utils/unique_id';
import db from '../db/db';

export const articleRouter: Router = Router();
articleRouter.get(
    '/',
    async (
        req: QueryRequest<ArticleQueryModel>,
        res: Response<ArticleViewModel[]>
    ) => {
        let foundedArticles: Article[] = db.articles;

        if (req.query.title && req.query.author) {
            // Articles filtered by author
            foundedArticles = foundedArticles.filter(
                (a) => a.author.indexOf(req.query.author) > -1
            );

            // Articles filtered by title
            foundedArticles = foundedArticles.filter(
                (a) => a.title.indexOf(req.query.title) > -1
            );

            res.status(200).json(foundedArticles);
        } else if (req.query.author) {
            foundedArticles = foundedArticles.filter(
                (a) => a.author.indexOf(req.query.author) > -1
            );

            res.status(200).json(foundedArticles);
        } else if (req.query.title) {
            foundedArticles = foundedArticles.filter(
                (a) => a.title.indexOf(req.query.title) > -1
            );

            res.status(200).json(foundedArticles);
        } else {
            // Send response only once
            res.status(200).json(foundedArticles);
        }
    }
);

articleRouter.get(
    '/:id',
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ) => {
        const findedArticle: ArticleOrNone = db.articles.find(
            (val) => val.id === +req.params.id
        );

        if (!findedArticle) {
            return res.sendStatus(404);
        } else {
            return res.status(200).json(findedArticle);
        }
    }
);

articleRouter.post(
    '/',
    async (
        req: BodyRequest<CreateArticleModel>,
        res: Response<ArticleViewModel>
    ) => {
        const { title, text, author } = req.body;

        if (title && author && text) {
            const article: Article = { id: getUniqueId(), title, text, author };
            db.articles.push(article);

            return res.status(201).json(article);
        } else {
            return res.sendStatus(400);
        }
    }
);

articleRouter.put(
    '/:id',
    async (
        req: BodyParamsRequest<UpdateArticleModel, ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ) => {
        const id: number = +req.params.id;
        const { title, text } = req.body;

        if (!text || !title) {
            return res.sendStatus(400);
        }

        const article: ArticleOrNone = db.articles.find((val) => val.id === id);

        if (article) {
            article.title = title;
            article.text = text;

            return res.status(200).json(article);
        } else {
            return res.sendStatus(404);
        }
    }
);

articleRouter.delete(
    '/:id',
    async (req: ParamsRequest<ParamArticleIdModel>, res: Response) => {
        const id: number = +req.params.id;

        const articleIndex: number = db.articles.findIndex(
            (val) => val.id === id
        );

        if (articleIndex !== -1) {
            db.articles.splice(articleIndex, 1);
            return res.sendStatus(204);
        } else {
            return res.sendStatus(404);
        }
    }
);
