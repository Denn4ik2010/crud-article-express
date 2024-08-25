import { param, query, body, validationResult, Result , ValidationError} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const idValidator = param('id')
    .isInt()
    .withMessage('Id must be an integer type');
export const queryTitleValidator = query('title')
    .optional()
    .isString()
    .withMessage('Title must be a string type')

    .trim()

    .isLength({ min: 1, max: 50 })
    .withMessage('Title lenght must be from 1 to 50 chars');

export const queryAuthorValidator = query('author')
    .optional()
    .isString()
    .withMessage('Author must be a string type')

    .trim()

    .isLength({ min: 1, max: 20 })
    .withMessage('Author lenght must be from 1 to 20 chars');
export const titleValidator = body('title')
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage('Title length must be from 4 to 50 characters');

export const textValidator = body('text')
    .trim()
    .isLength({ min: 5, max: 350 }) // TODO - replace min lenght to 25
    .withMessage('Text length must be from 25 to 350 characters');

export const authorValidator = body('author')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Author length must be from 5 to 20 characters');

export const validationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ messages: errors.array() });
    } else {
        next();
    }
};
