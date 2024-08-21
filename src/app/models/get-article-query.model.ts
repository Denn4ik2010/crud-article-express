/**
 * Represents the query model for fetching articles.
 * Can be used to filter articles based on various criteria.
 */
export type ArticleQueryModel = {
    /**
     * (Optional) Filter articles by author.
     */
    author: string;

    /**
     * (Optional) Search articles by title.
     */
    title: string;
};
