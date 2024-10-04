import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

export default function (userRoles: string[]) {
    return async function (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token: string | undefined =
                req.headers.authorization?.split(' ')[1];

            if (!token) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                const { roles } = jwt.verify(token, JWT_SECRET) as JwtPayload;
                let hasRole: boolean = false;

                roles.forEach((role: string) => {
                    if (userRoles.includes(role)) {
                        hasRole = true;
                    }
                });

                if (!hasRole) {
                    res.status(403).json({ message: 'Acess denied' });
                } else {
                    next();
                }
            }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                res.status(403).json({ message: 'Unathorized' });
            }
        }
    };
}
