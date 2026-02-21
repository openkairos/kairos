import { login } from '@/app/authentication/application/login';
import { findOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { generateAccessToken } from '@/app/shared/infrastructure/security';
import { verifyPassword } from '@/app/shared/infrastructure/security/verify-password';

export const loginUser = login({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});
