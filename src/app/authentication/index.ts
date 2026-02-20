import { authenticate } from '@/app/authentication/application/authenticate';
import { findOneByEmailOrFail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { generateAccessToken, verifyPassword } from '@/app/shared/infrastructure/security';

export const authenticateUser = authenticate({
  findOneByEmailOrFail,
  verifyPassword,
  generateAccessToken,
});
