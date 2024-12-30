import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token: string | undefined =
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
        } else {
            const payload: JwtPayload = jwt.verify(
                token,
                JWT_SECRET
            ) as JwtPayload;

            (req as any).user.id = payload.userId;

            next();
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};

export default authMiddleware;
