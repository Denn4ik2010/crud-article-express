import express, { Request, Express, Response } from 'express';
import morgan from 'morgan';
import { articleRouter } from './routers/article.router';
import testsRouter from './routers/test.router';
const app: Express = express();

app.use(
    morgan(
        'INFO:    :method :url HTTP/:http-version :status  :response-time ms'
    )
);

app.use(express.json());
app.use('/articles', articleRouter);
app.use('/__test__', testsRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('TEST MESSAGE');
});

export default app;
