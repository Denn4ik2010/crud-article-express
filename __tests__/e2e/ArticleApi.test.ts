import request from 'supertest';
import app from '../../src/app/app';
import { Article } from '../../src/app/types/article-types';
import { CreateArticleModel as CreateArticleModel } from '../../src/app/models/create-article.model';
import { UpdateArticleModel } from '../../src/app/models/update-article.model';

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
            .expect(200, article);
    });

    it('Should return 200 HTTP status and return finded article by query title', async () => {
        const res = await request(app).get('/articles?title=est').expect(200);

        expect(res.body).toEqual([
            {
                id: expect.any(Number),
                title: article.title,
                author: article.author,
                text: article.text,
            },
        ]);
    });

    it('Should return 201 HTTP status and second created article', async () => {
        const data2: CreateArticleModel = {
            title: 'Test TITLE1',
            author: 'Test AUTHOR',
            text: 'Test TEXT',
        };

        await request(app).post('/articles').send(data2).expect(201);
    });

    it('Should return 201 HTTP status and third created article', async () => {
        const data3: CreateArticleModel = {
            title: 'Test title',
            author: 'Test Author',
            text: 'Test text',
        };

        await request(app).post('/articles').send(data3).expect(201);
    });

    it('Should return 201 HTTP status and article finded by author', async () => {
        const res = await request(app)
            .get('/articles?author=Author')
            .expect(200);

        expect(res.body).toEqual([
            {
                id: expect.any(Number),
                title: 'Test title',
                author: 'Test Author',
                text: 'Test text',
            },
        ]);
    });

    it('Should return 201 HTTP status and article finded by title and author', async () => {
        const res = await request(app)
            .get('/articles?author=AUTHOR&title=est')
            .expect(200);

        expect(res.body).toEqual([
            {
                id: expect.any(Number),
                title: 'Test TITLE1',
                author: 'Test AUTHOR',
                text: 'Test TEXT',
            },
        ]);
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
            ...data,
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
