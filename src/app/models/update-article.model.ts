/**
 * Represents the model for updating an existing article.
 * Used for PUT request.
 */
export type UpdateArticleModel = {
    /**
     * (Optional) Title of the article.
     */
    title: string;

    /**
     * (Optional) Full text of the article.
     */
    text: string;

};
