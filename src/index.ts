import express, { Request, Express, Response } from 'express';
import morgan from 'morgan';
import { Article, ArticleOrNone, Db } from './types/ArticleTypes';
import { getUniqueId } from './utils/unique_id';
import {
    QueryRequest,
    ParamsRequest,
    BodyRequest,
    BodyParamsRequest,
} from './types/RequestTypes';
import { ArticleViewModel } from './models/ArticleViewModel';
import { CreateArticleModel } from './models/CreateArticleModel';
import { UpdateArticleModel } from './models/UpdateArticleModel';
import { GetArticleQueryModel } from './models/GetArticleQueryModel';
import { UriParamsIdArticleModel } from './models/UrlParamsIdArticleModel';

export const app: Express = express();
const PORT: number =  3000;

app.use(
    morgan(
        'INFO:    :method :url HTTP/:http-version :status  :response-time ms'
    )
);

app.use(express.json());

let db: Db = {
    articles: [
        { id: 1, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 2, title: 'title', text: 'TEXT', author: 'AUTHOR' },
        { id: 3, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 4, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 5, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
    ],
};

app.get('/', async (req: Request, res: Response<string>) => {
    return res.send('TEST MESSAGE');
});

app.get(
    '/articles',
    async (
        req: QueryRequest<GetArticleQueryModel>,
        res: Response<ArticleViewModel[]>
    ) => {
        let foundedArticles: Article[] = db.articles;

        if (req.query.title) {
            foundedArticles = foundedArticles.filter(
                (a) => a.title.indexOf(req.query.title) < -1
            );
        }

        return res.status(200).json(foundedArticles);
    }
);

app.get(
    '/articles/:id',
    async (
        req: ParamsRequest<UriParamsIdArticleModel>,
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

app.post(
    '/articles',
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

app.put(
    '/articles/:id',
    async (
        req: BodyParamsRequest<UpdateArticleModel, UriParamsIdArticleModel>,
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

app.delete(
    '/articles/:id',
    async (
        req: ParamsRequest<UriParamsIdArticleModel>,
        res: Response
    ) => {
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

app.delete('/__test__/data', (req: Request, res: Response<string>) => {
    db.articles = [];
    return res.status(204).json('DB nulled sucessfully');
});

app.listen(PORT, () => {
    console.log(
        `INFO:    Server running on http://localhost:3000 (Press CTRL+C to quit)`
    );
});
