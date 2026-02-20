import { type HttpScope } from '@koala-ts/framework';
import { describe, expect, it, vi } from 'vitest';
import { renderHttpError } from '@/app/shared/interface/middleware/http-error-renderer';

describe('HTTP error renderer middleware', () => {
  it('should call next when no error is thrown', async () => {
    const scope = {
      response: {
        status: 404,
        body: undefined,
        withHeaders: vi.fn(),
      },
    };
    const next = vi.fn();

    await renderHttpError(scope as unknown as HttpScope, next);

    expect(next).toHaveBeenCalledOnce();
    expect(scope.response.status).toBe(404);
    expect(scope.response.body).toBeUndefined();
    expect(scope.response.withHeaders).not.toHaveBeenCalled();
  });

  it('should rethrow non-http errors', async () => {
    const scope = {
      response: {
        status: 404,
        body: undefined,
        withHeaders: vi.fn(),
      },
    };
    const next = vi.fn(() => {
      throw new Error('boom');
    });

    await expect(renderHttpError(scope as unknown as HttpScope, next)).rejects.toThrow('boom');
    expect(scope.response.status).toBe(404);
    expect(scope.response.body).toBeUndefined();
    expect(scope.response.withHeaders).not.toHaveBeenCalled();
  });

  it('should render http errors as JSON response', async () => {
    const scope = {
      response: {
        status: 404,
        body: undefined,
        withHeaders: vi.fn(),
      },
    };
    const error = Object.assign(new Error('Validation failed'), {
      status: 422,
      expose: true,
      errors: {
        email: ['Invalid email'],
      },
    });
    const next = vi.fn(() => Promise.reject(error));

    await renderHttpError(scope as unknown as HttpScope, next);

    expect(scope.response.status).toBe(422);
    expect(scope.response.body).toBe(JSON.stringify(error));
    expect(scope.response.withHeaders).toHaveBeenCalledWith({ 'Content-Type': 'application/json' });
  });
});
