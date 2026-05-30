import { type RequestValidator } from '@/interface/http/request-validator.type';
import { builtInConstraints, createValidationMiddleware, createValidator } from '@koala-ts/framework/validator';

const validate = createValidator({ constraints: builtInConstraints });

export const validateRequest: RequestValidator = createValidationMiddleware({ validate });
