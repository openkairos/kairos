import { validate } from '@/shared/infrastructure/validation';
import { validationMiddleware } from '@/shared/interface/middleware/validation-middleware';

export const requestSchema = validationMiddleware(validate);
