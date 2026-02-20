import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';
import { flattenViolations, type ValidationRules, type Validator } from '@koala-ts/framework/validator';

export function validationMiddleware(validate: Validator) {
  return function createMiddleware(constraints: ValidationRules) {
    return async function middleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
      const violations = validate(scope.request.body ?? {}, constraints);

      if (violations.length > 0) {
        scope.response.status = 400;
        scope.response.body = { errors: flattenViolations(violations) };
        return;
      }

      await next();
    };
  };
}
