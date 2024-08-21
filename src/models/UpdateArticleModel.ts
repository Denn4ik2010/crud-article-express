/**
 * Represents the model for updating an existing article.
 * Used for PUT request.
 */
export type UpdateArticleModel = {
    /**
     * Unique identifier of the article.
     */
    id: number;

    /**
     * (Optional) Title of the article.
     */
    title?: string;

    /**
     * (Optional) Full text of the article.
     */
    text?: string;

    /**
     * (Optional) Author of the article.
     */
    author?: string;
};
