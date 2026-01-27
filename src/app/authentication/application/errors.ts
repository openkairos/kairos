import { createHttpError } from '@/app/shared/application/errors';

export const InvalidCredentialsError = createHttpError.Unauthorized('Invalid credentials');
