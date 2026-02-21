import { describe, expect, it, vi } from 'vitest';
import {
  authenticate,
  type GenerateAccessToken,
  type VerifyPassword,
} from '@/app/authentication/application/authenticate';
import type { AccessToken } from '@/app/authentication/domain/access-token';
import { type FindOneByEmailOrFail } from '@/app/authentication/domain/user-credentials-repository';
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
    const findOneByEmailOrFail: FindOneByEmailOrFail = vi.fn((email: string) =>
      Promise.resolve({
        ...user,
        email,
      }),
    );
    const verifyPassword: VerifyPassword = vi.fn(() => Promise.resolve());
    const generateAccessToken: GenerateAccessToken = vi.fn(() => Promise.resolve(token));
    const execute = authenticate({ findOneByEmailOrFail, verifyPassword, generateAccessToken });

    const result = await execute({
      email: 'admin@example.com',
      password: 'plain-password',
    });

    expect(findOneByEmailOrFail).toHaveBeenCalledWith('admin@example.com');
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
    const findOneByEmailOrFail: FindOneByEmailOrFail = vi.fn(() => Promise.resolve(user));
    const error = new Error('Invalid credentials');
    const verifyPassword: VerifyPassword = vi.fn(() => Promise.reject(error));
    const generateAccessToken: GenerateAccessToken = vi.fn();
    const execute = authenticate({ findOneByEmailOrFail, verifyPassword, generateAccessToken });

    await expect(
      execute({
        email: 'admin@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrowError('Invalid credentials');
    expect(generateAccessToken).not.toHaveBeenCalled();
  });
});
