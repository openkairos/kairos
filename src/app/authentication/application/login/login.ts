import { type AccessTokenGenerator } from '@/app/authentication/application/login/access-token-generator-interface';
import { type PasswordCredentialsQuery } from '@/app/authentication/application/login/password-credential-query';
import { type PasswordVerifier } from '@/app/authentication/application/login/password-verifier-interface';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { type UserFinder } from '@/app/authentication/domain/user-finder-interface';

export async function login(
  findUser: UserFinder,
  verifyPassword: PasswordVerifier,
  generateAccessToken: AccessTokenGenerator,
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
