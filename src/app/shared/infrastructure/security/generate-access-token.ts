import { createSecretKey, randomUUID } from 'node:crypto';
import { SignJWT } from 'jose';
import { type GenerateAccessToken } from '@/app/authentication/application/authenticate';
import { type User } from '@/app/shared/domain/entity';
import { securityConfig } from '@/config';

export const generateAccessToken: GenerateAccessToken = async (user: User) => {
  const { accessToken } = securityConfig;

  return {
    token_type: 'Bearer',
    expires_in: accessToken.ttl,
    access_token: await sign(user),
  };
};

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
