import request from 'supertest';
import app from '../../src/app/app';
import { Article } from '../../src/app/types/article.types';
import { CreateArticleModel } from '../../src/app/models/create-article.model';
import { UpdateArticleModel } from '../../src/app/models/update-article.model';
import { isatty } from 'tty';

describe('Article API', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data').expect(204);
    });

    it('Should return 200 HTTP status and test message', async () => {
        await request(app).get('/').expect(200, '"TEST MESSAGE"');
    });

    it('Should return 200 HTTP status and db in JSON ', async () => {
        await request(app).get('/articles').expect(200, []);
    });

    it('Should return 404 HTTP status', async () => {
        await request(app).get('/articles/1').expect(404);
    });

    let article: Article;

    it('Should return 201 HTTP status and created article', async () => {
        const data1: CreateArticleModel = {
            title: 'Test title',
            author: 'Test author',
            text: 'Test text',
        };

        const createResponse = await request(app)
            .post('/articles')
            .send(data1)
            .expect(201);

        article = createResponse.body;

        expect(article).toEqual({
            id: expect.any(Number),
            ...data1,
        });

        await request(app)
            .get('/articles/' + article.id)
            .expect(200, {
                ...article,
            });
    });
    it('Should return 200 HTTP status and article finded by title', async () => {
        await request(app)
            .get('/articles?title=Test')
            .expect(200, [{ ...article }]);
    });
    it('Should return 200 HTTP status and article finded by author', async () => {
        await request(app)
            .get('/articles?author=Test')
            .expect(200, [{ ...article }]);
    });
    it('Should return 200 HTTP status and article finded by title and author', async () => {
        await request(app)
            .get('/articles?title=Test&author=Test')
            .expect(200, [{ ...article }]);
    });

    it('Shoulf return 200 HTTP status and updated article', async () => {
        const data: UpdateArticleModel = {
            title: 'TEST TITLE',
            text: 'TEST TEXT',
        };
        const res = await request(app)
            .put('/articles/' + article.id)
            .send(data)
            .expect(200);

        expect(res.body).toEqual({
            id: article.id,
            ...data,
            author: article.author,
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
