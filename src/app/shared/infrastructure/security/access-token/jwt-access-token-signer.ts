import { type KeyObject } from 'node:crypto';
import { SignJWT } from 'jose';
import type { User } from '@/app/authentication/domain/user';
import { type Clock } from '@/app/shared/application/clock';

interface AccessTokenSigningConfig {
  ttl: number;
  algorithm: string;
  issuer: string;
}

interface CreateJwtAccessTokenSignerDependencies {
  key: KeyObject;
  accessTokenConfig: AccessTokenSigningConfig;
  clock: Clock;
  newJti: () => string;
}

export type SignAccessToken = (user: User) => Promise<string>;

export function createJwtAccessTokenSigner({
  key,
  accessTokenConfig,
  clock,
  newJti,
}: CreateJwtAccessTokenSignerDependencies): SignAccessToken {
  return async (user: User): Promise<string> => {
    const issuedAtInSeconds = Math.floor(clock().getTime() / 1000);
    const expiresAtInSeconds = issuedAtInSeconds + accessTokenConfig.ttl;

    const jwtSigner = new SignJWT({ id: user.id, username: user.username })
      .setProtectedHeader({ alg: accessTokenConfig.algorithm })
      .setIssuer(accessTokenConfig.issuer)
      .setSubject(user.id)
      .setIssuedAt(issuedAtInSeconds)
      .setExpirationTime(expiresAtInSeconds)
      .setJti(newJti());

    return jwtSigner.sign(key);
  };
}
