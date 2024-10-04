export interface IArticle {
    title: string;
    text: string;
    readonly author: string;
    readonly date: Date;
}
