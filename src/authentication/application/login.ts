import { type AuthenticatedUser } from '@/authentication';
import { type PasswordVerifier } from '@/authentication/application/password-verifier-interface';
import { type PasswordCredentials } from '@/authentication/application/query/password-credential';
import { type UserFinder } from '@/authentication/domain/user-finder-interface';

export async function login(
  findUser: UserFinder,
  verifyPassword: PasswordVerifier,
  credentials: PasswordCredentials,
): Promise<AuthenticatedUser> {
  const user = await findUser(credentials.email);

  await verifyPassword(credentials.password, user.password);

  return {
    user,
    token: {
      access_token: 'mocked_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    },
  };
}
