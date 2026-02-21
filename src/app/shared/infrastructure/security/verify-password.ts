import { invalidCredentialsError } from '@/app/authentication/application/errors';
import { type VerifyPassword } from '@/app/authentication/application/login';
import { err, ok } from '@/app/shared/application/util/result';
import { passwordHasher } from '@/app/shared/infrastructure/security/index';

export const verifyPassword: VerifyPassword = async (plainPassword: string, hashedPassword: string) => {
  const isValid = await passwordHasher.verify(hashedPassword, plainPassword);
  return isValid ? ok(undefined) : err(invalidCredentialsError);
};
