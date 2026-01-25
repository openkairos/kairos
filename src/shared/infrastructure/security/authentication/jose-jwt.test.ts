import { describe, expect, test } from 'vitest';
import { sign } from '@/shared/infrastructure/security/authentication/jose-jwt';

describe('Jose JWT', () => {
  describe('Sign JWT', () => {
    test('Token headers', async () => {
      const accessToken = await sign({ id: '1', username: 'user1' });

      const { header } = getTokenParts(accessToken);

      expect(header).toHaveProperty('alg', 'HS256');
    });

    test('Token payload', async () => {
      const accessToken = await sign({ id: '1', username: 'user1' });

      const { payload } = getTokenParts(accessToken);

      expect(payload).toHaveProperty('id', '1');
      expect(payload).toHaveProperty('username', 'user1');
      expect(payload).toHaveProperty('iss', 'kairos');
      expect(payload).toHaveProperty('sub', '1');
      expect(payload.exp - payload.iat).toBe(3600);
      expect(payload).toHaveProperty('jti');
    });
  });
});

function getTokenParts(token: string): { header: object; payload: { exp: number; iat: number }; signature: string } {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token');

  return {
    header: JSON.parse(Buffer.from(parts[0] as unknown as string, 'base64').toString('utf-8')),
    payload: JSON.parse(Buffer.from(parts[1] as unknown as string, 'base64').toString('utf-8')),
    signature: parts[2] as unknown as string,
  };
}
