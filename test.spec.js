const server = require('./api/server');
const request = require('supertest');
const db = require('./api/db/dbConfig');
const { expectCt } = require('helmet');


beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.migrate.rollback();
  await db.destroy();
});

describe('server', () => {
  it('loads successfully', async () => {
    const response = await request(server)
    .post('/api/auth/register')
    .send({username: 'herman', email: 'herman@test.co', password: 'password1', confirm_password: 'password1'})
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    expect(response.status).toBe(201);
  });
  it('successfully logs in', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({username: 'herman', password: 'password1'});
    //console.log('test.spec.js line 32', response)
    expect(response.status).toBe(201);
  })
});