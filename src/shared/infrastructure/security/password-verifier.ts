import { InvalidCredentialsError } from '@/authentication/application/errors';
import { type PasswordVerifier } from '@/authentication/domain/password-verifier-interface';
import { passwordHasher } from '@/shared/infrastructure/security/index';

export const verifyPassword: PasswordVerifier = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<void> => {
  const isValid = await passwordHasher.verify(hashedPassword, plainPassword);

  if (!isValid) {
    throw InvalidCredentialsError;
  }
};
