const server = require('./api/server');
const request = require('supertest');
const db = require('./api/db/dbConfig');

const userPayload = {
	username: 'herman',
	email: 'herman@test.co',
	password: 'password1',
	confirm_password: 'password1'
};

async function getCsrfToken(agent) {
	const response = await agent.get('/api/csrf-token');

	if (response.status !== 200 || !response.body.csrfToken) {
		throw new Error(`CSRF token request failed: ${response.status} ${JSON.stringify(response.body)}`);
	}

	return response.body.csrfToken;
}

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
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const response = await agent
			.post('/api/auth/register')
			.send(userPayload)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken);

		expect(response.status).toBe(201);
	});

	it('successfully logs in', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const response = await agent
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({ username: userPayload.username, password: userPayload.password });

		expect(response.status).toBe(201);
		expect(response._body.data).toHaveProperty('token');
	});
});

describe('users', () => {
	it('retrieve users', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const user = await agent
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await agent
			.get('/api/users')
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`);

		expect(response.status).toBe(200);
		expect(response._body.data[0]).toHaveProperty('id');
	});

	it('edit a user', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const user = await agent
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await agent
			.put(`/api/users/${user._body.data.id}`)
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`)
			.set('X-CSRF-Token', csrfToken)
			.send({ email: 'herman@yahoo.zz' });

		expect(response.status).toBe(201);
	});
});

describe('posts', () => {
	it('retrieve all posts', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const user = await agent
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await agent
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
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const user = await agent
			.post('/api/auth/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({ username: userPayload.username, password: userPayload.password });

		const response = await agent
			.get('/api/comments')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${user._body.data.token}`);

		expect(response.status).toBe(200);
		expect(response._body[0]).toHaveProperty('body');
	});
});