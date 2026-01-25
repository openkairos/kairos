import { securityConfig } from '@/config';
import { type AccessToken } from '@/shared/application/security';
import { type User } from '@/shared/domain';
import { sign } from '@/shared/infrastructure/security/authentication/jose-jwt';
import { type JwtSigner } from '@/shared/infrastructure/security/authentication/types';

export async function generateAccessToken(user: User, signJwt: JwtSigner = sign): Promise<AccessToken> {
  return {
    token_type: 'Bearer',
    expires_in: securityConfig.accessToken.ttl,
    access_token: await signJwt(user),
  };
}
