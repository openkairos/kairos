import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';
import { createValidator, type Violation } from '@koala-ts/framework/validator';
import { email, notBlank } from '@koala-ts/framework/validator/constraints';

export async function loginValidatorMiddleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
  const validate = createValidator({ constraints: { notBlank, email } });

  const violations = validate(scope.request.body ?? {}, {
    email: ['notBlank', 'email'],
    password: ['notBlank'],
  });

  if (violations.length > 0) {
    scope.response.status = 400;
    scope.response.body = {
      errors: flattenViolations(violations),
    };
    return;
  }

  await next();
}

function flattenViolations(violations: Violation[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const violation of violations) {
    const property = violation.path;

    result[property] ??= [];

    result[property].push(violation.message);
  }

  return result;
}
