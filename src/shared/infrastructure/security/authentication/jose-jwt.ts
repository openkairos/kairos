import { createSecretKey, randomUUID } from 'node:crypto';
import { SignJWT } from 'jose';
import { securityConfig } from '@/config';
import { type User } from '@/shared/domain';

const key = createSecretKey(Buffer.from(securityConfig.appKey.replace('base64:', ''), 'base64'));

export async function sign(user: User): Promise<string> {
  const jwtSigner = new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('kairos')
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${securityConfig.accessToken.ttl}s`)
    .setJti(randomUUID());

  return jwtSigner.sign(key);
}
