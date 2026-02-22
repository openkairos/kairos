import { describe, expect, it, vi } from 'vitest';
import { createLoginHttpMapper } from '@/app/authentication/adapter/login-http-mapper';
import { invalidCredentialsError } from '@/app/authentication/domain/errors';

describe('Login HTTP mapper', () => {
  it('should map successful authentication to HTTP ok response', () => {
    const mapSuccessToHttp = vi.fn().mockReturnValue({
      status: 200,
      body: { data: { user: { id: 'u-1' }, token: { access_token: 'token' } } },
    });
    const loginHttpMapper = createLoginHttpMapper({ mapSuccessToHttp });
    const authenticatedUser = {
      user: {
        id: 'u-1',
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed-password',
      },
      token: {
        token_type: 'Bearer' as const,
        expires_in: 3600,
        access_token: 'token',
      },
    };

    const response = loginHttpMapper.onOk(authenticatedUser);

    expect(mapSuccessToHttp).toHaveBeenCalledWith(
      authenticatedUser,
      200,
      expect.objectContaining({ groups: ['auth:login'] }),
    );
    expect(response).toEqual({
      status: 200,
      body: { data: { user: { id: 'u-1' }, token: { access_token: 'token' } } },
    });
  });

  it('should map invalid credentials error to unauthorized response', () => {
    const mapSuccessToHttp = vi.fn();
    const loginHttpMapper = createLoginHttpMapper({ mapSuccessToHttp });

    const response = loginHttpMapper.onErr(invalidCredentialsError);

    expect(mapSuccessToHttp).not.toHaveBeenCalled();
    expect(response).toEqual({
      status: 401,
      body: { message: 'Invalid credentials' },
    });
  });
});
