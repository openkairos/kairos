import { createSecretKey, randomUUID } from 'node:crypto';
import { SignJWT } from 'jose';
import { type AccessToken } from '@/authentication/domain/access-token';
import { securityConfig } from '@/config';
import { type User } from '@/shared/domain/entity';

export async function generateAccessToken(user: User): Promise<AccessToken> {
  const { accessToken } = securityConfig;

  return {
    token_type: 'Bearer',
    expires_in: accessToken.ttl,
    access_token: await sign(user),
  };
}

async function sign(user: User): Promise<string> {
  const { appKey, accessToken } = securityConfig;
  const key = createSecretKey(Buffer.from(appKey.replace('base64:', ''), 'base64'));

  const jwtSigner = new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: accessToken.algorithm })
    .setIssuer(accessToken.issuer)
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${accessToken.ttl}s`)
    .setJti(randomUUID());

  return jwtSigner.sign(key);
}
