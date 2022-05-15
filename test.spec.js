const server = require('./api/server');
const request = require('supertest');


describe('server', () => {
  it('loads successfully', async () => {
    const response = await request(server);
  })
})