import { builtInConstraints, createValidationMiddleware, createValidator } from '@koala-ts/framework/validator';

const validate = createValidator({ constraints: builtInConstraints });
export const validateRequest = createValidationMiddleware({ validate });
