import { type GenerateAccessToken } from '@/modules/authentication/application/login';
import type { User } from '@/modules/authentication/domain/user';
import { type SignAccessToken } from '@/modules/authentication/infrastructure/security/access-token/jwt-access-token-signer';

interface AccessTokenConfig {
  ttl: number;
}

type CreateGenerateAccessTokenDependencies = Readonly<{
  accessTokenConfig: AccessTokenConfig;
  sign: SignAccessToken;
}>;

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
