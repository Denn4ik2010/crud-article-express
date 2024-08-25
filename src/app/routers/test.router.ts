import { Router, Request, Response } from 'express';
import { db } from '../repository/article.repository';

const testsRouter: Router = Router();

testsRouter.delete('/data', (req: Request, res: Response<string>) => {
    db.articles = [];
    return res.status(204).json('DB nulled sucessfully');
});

export default testsRouter;
