import { createSecretKey, randomUUID } from 'node:crypto';
import { SignJWT } from 'jose';
import { securityConfig } from '@/config';
import { type User } from '@/shared/domain';

const { appKey, accessToken } = securityConfig;
const key = createSecretKey(Buffer.from(appKey.replace('base64:', ''), 'base64'));

export async function sign(user: User): Promise<string> {
  const jwtSigner = new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: accessToken.algorithm })
    .setIssuer(accessToken.issuer)
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${accessToken.ttl}s`)
    .setJti(randomUUID());

  return jwtSigner.sign(key);
}
