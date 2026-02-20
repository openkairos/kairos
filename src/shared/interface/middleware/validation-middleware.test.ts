import { type HttpScope } from '@koala-ts/framework';
import { describe, expect, it, vi } from 'vitest';
import { validate } from '@/shared/infrastructure/validation';
import { validationMiddleware } from '@/shared/interface/middleware/validation-middleware';

describe('Validation middleware', () => {
  it('should pass if no constraints are violated', async () => {
    const scope = {
      request: {},
      response: { status: 404 },
    };
    const next = vi.fn();
    const middleware = validationMiddleware(validate)({});

    await middleware(scope as HttpScope, next);

    expect(next).toHaveBeenCalled();
    expect(scope.response.status).toBe(404);
  });

  it('should create a response if constraints are violated', async () => {
    const scope = {
      request: { body: { name: '' } },
      response: { status: 404, body: {} },
    };
    const next = vi.fn();
    const middleware = validationMiddleware(validate)({ name: ['notBlank'] });

    await expect(middleware(scope as unknown as HttpScope, next)).rejects.toThrow('Validation failed.');
  });
});
