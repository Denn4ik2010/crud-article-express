import { Router, Request, Response } from 'express';
import { runDb } from '../db/db';
import ArticleModel from '../schemas/article.schema';
import UserModel from '../schemas/user.schema';

const testRouter: Router = Router();
testRouter.delete(
    '/deleteAllArticles',
    async (req: Request, res: Response): Promise<void> => {
        try {
            await runDb();
            await ArticleModel.deleteMany({});
            res.status(200).json({
                message: 'Articles collection cleared',
            });
        } catch (error) {
            console.error('Error deleting documents: ', error);
            res.status(500).json({ message: 'Error deleting documents.' });
        }
    }
);

testRouter.delete('/deleteAllUsers', async (req: Request, res: Response) => {
    try {
        await UserModel.deleteMany({});
        res.status(200).json({ message: 'Users collection cleared' });
    } catch (error) {
        console.error('Error deleting documents: ', error);
        res.status(500).json({
            message: 'Error deleting documents.',
        });
    }
});

export default testRouter;
