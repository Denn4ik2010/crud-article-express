import { Db } from '../types/article.types';
import { Article } from '../types/article.types';
import { ArticleOrNone } from '../types/article.types';
import { getUniqueId } from '../utils/unique_id';

export let db: Db = {
    articles: [
        { id: 1, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 2, title: 'title', text: 'TEXT', author: 'AUTHOR' },
        { id: 3, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 4, title: 'TITLE', text: 'TEXT', author: 'AUTHOR' },
        { id: 5, title: 'Title', text: 'TEXT', author: 'Author' },
        { id: 6, title: 'TITLE', text: 'TEXT', author: 'Author' },
    ],
};

export class ProductRepository {
    static async findArticles(title?: string, author?: string): Promise<Article[]> {
        let foundedArticles: Article[] = db.articles;

        if (author) {
            foundedArticles = foundedArticles.filter(
                (a) => a.author.indexOf(author) > -1
            );
        }

        if (title) {
            foundedArticles = foundedArticles.filter(
                (a) => a.title.indexOf(title) > -1
            );
        }

        return foundedArticles;
    }

    static async findArticleById(id: number): Promise<ArticleOrNone> {
        let foundedArticle: ArticleOrNone =
            db.articles.find((a) => a.id === id) || null;

        return foundedArticle;
    }

    static async createArticle(title: string, text: string, author: string): Promise<Article> {
        const createdArticle: Article = {
            id: getUniqueId(),
            title,
            text,
            author,
        };

        db.articles.push(createdArticle);

        return createdArticle;
    }

    static async updateArticle(
        id: number,
        title: string,
        text: string
    ): Promise<ArticleOrNone> {
        const foundedArticle: ArticleOrNone = db.articles.find(
            (a) => a.id === id
        );

        if (foundedArticle) {
            foundedArticle.title = title;
            foundedArticle.text = text;

            return foundedArticle;
        } else {
            return null;
        }
    }

    /**
     * @return HTTP status code
     */
    static async deleteArticle(id: number): Promise<number> {
        const articleIndex = db.articles.findIndex((a) => a.id === id);

        if (articleIndex !== -1) {
            db.articles.splice(articleIndex, 1);
            return 204;
        } else {
            return 404;
        }
    }
}