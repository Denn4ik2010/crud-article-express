/**
 * Represents the model for creating a new article.
 * Used for POST request.
 */
export type CreateArticleModel = {
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
