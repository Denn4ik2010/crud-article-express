export interface Article {
    readonly id: number;
    title: string;
    text: string;
    author: string;
}

type Nullable<T> = T | null | undefined;

export type ArticleOrNone = Nullable<Article>;
export type Db = { articles: Article[] };
