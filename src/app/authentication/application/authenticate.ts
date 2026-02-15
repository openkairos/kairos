import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { type UserFinder } from '@/app/authentication/domain/user-finder';
import type { User } from '@/app/shared/domain/entity';

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

/**
 * Verifies a plain text password against a hashed password.
 * @throws {import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export type PasswordVerifier = (password: string, hashedPassword: string) => Promise<void>;

export interface PasswordCredentialsQuery {
  email: string;
  password: string;
}

export type AccessTokenGenerator = (user: User) => Promise<AccessToken>;

interface AuthenticateDependencies {
  findByEmailOrFail: UserFinder;
  verifyPassword: PasswordVerifier;
  generateAccessToken: AccessTokenGenerator;
}
