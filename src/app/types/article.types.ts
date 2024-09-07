import { WithId } from 'mongodb';

export interface IArticle {
    title: string;
    text: string;
    readonly author: string;
    readonly date: Date;
}

export type Article = WithId<IArticle>;
export type ArticleOrNone = Nullable<Article>
type Nullable<T> = T | null | undefined;
