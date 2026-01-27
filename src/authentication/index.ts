import { login } from '@/authentication/application/login/login';
import { generateAccessToken } from '@/authentication/infrastructure/access-token/generate-access-token';
import { partial } from '@/shared/application/util';
import { findByEmailOrFail } from '@/shared/infrastructure/persistence/repository/user-repository';
import { verifyPassword } from '@/shared/infrastructure/security';

export const loginUseCase = { execute: partial(login, findByEmailOrFail, verifyPassword, generateAccessToken) };
