import request from 'supertest';
import app from '../../src/app/app';

describe('Article RESTFull API tests', () => {
    beforeAll(async () => {
        await request(app).delete('/__tests__/deleteAll');
    });

    it('Should return 200 code and test message', async () => {
        await request(app).get('/').expect(200, '"TEST MESSAGE"');
    });

    let articleId: string;
    it('Should create article, return his id and 201 code', async () => {
        const createDto = {
            title: 'wegdsgs',
            author: 'dsiiii',
            text: 'aaaaaaaaaaaa',
        };

        const res = await request(app)
            .post('/articles')
            .send(createDto)
            .expect(201);
        articleId = res.body.insertedId;
        expect(res.body).toEqual({
            acknowledged: true,
            insertedId: expect.any(String),
        });
    });

    it('Should return articles and 200 code', async () => {
        const res = await request(app).get('/articles').expect(200);

        expect(res.body).toEqual([
            {
                _id: articleId,
                title: 'wegdsgs',
                author: 'dsiiii',
                text: 'aaaaaaaaaaaa',
                date: expect.any(String),
            },
        ]);
    });

    it('Should return article finded by title', async () => {
        const res = await request(app).get('/articles?title=weg').expect(200);

        expect(res.body).toEqual([
            {
                _id: articleId,
                title: 'wegdsgs',
                author: 'dsiiii',
                text: 'aaaaaaaaaaaa',
                date: expect.any(String),
            },
        ]);
    });

    it('Should return article finded by author', async () => {
        const res = await request(app)
            .get('/articles?author=dsiiii')
            .expect(200);

        expect(res.body).toEqual([
            {
                _id: articleId,
                title: 'wegdsgs',
                author: 'dsiiii',
                text: 'aaaaaaaaaaaa',
                date: expect.any(String),
            },
        ]);
    });

    it('Should return article finded by title and author', async () => {
        const res = await request(app)
            .get('/articles?title=weg&author=dsiiii')
            .expect(200);

        expect(res.body).toEqual([
            {
                _id: articleId,
                title: 'wegdsgs',
                author: 'dsiiii',
                text: 'aaaaaaaaaaaa',
                date: expect.any(String),
            },
        ]);
    });

    it('Should return article finded by id', async () => {
        const res = await request(app)
            .get('/articles/' + articleId)
            .expect(200);

        expect(res.body).toEqual({
            _id: articleId,
            title: 'wegdsgs',
            author: 'dsiiii',
            text: 'aaaaaaaaaaaa',
            date: expect.any(String),
        });
    });

    it('Should return 200 code and update article', async () => {
        const updateDto = {
            title: 'title',
            text: 'text12345678',
        };
        await request(app)
            .put('/articles/' + articleId)
            .send(updateDto)
            .expect(200);

        const res = await request(app).get('/articles/' + articleId);

        expect(res.body).toEqual({
            _id: articleId,
            ...updateDto,
            author: 'dsiiii',
            date: expect.any(String),
        });
    });

    it('Should return 200 code and delete article', async () => {
        await request(app)
            .delete('/articles/' + articleId)
            .expect(200, {
                message: 'Article deleted',
            });

        await request(app)
            .get('/articles/' + articleId)
            .expect(404);
    });
});
