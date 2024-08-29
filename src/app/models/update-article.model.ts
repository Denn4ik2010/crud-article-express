/**
 * Represents the model for updating an existing article.
 * Used for PUT request.
 */
export type UpdateArticleModel = {
    /**
     * (Optional) Title of the article.
     */
    readonly title: string;

    /**
     * (Optional) Full text of the article.
     */
    readonly text: string;
};
