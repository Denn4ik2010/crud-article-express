import {
    param,
    query,
    body,
    Result,
    validationResult,
    ValidationError,
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const idValidator = param('id')
    .isHexadecimal()
    .withMessage('Id must be a hex decimal number')
    .isLength({ min: 24, max: 24 })
    .withMessage('Id lenght must equal 24 chars')
    .escape();

export const queryLimitValidator = query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer')
    .toInt()
    .default(10)
    .escape();

export const queryPageValidator = query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt()
    .default(1)
    .escape();

export const queryTitleValidator = query('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Title length must be between 1 and 50 characters')
    .escape();

export const queryAuthorValidator = query('author')
    .optional()
    .notEmpty()
    .withMessage('Author cannot be empty')
    .isString()
    .withMessage('Author must be a string')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Author length must be between 1 and 20 characters')
    .escape();

export const titleValidator = body('title')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Title length must be from 4 to 50 characters')
    .escape();

export const textValidator = body('text')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Text length must be between 10 and 350 characters')
    .escape();

export const authorValidator = body('author')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Author length must be between 5 and 20 characters')
    .escape();

const validationResultMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ messages: errors.array() });
    } else {
        next();
    }
};

export default validationResultMiddleware;