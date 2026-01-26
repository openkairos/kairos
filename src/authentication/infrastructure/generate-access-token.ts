import { sign } from '@/authentication/infrastructure/jose-jwt';
import { type JwtSigner } from '@/authentication/infrastructure/types';
import { securityConfig } from '@/config';
import { type AccessToken } from '@/shared/application/security';
import { type User } from '@/shared/domain';

export async function generateAccessToken(user: User, signJwt: JwtSigner = sign): Promise<AccessToken> {
  return {
    token_type: 'Bearer',
    expires_in: securityConfig.accessToken.ttl,
    access_token: await signJwt(user),
  };
}
