/**
 * Represents the model for updating an existing article.
 * Used for PUT request.
 */
type UpdateArticleDto = {
    /**
     * (Optional) Title of the article.
     */
    readonly title: string;

    /**
     * (Optional) Full text of the article.
     */
    readonly text: string;
};

export default UpdateArticleDto;