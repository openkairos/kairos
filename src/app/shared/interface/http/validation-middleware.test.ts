import { type HttpScope } from '@koala-ts/framework';
import { describe, expect, it, vi } from 'vitest';
import { HTTP_BAD_REQUEST } from '@/app/shared/interface/http/status-code';
import { validationMiddleware } from '@/app/shared/interface/http/validation-middleware';

describe('Validation middleware', () => {
  it('should pass if no constraints are violated', async () => {
    const validate = vi.fn().mockReturnValue([]);
    const mapViolations = vi.fn();
    const scope = {
      request: {},
      response: { status: 404 },
    };
    const next = vi.fn();
    const middleware = validationMiddleware(validate, mapViolations)({});

    await middleware(scope as HttpScope, next);

    expect(next).toHaveBeenCalled();
    expect(scope.response.status).toBe(404);
  });

  it('should create a response if constraints are violated', async () => {
    const violations = [
      {
        path: 'name',
        message: 'This value should not be blank.',
        constraint: 'notBlank',
        value: '',
      },
    ];
    const validate = vi.fn().mockReturnValue(violations);
    const mapViolations = vi.fn(() => ({ name: ['This value should not be blank.'] }));
    const scope = {
      request: { body: { name: '' } },
      response: { status: 404, body: {} },
    };
    const next = vi.fn();
    const constraints = { name: ['notBlank'] };
    const middleware = validationMiddleware(validate, mapViolations)(constraints);

    await middleware(scope as unknown as HttpScope, next);

    expect(validate).toHaveBeenCalledWith({ name: '' }, constraints);
    expect(mapViolations).toHaveBeenCalledWith(violations);
    expect(next).not.toHaveBeenCalled();
    expect(scope.response.status).toBe(HTTP_BAD_REQUEST);
    expect(scope.response.body).toEqual({
      errors: {
        name: ['This value should not be blank.'],
      },
    });
  });
});
