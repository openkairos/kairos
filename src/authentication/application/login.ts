import { type PasswordCredentials } from '@/authentication/application/query/password-credential';
import { type UserFinder } from '@/authentication/domain/user-finder-interface';
import { type AuthenticatedUser } from '@/shared/application/security';

export async function login(findUser: UserFinder, credentials: PasswordCredentials): Promise<AuthenticatedUser> {
  const user = await findUser(credentials.email);

  return {
    user,
    token: {
      access_token: 'mocked_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    },
  };
}
