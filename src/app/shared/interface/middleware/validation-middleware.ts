import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';
import { flattenViolations, type ValidationRules, type Validator } from '@koala-ts/framework/validator';
import { HTTP_BAD_REQUEST } from '@/app/shared/interface/status-code';

export function validationMiddleware(validate: Validator) {
  return function createMiddleware(constraints: ValidationRules) {
    return async function middleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
      const violations = validate(scope.request.body ?? {}, constraints);

      if (violations.length > 0) {
        scope.response.status = HTTP_BAD_REQUEST;
        scope.response.body = { errors: flattenViolations(violations) };
        return;
      }

      await next();
    };
  };
}
