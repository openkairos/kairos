import { describe, expect, it } from 'vitest';
import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import {
  findOneByEmail,
  findOneByEmailOrFail,
} from '@/app/shared/infrastructure/persistence/repository/user-repository';

describe('User Repository', () => {
  describe('find by email or fail', () => {
    it('should find admin user by valid email', async () => {
      const email = 'admin@example.com';

      const user = await findOneByEmailOrFail(email);

      expect(user).toEqual(
        expect.objectContaining({
          id: '1',
          username: 'admin',
          email,
        }),
      );
    });

    it('should fail to find user by invalid email', async () => {
      await expect(findOneByEmailOrFail('invalid@example.com')).rejects.toThrow(InvalidCredentialsError);
    });
  });

  describe('find one by email', () => {
    it('should find admin user by valid email', async () => {
      const email = 'admin@example.com';

      const result = await findOneByEmail(email);

      expect(result).toEqual({
        isOk: true,
        value: expect.objectContaining({
          id: '1',
          username: 'admin',
          email,
        }),
      });
    });

    it('should fail to find user by invalid email', async () => {
      const result = await findOneByEmail('invalid@example.com');

      expect(result).toEqual({
        isOk: false,
        error: {
          type: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials',
        },
      });
    });
  });
});
