import { Response, Router } from 'express';
import { ArticleService } from '../services/article.service';
import {
    BodyParamsRequest,
    BodyRequest,
    ParamsRequest,
    QueryRequest,
} from '../types/request.types';
import {
    validationResultMiddleware,
    idValidator,
    queryAuthorValidator,
    queryTitleValidator,
    authorValidator,
    titleValidator,
    textValidator,
    queryLimitValidator,
    queryPageValidator,
} from '../middleware/input-validation.middlware';
import GetArticleQueryModel from '../models/get-article-query.model';
import ParamArticleIdModel from '../models/uri-param-id.model';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';
import {
    ArticleViewModel,
    ArticlesViewModel,
    ArticleInsertResult,
    ArticleUpdateResult,
    ArticleDeleteResult,
} from '../models/articles-views.model';
import { BSONError } from 'bson';
import { Article, IArticle } from '../types/article.types';
import { InsertOneResult, UpdateResult } from 'mongodb';

const articleRouter: Router = Router();

articleRouter.get(
    '/',
    queryAuthorValidator,
    queryTitleValidator,
    queryLimitValidator,
    queryPageValidator,
    validationResultMiddleware,
    async (
        req: QueryRequest<GetArticleQueryModel>,
        res: Response<ArticlesViewModel>
    ): Promise<void> => {
        try {
            const { author, title, limit, page } = req.query;

            const articles: Article[] = await ArticleService.findArticles(
                page,
                limit,
                title,
                author
            );
            res.json(articles);
        } catch (err: unknown) {
            if (err instanceof BSONError) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.sendStatus(500);
                console.error(err);
            }
        }
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
        try {
            const article: Article | null =
                await ArticleService.findArticleById(req.params.id);
            if (!article) {
                res.status(404).json({ message: 'Article not found' });
            } else {
                res.json(article);
            }
        } catch (err: unknown) {
            if (err instanceof BSONError) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.sendStatus(500);
                console.error(err);
            }
        }
    }
);

articleRouter.post(
    '/',
    titleValidator,
    authorValidator,
    textValidator,
    validationResultMiddleware,
    async (
        req: BodyRequest<CreateArticleDto>,
        res: Response<ArticleInsertResult>
    ): Promise<void> => {
        try {
            const createArticleDto: CreateArticleDto = req.body;

            const newArticle: InsertOneResult<IArticle> =
                await ArticleService.createArticle(createArticleDto);
            res.status(201).json(newArticle);
        } catch (err: unknown) {
            if (err instanceof BSONError) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.sendStatus(500);
                console.error(err);
            }
        }
    }
);

articleRouter.put(
    '/:id',
    idValidator,
    textValidator,
    titleValidator,
    validationResultMiddleware,
    async (
        req: BodyParamsRequest<UpdateArticleDto, ParamArticleIdModel>,
        res: Response<ArticleUpdateResult>
    ): Promise<void> => {
        try {
            const updateArticleDto: UpdateArticleDto = req.body;

            const updatedArticle: UpdateResult<IArticle> =
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
            if (err instanceof BSONError) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.sendStatus(500);
                console.error(err);
            }
        }
    }
);

articleRouter.delete(
    '/:id',
    idValidator,
    validationResultMiddleware,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleDeleteResult>
    ): Promise<void> => {
        try {
            const deletedArticle = await ArticleService.deleteArticle(
                req.params.id
            );
            if (!(deletedArticle.deletedCount === 1)) {
                res.status(404).json({ message: 'Article not found' });
            } else {
                res.json({ message: 'Article deleted' });
            }
        } catch (err: unknown) {
            if (err instanceof BSONError) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                res.sendStatus(500);
                console.error(err);
            }
        }
    }
);

export default articleRouter;
