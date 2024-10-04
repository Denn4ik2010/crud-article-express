import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method === 'OPTIONS') {
        return next(); 
    }

    try {
        const token: string | undefined =
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });

        }

        const decodedData = jwt.verify(token, JWT_SECRET) as JwtPayload;

        (req as any).user = { id: decodedData.userId };

        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        console.error('Unexpected error in authMiddleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default authMiddleware;
