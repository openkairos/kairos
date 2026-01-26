import { login } from '@/authentication/application/login';
import { partial } from '@/shared/application/util';
import { findByEmailOrFail } from '@/shared/infrastructure/persistence/repository/user-repository';
import { verifyPassword } from '@/shared/infrastructure/security';

export const loginUseCase = { execute: partial(login, findByEmailOrFail, verifyPassword) };
export { AccessToken } from '@/authentication/domain/access-token-interface';
export { AuthenticatedUser } from '@/authentication/domain/authenticated-user';
export { AccessTokenGenerator } from '@/authentication/application/access-token-generator-interface';
