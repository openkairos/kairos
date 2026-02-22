import { flattenViolations } from '@koala-ts/framework/validator';
import { validationMiddleware } from '@/app/shared/interface/http';
import { validate } from '@/composition/http/validation';

export const validateRequest = validationMiddleware(validate, flattenViolations);
