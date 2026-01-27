import { InvalidCredentialsError } from '@/app/authentication/application/errors';
import { type PasswordVerifier } from '@/app/authentication/application/login/password-verifier-interface';
import { passwordHasher } from '@/app/shared/infrastructure/security';

export const verifyPassword: PasswordVerifier = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<void> => {
  const isValid = await passwordHasher.verify(hashedPassword, plainPassword);

  if (!isValid) {
    throw InvalidCredentialsError;
  }
};
