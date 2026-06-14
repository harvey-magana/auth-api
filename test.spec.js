const server = require('./api/server');
const request = require('supertest');
const db = require('./api/db/dbConfig');

const userPayload = {
	username: 'herman',
	email: 'herman@test.co',
	password: 'password1',
	confirm_password: 'password1'
};

beforeAll(async () => {
	await db.migrate.latest();
	await db.seed.run();
});

afterAll(async () => {
	await db.migrate.rollback();
	await db.destroy();
});

describe('auth', () => {
	it('loads successfully', async () => {
		const response = await request(server)
			.post('/api/auth/register')
			.send(userPayload)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json');

		expect(response.status).toBe(201);
	});

	it('successfully logs in', async () => {
		const response = await request(server)
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: userPayload.username, password: userPayload.password });

		expect(response.status).toBe(201);
		expect(response._body.data).toHaveProperty('token');
	});
});

describe('users', () => {
	it('retrieve users', async () => {
		const user = await request(server)
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await request(server)
			.get('/api/users')
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`);

		expect(response.status).toBe(200);
		expect(response._body.data[0]).toHaveProperty('id');
	});

	it('edit a user', async () => {
		const user = await request(server)
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await request(server)
			.put(`/api/users/${user._body.data.id}`)
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`)
			.send({ email: 'herman@yahoo.zz' });

		expect(response.status).toBe(201);
	});
});

describe('posts', () => {
	it('retrieve all posts', async () => {
		const user = await request(server)
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await request(server)
			.get('/api/posts')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`);

		expect(response.status).toBe(200);
		expect(response._body[0]).toHaveProperty('post_title');
	});
});

describe('comments', () => {
	it('retrieve all comments', async () => {
		const user = await request(server)
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await request(server)
			.get('/api/comments')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`);

		expect(response.status).toBe(200);
		expect(response._body[0]).toHaveProperty('body');
	});
});
