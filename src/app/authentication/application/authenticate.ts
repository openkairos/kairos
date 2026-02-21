import { type InvalidCredentialsError } from '@/app/authentication/application/errors';
import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type AuthenticatedUser } from '@/app/authentication/domain/authenticated-user';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { isErr, ok, type Result } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

export function authenticate({ findOneByEmail, verifyPassword, generateAccessToken }: AuthenticateDependencies) {
  return async function execute(credentials: PasswordCredentialsQuery): Promise<AuthenticateResult> {
    const userResult = await findOneByEmail(credentials.email);
    if (isErr(userResult)) return userResult;

    const verifyPasswordResult = await verifyPassword(credentials.password, userResult.value.password);
    if (isErr(verifyPasswordResult)) return verifyPasswordResult;

    return ok({
      user: userResult.value,
      token: await generateAccessToken(userResult.value),
    });
  };
}

export interface PasswordCredentialsQuery {
  email: string;
  password: string;
}

type AuthenticateResult = Result<AuthenticatedUser, InvalidCredentialsError>;

export type VerifyPassword = (
  password: string,
  hashedPassword: string,
) => Promise<Result<void, InvalidCredentialsError>>;

export type GenerateAccessToken = (user: User) => Promise<AccessToken>;

interface AuthenticateDependencies {
  findOneByEmail: FindOneByEmail;
  verifyPassword: VerifyPassword;
  generateAccessToken: GenerateAccessToken;
}
