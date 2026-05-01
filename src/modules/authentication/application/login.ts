import type { AccessToken } from '@/modules/authentication/domain/access-token';
import { type AuthenticatedUser } from '@/modules/authentication/domain/authenticated-user';
import { type InvalidCredentialsError } from '@/modules/authentication/domain/errors';
import type { User } from '@/modules/authentication/domain/user';
import { type FindOneByEmail } from '@/modules/authentication/domain/user-credentials-repository';
import { isErr, ok, type Result } from '@/modules/shared/kernel/result';

export type LoginUserCommand = Readonly<{
  email: string;
  password: string;
}>;

type LoginResult = Result<AuthenticatedUser, InvalidCredentialsError>;

export type VerifyPassword = (
  password: string,
  hashedPassword: string,
) => Promise<Result<void, InvalidCredentialsError>>;

export type GenerateAccessToken = (user: User) => Promise<AccessToken>;

type LoginDependencies = Readonly<{
  findOneByEmail: FindOneByEmail;
  verifyPassword: VerifyPassword;
  generateAccessToken: GenerateAccessToken;
}>;

export function createLogin({ findOneByEmail, verifyPassword, generateAccessToken }: LoginDependencies) {
  return async function login(command: LoginUserCommand): Promise<LoginResult> {
    const userResult = await findOneByEmail(command.email);
    if (isErr(userResult)) return userResult;

    const verifyPasswordResult = await verifyPassword(command.password, userResult.value.password);
    if (isErr(verifyPasswordResult)) return verifyPasswordResult;

    return ok({
      user: userResult.value,
      token: await generateAccessToken(userResult.value),
    });
  };
}
