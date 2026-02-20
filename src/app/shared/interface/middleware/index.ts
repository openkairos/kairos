import { validate as koaValidator } from '@/app/shared/infrastructure/validation';
import { validationMiddleware } from '@/app/shared/interface/middleware/validation-middleware';

export const validate = validationMiddleware(koaValidator);
export * from './http-error-renderer';
