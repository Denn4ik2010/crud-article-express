import { Router } from 'express';
import validationResultMiddleware, {
    idValidator,
    queryAuthorValidator,
    queryTitleValidator,
    authorValidator,
    titleValidator,
    textValidator,
    queryLimitValidator,
    queryPageValidator,
} from '../middleware/input-validation.middlware';
import ArticleController from '../controllers/article.controller'

const articleRouter: Router = Router();

articleRouter.get(
    '/',
    queryAuthorValidator,
    queryTitleValidator,
    queryLimitValidator,
    queryPageValidator,
    validationResultMiddleware,
    ArticleController.getArticles
);

articleRouter.get(
    '/:id',
    idValidator,
    validationResultMiddleware,
    ArticleController.getArticleById
);

articleRouter.post(
    '/',
    titleValidator,
    authorValidator,
    textValidator,
    validationResultMiddleware,
    ArticleController.createArticle
);

articleRouter.put(
    '/:id',
    idValidator,
    textValidator,
    titleValidator,
    validationResultMiddleware,
    ArticleController.updateArticle
);

articleRouter.delete(
    '/:id',
    idValidator,
    validationResultMiddleware,
    ArticleController.deleteArticle
);

export default articleRouter;
