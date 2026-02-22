import { describe, expect, it } from 'vitest';
import { verifyPassword } from './verify-password';
import { invalidCredentialsError } from '@/app/authentication/domain/errors';
import { passwordHasher } from '@/app/shared/infrastructure/security/index';

describe('Password verifier', () => {
  it('should fail if the password is not correct', async () => {
    const hashedPassword = await passwordHasher.hash('password');

    const result = await verifyPassword('wrong_password', hashedPassword);

    expect(result).toEqual({
      isOk: false,
      error: invalidCredentialsError,
    });
  });

  it('should pass if the password is correct', async () => {
    const hashedPassword = await passwordHasher.hash('test_password');

    const result = await verifyPassword('test_password', hashedPassword);

    expect(result).toHaveProperty('isOk', true);
  });
});
