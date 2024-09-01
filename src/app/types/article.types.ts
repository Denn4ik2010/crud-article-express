import { WithId } from "mongodb";

export interface IArticle {
    title: string;
    text: string;
    author: string;
    readonly date: Date;
}

export type Article = WithId<IArticle>

type Nullable<T> = T | null | undefined;
