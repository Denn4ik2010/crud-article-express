import express, { Request, Express, Response } from 'express';
import morgan from 'morgan';
import articleRouter from './routers/article.router';
import testRouter from './routers/test.router';
import authRouter from './routers/auth.router';
import { runDb } from './db/db';
import { PORT } from './config/constants';


const app: Express = express();

app.use(
    morgan(
        'INFO:    :method :url HTTP/:http-version :status  :response-time ms'
    )
);

app.use(express.json());
app.use('/__tests__', testRouter);
app.use('/articles', articleRouter);
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('TEST MESSAGE');
});

export async function runApp(): Promise<void> {
    await runDb();
    app.listen(PORT, () => {
        console.log(`INFO:    Server started at http://localhost:${PORT}`);
    });
}

export default app;
