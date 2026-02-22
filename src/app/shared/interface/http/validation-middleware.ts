import { type ValidationRules, type Validator } from '@koala-ts/framework/validator';
import { HTTP_BAD_REQUEST } from '@/app/shared/interface/http/status-code';
import { type HttpScope, type NextMiddleware } from '@/app/shared/interface/http/types';

export type ViolationMapper = (violations: ReturnType<Validator>) => Record<string, string[] | string>;

export function validationMiddleware(validate: Validator, mapViolations: ViolationMapper) {
  return function createMiddleware(constraints: ValidationRules) {
    return async function middleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
      const violations = validate(scope.request.body ?? {}, constraints);

      if (violations.length > 0) {
        scope.response.status = HTTP_BAD_REQUEST;
        scope.response.body = { errors: mapViolations(violations) };
        return;
      }

      await next();
    };
  };
}
