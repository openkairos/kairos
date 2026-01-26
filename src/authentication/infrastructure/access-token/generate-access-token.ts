import { type AccessToken } from '@/authentication';
import { sign } from '@/authentication/infrastructure/access-token/jose-jwt';
import { type JwtSigner } from '@/authentication/infrastructure/access-token/types';
import { securityConfig } from '@/config';
import { type User } from '@/shared/domain';

export async function generateAccessToken(user: User, signJwt: JwtSigner = sign): Promise<AccessToken> {
  return {
    token_type: 'Bearer',
    expires_in: securityConfig.accessToken.ttl,
    access_token: await signJwt(user),
  };
}
