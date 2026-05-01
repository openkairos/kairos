import { createTestAgent } from '@koala-ts/framework';
import { integrationTest } from '@tests/__vitest__/integration-test';
import { describe, expect, test } from 'vitest';
import { usersCollection } from '@/modules/shared/persistence/mongodb';
import { hashPassword } from '@/modules/shared/security/password';
import { appConfig } from '@/config';

describe('Login feature test', () => {
  integrationTest();

  test('It should authenticate admin user', async () => {
    const agent = createTestAgent(appConfig);
    const password = 'password';
    const payload = { email: 'admin@example.com', password };
    await usersCollection.insertOne({
      username: 'admin',
      email: payload.email,
      password: await hashPassword(password),
      roles: ['ROLE_SUPER_ADMIN'],
    });

    const response = await agent.post('/api/v1/login').send(payload);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user).not.toHaveProperty('password');
  });

  test('it should validate login request', async () => {
    const agent = createTestAgent(appConfig);
    const payload = {};

    const response = await agent.post('/api/v1/login').send(payload);

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveProperty('email', ['This value should not be blank.']);
    expect(response.body.errors).toHaveProperty('password', ['This value should not be blank.']);
  });

  test('it should not authenticate with wrong credentials', async () => {
    const agent = createTestAgent(appConfig);
    const email = 'admin@example.com';
    await usersCollection.insertOne({
      username: 'admin',
      email,
      password: await hashPassword('password'),
      roles: ['ROLE_SUPER_ADMIN'],
    });

    const response = await agent.post('/api/v1/login').send({ email, password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      type: 'INVALID_CREDENTIALS',
      message: 'Invalid credentials',
    });
  });
});
