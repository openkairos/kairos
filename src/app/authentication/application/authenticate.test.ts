import { describe, expect, it, vi } from 'vitest';
import {
  authenticate,
  type GenerateAccessToken,
  type VerifyPassword,
} from '@/app/authentication/application/authenticate';
import { invalidCredentialsError } from '@/app/authentication/application/errors';
import { type AccessToken } from '@/app/authentication/domain/access-token';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { err, ok } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

describe('Authenticate use case', () => {
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

  it('should fail if user does not exist', async () => {
    const findOneByEmail: FindOneByEmail = vi.fn().mockResolvedValue(err(invalidCredentialsError));
    const verifyPassword: VerifyPassword = vi.fn();
    const generateAccessToken: GenerateAccessToken = vi.fn();
    const execute = authenticate({ findOneByEmail, verifyPassword, generateAccessToken });

    const result = await execute({
      email: 'invalid@example.com',
      password: 'plain-password',
    });

    expect(result).toEqual(err(invalidCredentialsError));
  });

  it('should fail if password is invalid', async () => {
    const findOneByEmail: FindOneByEmail = vi.fn().mockResolvedValue(ok(user));
    const verifyPassword: VerifyPassword = vi.fn().mockResolvedValue(err(invalidCredentialsError));
    const generateAccessToken: GenerateAccessToken = vi.fn();
    const execute = authenticate({ findOneByEmail, verifyPassword, generateAccessToken });

    const result = await execute({
      email: 'admin@example.com',
      password: 'plain-password',
    });

    expect(result).toEqual(err(invalidCredentialsError));
  });

  it('should authenticate user and return access token', async () => {
    const findOneByEmail: FindOneByEmail = vi.fn().mockResolvedValue(ok(user));
    const verifyPassword: VerifyPassword = vi.fn().mockResolvedValue(ok(undefined));
    const generateAccessToken: GenerateAccessToken = vi.fn().mockResolvedValue(token);
    const execute = authenticate({ findOneByEmail, verifyPassword, generateAccessToken });

    const result = await execute({
      email: 'admin@example.com',
      password: 'plain-password',
    });

    expect(findOneByEmail).toHaveBeenCalledWith('admin@example.com');
    expect(verifyPassword).toHaveBeenCalledWith('plain-password', 'hashed-password');
    expect(generateAccessToken).toHaveBeenCalledWith(user);
    expect(result).toEqual(ok({ user, token }));
  });
});
