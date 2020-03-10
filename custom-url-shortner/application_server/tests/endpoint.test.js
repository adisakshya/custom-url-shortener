const request = require('supertest')
const app = require('../app')

/**
 * Setup Database
 */
const setupDB = require('../test-setup/setup');
setupDB();

describe('Verify connection with database', () => {

    it('should check if connection with database is ready', async () => {
        const res = await request(app)
            .get('/api/url/db/connection/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Connection with database is successfully established');
    });

});

describe('Failing to create a new item because of insufficient parameter supplied', () => {

    it('do not insert due to insufficient parameter: URLCode', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: baseURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: originalURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "baseURL": "http://localhost",
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: originalURL and baseURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: originalURL and URLCode', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "baseURL": "http://localhost"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: baseURL and URLCode', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to no parameters supplied', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

});

describe('Failing to create a new item because of invalid url parameter supplied', () => {

    it('do not insert due to invalid parameter: originalURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid Original URL');
    });

    it('do not insert due to invalid parameter: baseURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid Base URL');
    });

    it('do not insert due to invalid parameters: originalURL and baseURL', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(400);
    });

});

describe('Failing to create a new item because of duplicate parameter', () => {

    it('do not insert due to duplicate parameter: URLCode', async () => {
        const res1 = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.message.URLCode).toEqual("someRandomURLCode");
        expect(res.body.duplicate).toEqual('URL Code');
    });

    it('do not insert due to duplicate parameter: originalURL', async () => {
        const res1 = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someOtherRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.message.URLCode).toEqual("someRandomURLCode");
        expect(res.body.duplicate).toEqual('Original URL');
    });

});

describe('Create a new item', () => {

    it('should insert a new item', async () => {
        const res = await request(app)
            .post('/api/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.message.URLCode).toEqual("someRandomURLCode");
    });

});