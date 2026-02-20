import { validate as koaValidator } from '@/shared/infrastructure/validation';
import { validationMiddleware } from '@/shared/interface/middleware/validation-middleware';

export const validate = validationMiddleware(koaValidator);
