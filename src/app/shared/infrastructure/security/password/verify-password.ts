import { type VerifyPassword } from '@/app/authentication/application/login';
import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { err, ok } from '@/app/shared/application/result';
import { type PasswordHasher } from '@/app/shared/infrastructure/security/password/password-hasher';

interface CreateVerifyPasswordDependencies {
  hasher: PasswordHasher;
}

export function createVerifyPassword({ hasher }: CreateVerifyPasswordDependencies): VerifyPassword {
  return async (plainPassword: string, hashedPassword: string) => {
    const isValid = await hasher.verify(hashedPassword, plainPassword);
    return isValid ? ok(undefined) : err(invalidCredentialsError);
  };
}
