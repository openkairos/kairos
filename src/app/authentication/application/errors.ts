import { createHttpError } from '@/app/shared/application/util';

export const InvalidCredentialsError = createHttpError.Unauthorized('Invalid credentials');
