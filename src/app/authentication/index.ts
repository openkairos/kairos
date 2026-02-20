import { authenticate } from '@/app/authentication/application/authenticate';
import { generateAccessToken } from '@/app/authentication/infrastructure/generate-access-token';
import { verifyPassword } from '@/app/authentication/infrastructure/password-verifier';
import { findOneByEmailOrFail } from '@/app/shared/infrastructure/persistence/repository/user-repository';

export const authenticateUser = authenticate({
  findOneByEmailOrFail,
  verifyPassword,
  generateAccessToken,
});
