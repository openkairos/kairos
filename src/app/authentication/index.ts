import { authenticate } from '@/app/authentication/application/authenticate';
import { findOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { generateAccessToken, verifyPassword } from '@/app/shared/infrastructure/security';

export const authenticateUser = authenticate({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});
