import { describe, expect, it } from 'vitest';
import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import { findByEmailOrFail } from '@/app/shared/infrastructure/persistence/repository/user-repository';

describe('User Repository', () => {
  describe('find by email or fail', () => {
    it('should find admin user by valid email', async () => {
      const email = 'admin@example.com';

      const user = await findByEmailOrFail(email);

      expect(user).toEqual(
        expect.objectContaining({
          id: '1',
          username: 'admin',
          email,
        }),
      );
    });

    it('should fail to find user by invalid email', async () => {
      await expect(findByEmailOrFail('invalid@example.com')).rejects.toThrow(InvalidCredentialsError);
    });
  });
});
