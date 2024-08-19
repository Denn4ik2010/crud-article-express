import request from 'supertest';
import { app } from '../../src/index';
import { Article } from '../../src/types/ArticleTypes';
import { CreateArticleModel } from "../../src/models/CreateArticleModel";
import {UpdateArticleModel} from "../../src/models/UpdateArticleModel"

describe('Article API', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data').expect(204);
    });

    it('Should return 200 HTTP status and test message', async () => {
        await request(app).get('/').expect(200, 'TEST MESSAGE');
    });

    it('Should return 200 HTTP status and db in JSON ', async () => {
        await request(app).get('/articles').expect(200, []);
    });

    it('Should return 404 HTTP status', async () => {
        await request(app).get('/articles/1').expect(404);
    });

    let article: Article;

    it('Should return 201 HTTP status and created article', async () => {
        const data: CreateArticleModel = {
            title: 'Test title',
            author: 'Test author',
            text: 'Test text',
        };
        const createResponse = await request(app)
            .post('/articles')
            .send(data)
            .expect(201);

        article = createResponse.body;

        expect(article).toEqual({
            id: expect.any(Number),
            ...data
        });

        await request(app)
            .get('/articles/' + article.id)
            .expect(200, article);
    });

    it('Should return 200 HTTP status and updated article', async () => {
        const data: UpdateArticleModel = {
            title: 'Second test title',
            text: 'Second test text',
        };
        const updatedResponse = await request(app)
            .put('/articles/' + article.id)
            .send({
                ...data,
                author: article.author,
            })
            .expect(200);

        const updatedArticle = updatedResponse.body;

        expect(updatedArticle).toEqual({
            id: article.id,
            author: article.author,
            ...data
        });
    });

    it('Should return 204 HTTP status', async () => {
        await request(app)
            .delete('/articles/' + article.id)
            .expect(204);
        await request(app)
            .get('/articles/' + article.id)
            .expect(404);
    });
});