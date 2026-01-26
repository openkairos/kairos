import { type PasswordCredentials } from '@/authentication/application/query/password-credential.query';
import { type UserRepository } from '@/authentication/types';
import { createHttpError, type HttpErrorFactory } from '@/shared/application/errors';
import { type AuthenticatedUser } from '@/shared/application/security';

export async function login(
  repository: UserRepository,
  credentials: PasswordCredentials,
  errorFactory: HttpErrorFactory = createHttpError,
): Promise<AuthenticatedUser> {
  const user = await repository.findByEmail(credentials.email);

  if (undefined === user) {
    throw errorFactory.Unauthorized('Invalid credentials');
  }

  return {
    user,
    token: {
      access_token: 'mocked_access_token',
      token_type: 'Bearer',
      expires_in: 3600,
    },
  };
}
