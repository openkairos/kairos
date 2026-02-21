import { describe, expect, it, vi } from 'vitest';
import {
  authenticate,
  type GenerateAccessToken,
  type VerifyPassword,
} from '@/app/authentication/application/authenticate';
import { invalidCredentialsException } from '@/app/authentication/application/errors';
import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { ok } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

describe('Authenticate use case', () => {
  it('should authenticate user and return access token', async () => {
    const user: User = {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'hashed-password',
    };
    const token: AccessToken = {
      token_type: 'Bearer',
      expires_in: 3600,
      access_token: 'jwt-token',
    };
    const findOneByEmail: FindOneByEmail = vi.fn().mockResolvedValue(ok(user));
    const verifyPassword: VerifyPassword = vi.fn().mockResolvedValue(ok(undefined));
    const generateAccessToken: GenerateAccessToken = vi.fn(() => Promise.resolve(token));
    const execute = authenticate({ findOneByEmail, verifyPassword, generateAccessToken });

    const result = await execute({
      email: 'admin@example.com',
      password: 'plain-password',
    });

    expect(findOneByEmail).toHaveBeenCalledWith('admin@example.com');
    expect(verifyPassword).toHaveBeenCalledWith('plain-password', 'hashed-password');
    expect(generateAccessToken).toHaveBeenCalledWith(user);
    expect(result).toEqual({ user, token });
  });

  it('should rethrow invalid credentials errors and not generate access token', async () => {
    const user: User = {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'hashed-password',
    };
    const findOneByEmail: FindOneByEmail = vi.fn().mockResolvedValue(ok(user));
    const verifyPassword: VerifyPassword = vi
      .fn()
      .mockResolvedValue({ isErr: true, error: invalidCredentialsException });
    const generateAccessToken: GenerateAccessToken = vi.fn();
    const execute = authenticate({ findOneByEmail, verifyPassword, generateAccessToken });

    await expect(
      execute({
        email: 'admin@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrowError('Invalid credentials');
    expect(generateAccessToken).not.toHaveBeenCalled();
  });
});
