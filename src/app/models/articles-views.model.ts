import { IArticle } from '../types/article.types';

type ArticleError = { message: string };
export type ArticleViewModel = IArticle | ArticleError;
export type ArticlesViewModel = IArticle[] | ArticleError;
export type ArticleInsertResult = IArticle | ArticleError;
export type ArticleUpdateResult = IArticle | null | ArticleError;
export type ArticleDeleteResult = IArticle | ArticleError | {message: string};
