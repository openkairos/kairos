import { flattenViolations } from '@koala-ts/framework/validator';
import { validate as koalaValidator } from '@/app/shared/infrastructure/validation';
import { validationMiddleware } from '@/app/shared/interface/middleware';

export const validateRequest = validationMiddleware(koalaValidator, flattenViolations);
