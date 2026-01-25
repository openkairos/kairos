import { describe, expect, test, vi } from 'vitest';
import { type AuthenticatedUser } from '@/shared/application/security';
import { generateAccessToken } from '@/shared/infrastructure/security/authentication/generate-access-token';

describe('Generate access token', () => {
  test('generate access token', async () => {
    const authenticatedUser = { user: { id: 'first-user-id', username: 'john' } };
    const jwtSigner = vi.fn();

    const accessToken = await generateAccessToken(authenticatedUser as unknown as AuthenticatedUser, jwtSigner);

    expect(accessToken.token_type).toBe('Bearer');
    expect(accessToken.expires_in).toBe(3600);
    expect(jwtSigner).toHaveBeenCalledWith(authenticatedUser.user);
  });
});
