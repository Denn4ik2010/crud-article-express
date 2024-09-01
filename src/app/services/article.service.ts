import ArticleRepository from '../repository/article-db.repository';
import { IArticle, Article } from '../types/article.types';
import CreateArticleDto from '../dto/create-article.dto';
import UpdateArticleDto from '../dto/update-article.dto';

export class ArticleService {
    static async findArticles(
        title?: string,
        author?: string
    ): Promise<Article[]> {
        const findedArticles = await ArticleRepository.findAll(title, author);
        return findedArticles;
    }

    static async findArticleById(id: string): Promise<Article | null> {
        const article = await ArticleRepository.findById(id);
        return article;
    }

    static async createArticle(createArticleDto: CreateArticleDto) {
        const article: IArticle = {
            title: createArticleDto.title,
            author: createArticleDto.author,
            text: createArticleDto.text,
            date: createArticleDto.date || new Date(),
        };

        const createdArticle = await ArticleRepository.create(article);
        return createdArticle;
    }

    static async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
        const article: Partial<IArticle> = {
            title:updateArticleDto.title,
            text: updateArticleDto.text
        }
    
        const updatedArticle = await ArticleRepository.updateById(id , article)
        return updatedArticle;
    }

    static async deleteArticle(id: string) {
        const deletedArticle = await ArticleRepository.deleteById(id);
        return deletedArticle;
    }
}
