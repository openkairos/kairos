import { type PasswordCredentialsQuery } from '@/authentication/application/login/password-credential-query';
import { type PasswordVerifier } from '@/authentication/application/login/password-verifier-interface';
import { type AuthenticatedUser } from '@/authentication/domain/authenticated-user';
import { type UserFinder } from '@/authentication/domain/user-finder-interface';

export async function login(
  findUser: UserFinder,
  verifyPassword: PasswordVerifier,
  credentials: PasswordCredentialsQuery,
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
