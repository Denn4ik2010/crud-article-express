import { Router, Request, Response } from 'express';
import { db } from '../repository/article.repository';

const testsRouter: Router = Router();

testsRouter.delete('/data', async (req: Request, res: Response<string>): Promise<void> => {
    db.articles = [];
    res.status(204).json('DB nulled sucessfully');
});

export default testsRouter;
