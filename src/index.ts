import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { Article, ArticleOrNone } from './types/types';
import { getUniqueId } from './utils/unique_id';

export const app: Express = express();
const PORT: number = 3000;

app.use(
    morgan(
        'INFO:    :method :url HTTP/:http-version :status  :response-time ms'
    )
);

app.use(express.json());

let db: Article[] = [
    { id: 1, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
    { id: 2, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
    { id: 3, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
    { id: 4, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
    { id: 5, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
];

app.get('/', async (req: Request, res: Response) => {
    return res.send('TEST MESSAGE');
});

app.get('/articles', async (req: Request, res: Response) => {
    return res.status(200).json(db);
});

app.get('/articles/:id', async (req: Request, res: Response) => {
    const findedArticle: ArticleOrNone = db.find(
        (val) => val.id === +req.params.id
    );

    if (!findedArticle) {
        return res.status(404).json('Article not found');
    } else {
        return res.status(200).json(findedArticle);
    }
});

app.post('/articles', async (req: Request, res: Response) => {
    const { title, text, author } = req.body;

    if (title && author && text) {
        const article: Article = { id: getUniqueId(), title, text, author };
        db.push(article);

        return res.status(201).json(article);
    } else {
        return res.sendStatus(400);
    }
});

app.put('/articles/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const { title, text } = req.body;

    if (!text || !title) {
        return res.status(400).json('Enter all fields');
    }

    const article: ArticleOrNone = db.find((val) => val.id === id);

    if (article) {
        article.title = title;
        article.text = text;

        return res.status(200).json(article);
    } else {
        return res.status(404).json('Article not found');
    }
});

app.delete('/articles/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    const articleIndex: number = db.findIndex((val) => val.id === id);

    if (articleIndex !== -1) {
        db.splice(articleIndex, 1);
        return res.status(204).send();
    } else {
        return res.status(404).json('Article not found');
    }
});

app.delete('/__test__/data', (req, res) => {
    db = [];
    return res.status(204).json('DB nulled sucessfully');
});

app.listen(PORT, () => {
    console.log(
        `INFO:    Server running on http://localhost:3000 (Press CTRL+C to quit)`
    );
});
