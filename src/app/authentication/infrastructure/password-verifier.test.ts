import { describe, expect, it } from 'vitest';
import { verifyPassword } from './password-verifier';
import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import { passwordHasher } from '@/app/shared/infrastructure/security';

describe('Password verifier', () => {
  it('should fail if the password is not correct', async () => {
    const hashedPassword = await passwordHasher.hash('password');

    await expect(verifyPassword('wrong_password', hashedPassword)).rejects.toThrow(InvalidCredentialsError);
  });

  it('should pass if the password is correct', async () => {
    const hashedPassword = await passwordHasher.hash('test_password');

    await expect(verifyPassword('test_password', hashedPassword)).resolves.not.toThrow();
  });
});
