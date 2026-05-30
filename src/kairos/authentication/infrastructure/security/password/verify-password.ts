import { type VerifyPassword } from '@/kairos/authentication/application/login';
import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { err, ok } from '@/kairos/shared/result/result';
import { type PasswordHasher } from '@koala-ts/framework';

type CreateVerifyPasswordDependencies = Readonly<{
  hasher: PasswordHasher;
}>;

export function createVerifyPassword({ hasher }: CreateVerifyPasswordDependencies): VerifyPassword {
  return async (plainPassword: string, hashedPassword: string) => {
    const isValid = await hasher.verify(hashedPassword, plainPassword);
    return isValid ? ok(undefined) : err(invalidCredentialsError);
  };
}
