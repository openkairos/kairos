import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import type { User } from '@/app/shared/domain/entity';
import { type FindOneByEmailOrFail } from '@/app/shared/domain/repository';

/**
 * @throws {import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export function authenticate({ findOneByEmailOrFail, verifyPassword, generateAccessToken }: AuthenticateDependencies) {
  return async function execute(credentials: PasswordCredentialsQuery): Promise<AuthenticatedUser> {
    const user = await findOneByEmailOrFail(credentials.email);

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
export type VerifyPassword = (password: string, hashedPassword: string) => Promise<void>;

export interface PasswordCredentialsQuery {
  email: string;
  password: string;
}

export type GenerateAccessToken = (user: User) => Promise<AccessToken>;

interface AuthenticateDependencies {
  findOneByEmailOrFail: FindOneByEmailOrFail;
  verifyPassword: VerifyPassword;
  generateAccessToken: GenerateAccessToken;
}
