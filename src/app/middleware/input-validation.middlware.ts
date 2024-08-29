import {
    param,
    query,
    body,
    validationResult,
    Result,
    ValidationError,
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const idValidator = param('id')
    .exists({ checkFalsy: true })
    .withMessage('Id is required')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer')
    .toInt()
    .escape();

export const queryTitleValidator = query('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Title length must be between 1 and 50 characters')
    .escape();

export const queryAuthorValidator = query('author')
    .optional()
    .isString()
    .withMessage('Author must be a string')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Author length must be between 1 and 20 characters')
    .escape();

export const titleValidator = body('title')
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage('Title length must be from 4 to 50 characters')
    .escape();

export const textValidator = body('text')
    .trim()
    .isLength({ min: 5, max: 350 }) // TODO - replace min lenght to 25
    .withMessage('Text length must be between 25 and 350 characters')
    .escape();

export const authorValidator = body('author')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Author length must be between 5 and 20 characters')
    .escape();

export const validationResultMiddleware = async (
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
