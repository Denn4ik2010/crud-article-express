import { Router , Request , Response } from "express";
import { collection, runDb } from '../db/db'


const testRouter: Router = Router();
testRouter.delete(
    '/deleteAll',
    async (req: Request, res: Response): Promise<void> => {
        try {
            await runDb();
            const result = await collection.deleteMany({});
            res.status(200).json({
                message: `Deleted ${result.deletedCount} documents.`,
            });
        } catch (error) {
            console.error('Error deleting documents:', error);
            res.status(500).json({ message: 'Error deleting documents.' });
        }
    }
);

export default testRouter;