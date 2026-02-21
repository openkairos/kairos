import { authenticate } from '@/app/authentication/application/authenticate';
import { findOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { generateAccessToken } from '@/app/shared/infrastructure/security';
import { verifyPassword } from '@/app/shared/infrastructure/security/verify-password';

export const authenticateUser = authenticate({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});
