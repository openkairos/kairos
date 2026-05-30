import { type VerifyPassword } from '@/kairos/authentication/application/login';
import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
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
