import { validate as KoalaValidator } from '@/app/shared/infrastructure/validation';
import { validationMiddleware } from '@/app/shared/interface/middleware/validation-middleware';

export const validateRequest = validationMiddleware(KoalaValidator);
