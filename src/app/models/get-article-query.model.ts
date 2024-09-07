/**
 * Represents the query model for fetching articles.
 * Can be used to filter articles based on various criteria.
 */
type ArticleQueryModel = {
    /**
     * (Optional) Filter articles by author.
     */
    author?: string;

    /**
     * (Optional) Search articles by title.
     */
    title?: string;

    /**
     * (Optional) Limit the number of articles returned (default: 10).
     */
    limit?: number;

    /**
     * (Optional) Page number (default: 1).
     */
    page?: number;
};
export default ArticleQueryModel;
