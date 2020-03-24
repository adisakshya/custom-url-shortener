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
            .get('/api/v1/url/db/connection/test');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Connection with database is successfully established');
    });

});

describe('Failing to create a new item because of insufficient parameter supplied', () => {

    it('do not insert due to insufficient parameter: URLCode', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: baseURL', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: originalURL', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "baseURL": "http://localhost",
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: originalURL and baseURL', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "URLCode": "someRandomBaseURL"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: originalURL and URLCode', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "baseURL": "http://localhost"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: baseURL and URLCode', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to no parameters supplied', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

});

describe('Failing to create a new item because of invalid url parameter supplied', () => {

    it('do not insert due to invalid parameter: originalURL', async () => {
        const res = await request(app)
            .post('/api/v1/url')
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
            .post('/api/v1/url')
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
            .post('/api/v1/url')
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
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.data.url.URLCode).toEqual("someRandomURLCode");
        expect(res.body.data.duplicate).toEqual('URL Code');
    });

    it('do not insert due to duplicate parameter: originalURL', async () => {
        const res1 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someOtherRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.data.url.URLCode).toEqual("someRandomURLCode");
        expect(res.body.data.duplicate).toEqual('Original URL');
    });

});

describe('Create a new item', () => {

    it('should insert a new item', async () => {
        const res = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res.body.data.url.URLCode).toEqual("someRandomURLCode");
    });

});

describe('Failing to get item information because insufficient parameter supplied', () => {

    it('should not get information due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/url/item')
            .query({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to get item information because invalid parameter supplied', () => {

    it('should not get information due to invalid parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/url/item')
            .query({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("No such URL ID found");
    });

});

describe('Get item information', () => {

    it('should get information about an item', async () => {
        const res1 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res1.statusCode).toEqual(200);
        expect(res1.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res1.body.data.url.URLCode).toEqual("someRandomURLCode");
        const res = await request(app)
            .get('/api/v1/url/item')
            .query({
                "id": res1.body.data.url._id
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.url._id).toEqual(res1.body.data.url._id);
        expect(res.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby",);
        expect(res.body.data.url.shortURL).toEqual("http://localhost/someRandomURLCode");
        expect(res.body.data.url.URLCode).toEqual("someRandomURLCode");
    });

});

describe('Get all item information', () => {
    
    it('should get information about 2 items', async () => {
        const res1 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res1.statusCode).toEqual(200);
        expect(res1.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res1.body.data.url.URLCode).toEqual("someRandomURLCode");
        const res2 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example2.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someOtherRandomURLCode"
            });
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.data.url.originalURL).toEqual("https://example2.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res2.body.data.url.URLCode).toEqual("someOtherRandomURLCode");
        const res = await request(app)
            .get('/api/v1/url');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.items.length).toEqual(2);
    });

});

describe('Get request on empty collection', () => {
    
    it('should return no item found', async () => {
        const res = await request(app)
            .get('/api/v1/url');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('No Items found');
    });
    
});

describe('Failing to delete item because insufficient parameter supplied', () => {

    it('should not delete item due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .delete('/api/v1/url/item')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to delete item because invalid parameter supplied', () => {

    it('should return item not found', async () => {
        const res = await request(app)
            .delete('/api/v1/url/item')
            .send({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("No such URL found");
    });

});

describe('Delete all items', () => {

    it('should delete all item', async () => {
        const res1 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someRandomURLCode"
            });
        expect(res1.statusCode).toEqual(200);
        expect(res1.body.data.url.originalURL).toEqual("https://example.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res1.body.data.url.URLCode).toEqual("someRandomURLCode");
        const res2 = await request(app)
            .post('/api/v1/url')
            .send({
                "originalURL": "https://example2.com/acoustics.aspx?brass=act&afterthought=baby",
                "baseURL": "http://localhost",
                "URLCode": "someOtherRandomURLCode"
            });
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.data.url.originalURL).toEqual("https://example2.com/acoustics.aspx?brass=act&afterthought=baby");
        expect(res2.body.data.url.URLCode).toEqual("someOtherRandomURLCode");
        const res = await request(app)
            .delete('/api/v1/url');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.url.deletedCount).toEqual(2);
        expect(res.body.data.url.ok).toEqual(1);
    });

});

describe('Delete request on empty collection', () => {
    
    it('should return no deleted items', async () => {
        const res = await request(app)
            .delete('/api/v1/url');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('No Items found');
    });
    
});