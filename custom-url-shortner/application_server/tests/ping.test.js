const request = require('supertest')
const app = require('../app')

describe('GET', () => {
  it('should ping the server', async () => {
    const res = await request(app)
      .get('/ping');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('pong');
  });
});