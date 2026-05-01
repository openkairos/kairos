import { describe, expect, test, vi } from 'vitest';
import type { User } from '@/app/authentication/domain/user';
import { createGenerateAccessToken } from '@/app/authentication/infrastructure/security/access-token/generate-access-token';

describe('Generate access token', () => {
  test('returns a bearer token payload for authenticated user', async () => {
    const sign = vi.fn().mockResolvedValue('signed-access-token');
    const generateAccessToken = createGenerateAccessToken({
      accessTokenConfig: {
        ttl: 60,
      },
      sign,
    });

    const user: User = {
      id: 'user-id-123',
      username: 'testuser',
      email: 'john.doe@example.com',
      password: '',
      roles: ['ROLE_SUPER_ADMIN'],
    };

    const accessToken = await generateAccessToken(user);

    expect(sign).toHaveBeenCalledWith(user);
    expect(accessToken).toEqual({
      token_type: 'Bearer',
      expires_in: 60,
      access_token: 'signed-access-token',
    });
  });
});
