import { InvalidCredentialsError, type InvalidCredentialsException } from '@/app/authentication/application/errors';
import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { isErr, type Result } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

/**
 * @throws {import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export function authenticate({ findOneByEmail, verifyPassword, generateAccessToken }: AuthenticateDependencies) {
  return async function execute(credentials: PasswordCredentialsQuery): Promise<AuthenticatedUser> {
    const result = await findOneByEmail(credentials.email);
    if (isErr(result)) throw InvalidCredentialsError;

    const verifyPasswordResult = await verifyPassword(credentials.password, result.value.password);
    if (isErr(verifyPasswordResult)) throw InvalidCredentialsError;

    return {
      user: result.value,
      token: await generateAccessToken(result.value),
    };
  };
}

export type VerifyPassword = (
  password: string,
  hashedPassword: string,
) => Promise<Result<void, InvalidCredentialsException>>;

export interface PasswordCredentialsQuery {
  email: string;
  password: string;
}

export type GenerateAccessToken = (user: User) => Promise<AccessToken>;

interface AuthenticateDependencies {
  findOneByEmail: FindOneByEmail;
  verifyPassword: VerifyPassword;
  generateAccessToken: GenerateAccessToken;
}
