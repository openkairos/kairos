import { type HttpScope } from '@koala-ts/framework';
import { describe, expect, it, vi } from 'vitest';
import { validate } from '@/app/shared/infrastructure/validation';
import { validationMiddleware } from '@/app/shared/interface/middleware/validation-middleware';
import { HTTP_BAD_REQUEST } from '@/app/shared/interface/status-code';

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

    await middleware(scope as unknown as HttpScope, next);

    expect(scope.response.status).toBe(HTTP_BAD_REQUEST);
    expect(scope.response.body).toEqual({
      errors: {
        name: ['This value should not be blank.'],
      },
    });
  });
});
