import type { GenerateAccessToken } from '@/kairos/authentication/application/login';
import type { User } from '@/kairos/authentication/domain/user';
import type { SignAccessToken } from '@/kairos/authentication/infrastructure/security/access-token/jwt-access-token-signer';

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
