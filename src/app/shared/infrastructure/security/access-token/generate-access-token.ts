import { type GenerateAccessToken } from '@/app/authentication/application/login';
import type { User } from '@/app/authentication/domain/user';
import { type SignAccessToken } from '@/app/shared/infrastructure/security/access-token/jwt-access-token-signer';

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
