import { describe, expect, test } from 'vitest';
import { generateAccessToken } from '@/app/authentication/infrastructure/generate-access-token';

describe('Generate access token', () => {
  test('it should generate a JWT token', async () => {
    const user = {
      id: 'user-id-123',
      username: 'testuser',
      email: 'john.doe@example.com',
      password: '',
    };

    const accessToken = await generateAccessToken(user);

    expect(accessToken.token_type).toBe('Bearer');
    expect(accessToken.expires_in).toBe(3600);
    expect(accessToken.access_token.split('.')).toHaveLength(3);
  });
});
