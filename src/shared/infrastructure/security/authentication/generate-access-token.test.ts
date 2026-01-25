import { describe, expect, test, vi } from 'vitest';
import { generateAccessToken } from '@/shared/infrastructure/security/authentication/generate-access-token';

describe('Generate access token', () => {
  test('generate access token', async () => {
    const user = { id: 'first-user-id', username: 'john' };
    const jwtSigner = vi.fn().mockResolvedValue('signed-jwt-token');

    const accessToken = await generateAccessToken(user, jwtSigner);

    expect(accessToken.token_type).toBe('Bearer');
    expect(accessToken.expires_in).toBe(3600);
    expect(jwtSigner).toHaveBeenCalledWith(user);
    expect(accessToken.access_token).toBe('signed-jwt-token');
  });
});
