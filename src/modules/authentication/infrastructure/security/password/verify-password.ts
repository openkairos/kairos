import { type VerifyPassword } from '@/modules/authentication/application/login';
import { invalidCredentialsError } from '@/modules/authentication/domain/errors';
import { err, ok } from '@/modules/shared/kernel/result';
import { type PasswordHasher } from '@/modules/shared/security/password/password-hasher';

interface CreateVerifyPasswordDependencies {
  hasher: PasswordHasher;
}

export function createVerifyPassword({ hasher }: CreateVerifyPasswordDependencies): VerifyPassword {
  return async (plainPassword: string, hashedPassword: string) => {
    const isValid = await hasher.verify(hashedPassword, plainPassword);
    return isValid ? ok(undefined) : err(invalidCredentialsError);
  };
}
