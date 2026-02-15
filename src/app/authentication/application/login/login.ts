import { type AccessTokenGenerator } from '@/app/authentication/application/login/access-token-generator-interface';
import { type PasswordCredentialsQuery } from '@/app/authentication/application/login/password-credential-query';
import { type PasswordVerifier } from '@/app/authentication/application/login/password-verifier-interface';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { type UserFinder } from '@/app/authentication/domain/user-finder-interface';

interface AuthenticateDependencies {
  findByEmailOrFail: UserFinder;
  verifyPassword: PasswordVerifier;
  generateAccessToken: AccessTokenGenerator;
}

/**
 * @throws {import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export function authenticate({ findByEmailOrFail, verifyPassword, generateAccessToken }: AuthenticateDependencies) {
  return async (credentials: PasswordCredentialsQuery): Promise<AuthenticatedUser> => {
    const user = await findByEmailOrFail(credentials.email);

    await verifyPassword(credentials.password, user.password);

    return {
      user,
      token: await generateAccessToken(user),
    };
  };
}
