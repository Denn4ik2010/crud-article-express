import { Response, Router } from 'express';
import { IArticle } from '../types/article.types';
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
    dateValidator,
} from '../middleware/input-validation.middlware';
import ArticleQueryModel from '../models/get-article-query.model';
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

const articleRouter: Router = Router();
articleRouter.use(validationResultMiddleware);

articleRouter.get(
    '/',
    queryAuthorValidator,
    queryTitleValidator,
    async (
        req: QueryRequest<ArticleQueryModel>,
        res: Response<ArticlesViewModel>
    ): Promise<void> => {
        const articles = await ArticleService.findArticles(
            req.query.title,
            req.query.author
        );
        res.json(articles);
    }
);

articleRouter.get(
    '/:id',
    idValidator,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleViewModel>
    ): Promise<void> => {
        const article = await ArticleService.findArticleById(req.params.id);
        if (!article) {
            res.status(404).json({ message: 'Article not found' });
        } else {
            res.json(article);
        }
    }
);

articleRouter.post(
    '/',
    titleValidator,
    authorValidator,
    textValidator,
    dateValidator,
    async (
        req: BodyRequest<CreateArticleDto>,
        res: Response<ArticleInsertResult>
    ): Promise<void> => {
        const createArticleDto: CreateArticleDto = req.body

        const newArticle = await ArticleService.createArticle(createArticleDto);
        res.status(201).json(newArticle);
    }
);

articleRouter.put(
    '/:id',
    idValidator,
    textValidator,
    titleValidator,
    async (
        req: BodyParamsRequest<UpdateArticleDto, ParamArticleIdModel>,
        res: Response<ArticleUpdateResult>
    ): Promise<void> => {
        const updateArticleDto: UpdateArticleDto = req.body;

        const updatedArticle = await ArticleService.updateArticle(
            req.params.id,
            updateArticleDto
        );
        if (!updatedArticle) {
            res.status(404).json({ message: 'Article not found' });
        } else {
            res.json(updatedArticle);
        }
    }
);

articleRouter.delete(
    '/:id',
    idValidator,
    async (
        req: ParamsRequest<ParamArticleIdModel>,
        res: Response<ArticleDeleteResult>
    ): Promise<void> => {
        const deletedArticle = await ArticleService.deleteArticle(
            req.params.id
        );
        if (!(deletedArticle.deletedCount === 1)) {
            res.status(404).json({ message: 'Article not found' });
        } else {
            res.json({ message: 'Article deleted' });
        }
    }
);

export default articleRouter;
