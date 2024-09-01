import { WithId , InsertOneResult, UpdateResult} from 'mongodb';
import { IArticle } from '../types/article.types';


type ArticleError = {message: string}
export type ArticleViewModel = WithId<IArticle> | ArticleError;
export type ArticlesViewModel = WithId<IArticle>[] | ArticleError;
export type ArticleInsertResult = InsertOneResult<IArticle> | ArticleError
export type ArticleUpdateResult = UpdateResult<IArticle> | ArticleError
export type ArticleDeleteResult = ArticleError;