import express, { Request, Express, Response } from 'express';
import morgan from 'morgan';
import articleRouter from './routers/article.router';
import testRouter from './routers/test.router';
import { config } from 'dotenv';
import { runDb } from './db/db';

config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(
    morgan(
        'INFO:    :method :url HTTP/:http-version :status  :response-time ms'
    )
);

app.use(express.json());
app.use('/__tests__', testRouter);
app.use('/articles', articleRouter);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('TEST MESSAGE');
});

export async function runApp() {
    await runDb()
    app.listen(PORT, () => {
        console.log(`INFO:    Server started at http://localhost:${PORT}`);
    });
}

export default app;
