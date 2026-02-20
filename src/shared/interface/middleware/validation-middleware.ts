import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';
import { flattenViolations, type ValidationRules, type Validator } from '@koala-ts/framework/validator';
import { createHttpError } from '@/app/shared/application/errors';

export function validationMiddleware(validate: Validator) {
  return function createMiddleware(constraints: ValidationRules) {
    return async function middleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
      const violations = validate(scope.request.body ?? {}, constraints);

      if (violations.length > 0) {
        throw createHttpError(400, 'Validation failed.', { errors: flattenViolations(violations) });
      }

      await next();
    };
  };
}
