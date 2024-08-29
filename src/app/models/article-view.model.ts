/**
 * Represents the view model for an article.
 * Used for displaying article details.
 */
export type ArticleViewModel = {
    /**
     * Unique identifier of the article.
     */
    readonly id: number;

    /**
     * Title of the article.
     */
    readonly title: string;

    /**
     * Full text of the article.
     */
    readonly text: string;

    /**
     * Author of the article.
     */
    readonly author: string;
};
