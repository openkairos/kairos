import { type HttpScope, type NextMiddleware } from '@koala-ts/framework';
import { createValidator, flattenViolations } from '@koala-ts/framework/validator';
import { email, notBlank } from '@koala-ts/framework/validator/constraints';
import { createHttpError } from '@/app/shared/application/errors';

export async function loginValidatorMiddleware(scope: HttpScope, next: NextMiddleware): Promise<void> {
  const validate = createValidator({ constraints: { notBlank, email } });

  const violations = validate(scope.request.body ?? {}, {
    email: ['notBlank', 'email'],
    password: ['notBlank'],
  });

  if (violations.length > 0) {
    throw createHttpError(400, 'Validation failed.', { errors: flattenViolations(violations) });
  }

  await next();
}
