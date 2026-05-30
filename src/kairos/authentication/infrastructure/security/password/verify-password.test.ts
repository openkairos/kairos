import { invalidCredentialsError } from '@/kairos/authentication/domain/errors';
import { passwordHasher } from '@/kairos/authentication/infrastructure/security/password/password-hasher';
import { describe, expect, it } from 'vitest';
import { createVerifyPassword } from './verify-password';

describe('Password verifier', () => {
  it('returns invalid credentials when the password does not match', async () => {
    const verifyPassword = createVerifyPassword({ hasher: passwordHasher });
    const hashedPassword = await passwordHasher.hash('password');

    const result = await verifyPassword('wrong_password', hashedPassword);

    expect(result).toEqual({
      isOk: false,
      error: invalidCredentialsError,
    });
  });

  it('returns success when the password matches', async () => {
    const verifyPassword = createVerifyPassword({ hasher: passwordHasher });
    const hashedPassword = await passwordHasher.hash('test_password');

    const result = await verifyPassword('test_password', hashedPassword);

    expect(result).toHaveProperty('isOk', true);
  });
});
