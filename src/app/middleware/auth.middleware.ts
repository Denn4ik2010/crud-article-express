import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token: string | undefined =
            req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(403).json({ message: 'Unauthorized' });
        } else {
            const decodedDate = jwt.verify(token, JWT_SECRET);
            (req as any).user = decodedDate;
            next();
        }
    } catch (error) {
        if( error instanceof JsonWebTokenError) {
            res.status(403).json({message: "Unathorized"})
        }
    }
};

export default authMiddleware;
