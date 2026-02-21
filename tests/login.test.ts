import { createTestAgent } from '@koala-ts/framework';
import { describe, expect, test } from 'vitest';
import { appConfig } from '@/config';

describe('Login feature test', () => {
  test('It should authenticate admin user', async () => {
    const agent = createTestAgent(appConfig);

    const response = await agent.post('/api/v1/login').send({
      email: 'admin@example.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user).not.toHaveProperty('password');
  });

  test('it should validate login request', async () => {
    const agent = createTestAgent(appConfig);

    const response = await agent.post('/api/v1/login').send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveProperty('email', [
      'This value should not be blank.',
      'This value is not a valid email address.',
    ]);
    expect(response.body.errors).toHaveProperty('password', ['This value should not be blank.']);
  });

  test('it should not authenticate with wrong credentials', async () => {
    const agent = createTestAgent(appConfig);

    const response = await agent.post('/api/v1/login').send({
      email: 'admin@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid credentials');
    expect(response.body.data).toBeUndefined();
  });
});
