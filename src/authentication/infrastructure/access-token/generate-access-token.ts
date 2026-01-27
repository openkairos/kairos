import { type AccessToken } from '@/authentication/domain/access-token';
import { sign } from '@/authentication/infrastructure/access-token/jose-jwt';
import { type JwtSigner } from '@/authentication/infrastructure/access-token/types';
import { securityConfig } from '@/config';
import { type User } from '@/shared/domain/entity/User';

export async function generateAccessToken(user: User, signJwt: JwtSigner = sign): Promise<AccessToken> {
  return {
    token_type: 'Bearer',
    expires_in: securityConfig.accessToken.ttl,
    access_token: await signJwt(user),
  };
}
