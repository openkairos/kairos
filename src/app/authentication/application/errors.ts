import { createHttpError } from '@/app/shared/application/util';

export const InvalidCredentialsError = createHttpError.Unauthorized('Invalid credentials');

export interface InvalidCredentialsException {
  type: 'INVALID_CREDENTIALS';
  message: 'Invalid credentials';
}

export const invalidCredentialsException: InvalidCredentialsException = {
  type: 'INVALID_CREDENTIALS',
  message: 'Invalid credentials',
};
