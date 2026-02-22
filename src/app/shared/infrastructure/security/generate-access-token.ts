import { createSecretKey, randomUUID } from 'node:crypto';
import { type GenerateAccessToken } from '@/app/authentication/application/login';
import type { User } from '@/app/authentication/domain/user';
import { systemClock } from '@/app/shared/application/clock';
import {
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/app/shared/infrastructure/security/jwt-access-token-signer';
import { securityConfig } from '@/config/security';

interface AccessTokenConfig {
  ttl: number;
}

interface CreateGenerateAccessTokenDependencies {
  accessTokenConfig: AccessTokenConfig;
  sign: SignAccessToken;
}

export function createGenerateAccessToken({
  accessTokenConfig,
  sign,
}: CreateGenerateAccessTokenDependencies): GenerateAccessToken {
  return async (user: User) => ({
    token_type: 'Bearer',
    expires_in: accessTokenConfig.ttl,
    access_token: await sign(user),
  });
}

const defaultSigningKey = createSecretKey(Buffer.from(securityConfig.appKey.replace('base64:', ''), 'base64'));

function createDefaultSigner(): SignAccessToken {
  return createJwtAccessTokenSigner({
    key: defaultSigningKey,
    accessTokenConfig: securityConfig.accessToken,
    clock: systemClock,
    newJti: randomUUID,
  });
}

export const generateAccessToken = createGenerateAccessToken({
  accessTokenConfig: securityConfig.accessToken,
  sign: createDefaultSigner(),
});
