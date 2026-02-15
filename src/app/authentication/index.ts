import { authenticate } from '@/app/authentication/application/authenticate';
import { generateAccessToken } from '@/app/authentication/infrastructure/generate-access-token';
import { verifyPassword } from '@/app/authentication/infrastructure/password-verifier';
import { findByEmailOrFail } from '@/app/shared/infrastructure/persistence/repository/user-repository';

export const authenticateUser = authenticate({
  findByEmailOrFail,
  verifyPassword,
  generateAccessToken,
});
