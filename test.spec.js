const server = require('./api/server');
const request = require('supertest');
const db = require('./api/db/dbConfig');
const bcryptjs = require('bcryptjs');

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

	// recommended improvement: add a test for logout functionality
	it('prevents role escalation during registration', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const response = await agent
			.post('/api/auth/register')
			.set('Accept', 'application/json')
			.set('X-CSRF-Token', csrfToken)
			.send({
			username: 'role_attack_probe',
			email: 'role_attack_probe@example.com',
			password: 'password123',
			confirm_password: 'password123',
			role: 'editor',
			image_path: '/tmp/untrusted-avatar.jpg'
			});

		expect(response.status).toBe(201);
		expect(response.body.role).toBe('reader');

		// Sensitive fields must never appear in the response.
		expect(response.body).not.toHaveProperty('password');
		expect(response.body).not.toHaveProperty('image_path');

		// Confirm the database stores the correct role.
		const savedUser = await db('users')
			.where({ username: 'role_attack_probe' })
			.first();

		expect(savedUser).toBeDefined();
		expect(savedUser.role).toBe('reader');
		expect(savedUser.image_path).toBeNull();
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

		for (const user of response.body.data) {
			expect(user).not.toHaveProperty('password');
			expect(user).not.toHaveProperty('image_path');
		}
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
		// recommended improvements 
		expect(response.body.data).not.toHaveProperty('password');
		expect(response.body.data).not.toHaveProperty('image_path');
	});

	// recommended improvement: jwt and 403 
	it('does not expose sensitive fields in a user profile', async () => {
		const agent = request.agent(server);
		const csrfToken = await getCsrfToken(agent);

		const loginResponse = await agent
			.post('/api/auth/login')
			.set('X-CSRF-Token', csrfToken)
			.send({
			username: userPayload.username,
			password: userPayload.password
			});

		expect(loginResponse.status).toBe(201);

		const { id, token } = loginResponse.body.data;

		const response = await agent
			.get(`/api/users/${id}`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);

		expect(response.body.data).toEqual(
			expect.objectContaining({
			id,
			username: userPayload.username,
			role: 'reader'
			})
		);

		expect(response.body.data).not.toHaveProperty('password');
		expect(response.body.data).not.toHaveProperty('image_path');
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

// recommended improvement 

describe('role administration', () => {
  it('enforces administrator-only role transitions', async () => {
    const password = 'password123';
    const hash = await bcryptjs.hash(password, 10);

    // Test-only privileged accounts. Public registration
    // must never be used to create administrators.
    await db('users').insert([
      {
        username: 'phase1_admin',
        email: 'phase1_admin@example.com',
        password: hash,
        role: 'admin'
      },
      {
        username: 'phase1_target',
        email: 'phase1_target@example.com',
        password: hash,
        role: 'reader'
      }
    ]);

    const admin = await db('users')
      .where({ username: 'phase1_admin' })
      .first();

    const target = await db('users')
      .where({ username: 'phase1_target' })
      .first();

    const adminAgent = request.agent(server);
    const targetAgent = request.agent(server);

    const adminCsrf = await getCsrfToken(adminAgent);
    const targetCsrf = await getCsrfToken(targetAgent);

    const adminLogin = await adminAgent
      .post('/api/auth/login')
      .set('X-CSRF-Token', adminCsrf)
      .send({ username: admin.username, password });

    const targetLogin = await targetAgent
      .post('/api/auth/login')
      .set('X-CSRF-Token', targetCsrf)
      .send({ username: target.username, password });

    expect(adminLogin.status).toBe(201);
    expect(targetLogin.status).toBe(201);

    const adminToken = adminLogin.body.data.token;
    const targetToken = targetLogin.body.data.token;

    const roleRequest = (agent, token, csrf, action, id) =>
      agent
        .put(`/api/users/${action}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .set('X-CSRF-Token', csrf);

    // Reader cannot promote themselves.
    const readerAttempt = await roleRequest(
      targetAgent, targetToken, targetCsrf,
      'upgrade', target.id
    );
    expect(readerAttempt.status).toBe(403);

    // Admin cannot modify their own role.
    const selfAttempt = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'downgrade', admin.id
    );
    expect(selfAttempt.status).toBe(403);

    // Invalid and nonexistent user IDs are rejected.
    const invalidId = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', 'invalid'
    );
    expect(invalidId.status).toBe(400);

    const missingUser = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', 99999999
    );
    expect(missingUser.status).toBe(404);

    // Request body cannot dictate the assigned role.
    const firstPromotion = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', target.id
    ).send({ role: 'admin' });

    expect(firstPromotion.status).toBe(200);
    expect(firstPromotion.body.data.role).toBe('moderator');
    expect(firstPromotion.body.data).not.toHaveProperty('password');

    const secondPromotion = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', target.id
    );
    expect(secondPromotion.status).toBe(200);
    expect(secondPromotion.body.data.role).toBe('editor');

    const maximumRole = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', target.id
    );
    expect(maximumRole.status).toBe(409);

    // Downgrades work only through approved transitions.
    const firstDowngrade = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'downgrade', target.id
    );
    expect(firstDowngrade.status).toBe(200);
    expect(firstDowngrade.body.data.role).toBe('moderator');

    const secondDowngrade = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'downgrade', target.id
    );
    expect(secondDowngrade.status).toBe(200);
    expect(secondDowngrade.body.data.role).toBe('reader');

    // An old JWT must not preserve administrator privileges.
    await db('users')
      .where({ id: admin.id })
      .update({ role: 'reader' });

    const staleAdminToken = await roleRequest(
      adminAgent, adminToken, adminCsrf,
      'upgrade', target.id
    );

    expect(staleAdminToken.status).toBe(403);
  });
});
