import { type HttpMiddleware } from '@koala-ts/framework';
import { type ValidationSchema } from '@koala-ts/framework/validator';

export type RequestValidator = (schema: ValidationSchema) => HttpMiddleware;
