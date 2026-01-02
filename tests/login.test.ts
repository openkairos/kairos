import { createTestAgent } from '@koala-ts/framework/dist/Testing/TestAgentFactory';
import { describe, expect, test } from 'vitest';
import { appConfig } from '../src/config';

describe('Login feature test', () => {
  test('It should authenticate admin user', async () => {
    const agent = createTestAgent(appConfig);

    const response = await agent.post('/api/v1/login').send({
      email: 'admin@example.com',
      password: 'password', // eslint-disable-line sonarjs/no-hardcoded-passwords
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('token');
  });
});
