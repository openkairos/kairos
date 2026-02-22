import { login } from '@/app/authentication/application/login';
import { findOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { generateAccessToken, verifyPassword } from '@/app/shared/infrastructure/security';

export const loginUser = login({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});
