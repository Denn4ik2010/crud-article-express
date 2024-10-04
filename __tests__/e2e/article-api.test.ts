import request from 'supertest';
import app from '../../src/app/app';

describe('Article RESTFull API tests', () => {
    beforeAll(async () => {
        await request(app).delete('/__tests__/deleteAllArticles');
        await request(app).delete('/__tests__/deleteAllUsers');
    });

    it('Should return 200 code and test message', async () => {
        await request(app).get('/').expect(200, '"TEST MESSAGE"');
    });

    it('Should register a new user', async () => {
        const createUserDto = {
            username: 'user',
            password: 'user',
        };

        await request(app)
            .post('/auth/register')
            .send(createUserDto)
            .expect(201);
    });

    let token: string;
    it('Should return JWT token', async () => {
        const loginUserDto = {
            username: 'user',
            password: 'user',
        };

        const res = await request(app)
            .post('/auth/login')
            .send(loginUserDto)
            .expect(200);

        expect(res.body).toEqual({
            token: expect.any(String),
        });

        token = res.body.token;
    });

    let articleId: string;
    it('should create article', async () => {
        const createDto = {
            title: 'wegdsgs',
            author: 'dsiiii',
            text: 'aaaaaaaaaaaa',
        };

        const res = await request(app)
            .post('/articles')
            .set({ Authorization: `Bearer ${token}` })
            .send(createDto)
            .expect(201);
        articleId = res.body._id;
        expect(res.body).toEqual({
            __v: 0,
            _id: expect.any(String),
            date: expect.any(String),
            title: 'wegdsgs',
            author: expect.any(String),
            text: 'aaaaaaaaaaaa',
        });
    });
    it('Should return articles and 200 code', async () => {
        const res = await request(app).get('/articles').expect(200);

        expect(res.body).toEqual([
            {
                __v: 0,
                _id: articleId,
                title: 'wegdsgs',
                author: expect.any(String),
                text: 'aaaaaaaaaaaa',
                date: expect.any(String),
            },
        ]);
    });

    it('Should return article finded by title', async () => {
        const res = await request(app).get('/articles?title=weg').expect(200);

        expect(res.body).toEqual([
            {
                __v: 0,
                _id: articleId,
                title: 'wegdsgs',
                author: expect.any(String),
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
            __v: 0,
            _id: articleId,
            title: 'wegdsgs',
            author: expect.any(String),
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
            .set({ authorization: `Bearer ${token}` })
            .send(updateDto)
            .expect(200);

        const res = await request(app).get('/articles/' + articleId);

        expect(res.body).toEqual({
            __v: 0,
            _id: articleId,
            ...updateDto,
            author: expect.any(String),
            date: expect.any(String),
        });
    });

    it('Should return 200 code and delete article', async () => {
        const res = await request(app)
            .delete('/articles/' + articleId)
            .set({ authorization: `Bearer ${token}` })
            .expect(200);

        expect(res.body).toEqual({
            _id: articleId,
            title: 'title',
            author: expect.any(String),
            date: expect.any(String),
            text: 'text12345678',
            __v: 0,
        });

        await request(app)
            .get('/articles/' + articleId)
            .expect(404);
    });
});
