import { type AccessToken } from '@/authentication/domain/access-token';
import { type User } from '@/shared/domain/entity/User';

export async function generateAccessToken(_: User): Promise<AccessToken> {
  return Promise.resolve({
    token_type: 'Bearer',
    expires_in: 3600,
    access_token: '',
  });
}
