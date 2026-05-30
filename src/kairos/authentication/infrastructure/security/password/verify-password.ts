import { type VerifyPassword } from '@/kairos/authentication/application/login';
import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { err, ok } from '@/kairos/shared/kernel/result';
import { type PasswordHasher } from '@/kairos/shared/security/password/password-hasher';

type CreateVerifyPasswordDependencies = Readonly<{
  hasher: PasswordHasher;
}>;

export function createVerifyPassword({ hasher }: CreateVerifyPasswordDependencies): VerifyPassword {
  return async (plainPassword: string, hashedPassword: string) => {
    const isValid = await hasher.verify(hashedPassword, plainPassword);
    return isValid ? ok(undefined) : err(invalidCredentialsError);
  };
}
