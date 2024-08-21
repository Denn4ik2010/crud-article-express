/**
 * Represents the view model for an article.
 * Used for displaying article details.
 */
export type ArticleViewModel = {
    /**
     * Unique identifier of the article.
     */
    id: number;

    /**
     * Title of the article.
     */
    title: string;

    /**
     * Full text of the article.
     */
    text: string;

    /**
     * Author of the article.
     */
    author: string;
};
