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
};
export default ArticleQueryModel;