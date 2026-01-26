import { createHttpError } from '@/shared/application/errors';

export const InvalidCredentialsError = createHttpError.Unauthorized('Invalid credentials');
