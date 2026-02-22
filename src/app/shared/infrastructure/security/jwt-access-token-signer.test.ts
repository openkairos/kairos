import { createSecretKey } from 'node:crypto';
import { decodeJwt } from 'jose';
import { describe, expect, test, vi } from 'vitest';
import { frozenClock } from '@/app/shared/application/clock';
import { createJwtAccessTokenSigner } from '@/app/shared/infrastructure/security/jwt-access-token-signer';

describe('JWT access token signer', () => {
  test('returns a signed token with expected claims for authenticated user', async () => {
    const key = createSecretKey(Buffer.from('test-secret-key'));
    const now = new Date('2026-02-22T14:30:00.000Z');
    const newJti = vi.fn().mockReturnValue('jti-1');
    const signAccessToken = createJwtAccessTokenSigner({
      key,
      accessTokenConfig: {
        ttl: 300,
        algorithm: 'HS256',
        issuer: 'kairos',
      },
      clock: frozenClock(now),
      newJti,
    });
    const user = {
      id: 'user-id-123',
      username: 'test-user',
      email: 'test@example.com',
      password: '',
    };

    const token = await signAccessToken(user);
    const payload = decodeJwt(token);

    expect(token.split('.')).toHaveLength(3);
    expect(payload.sub).toBe('user-id-123');
    expect(payload.iss).toBe('kairos');
    expect(payload.iat).toBe(Math.floor(now.getTime() / 1000));
    expect(payload.exp).toBe(Math.floor(now.getTime() / 1000) + 300);
    expect(payload.jti).toBe('jti-1');
    expect(newJti).toHaveBeenCalledTimes(1);
  });
});
