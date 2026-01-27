import { login } from '@/authentication/application/login/login';
import { generateAccessToken } from '@/authentication/infrastructure/generate-access-token';
import { verifyPassword } from '@/authentication/infrastructure/password-verifier';
import { partial } from '@/shared/application/util';
import { findByEmailOrFail } from '@/shared/infrastructure/persistence/repository/user-repository';

export const loginUseCase = { execute: partial(login, findByEmailOrFail, verifyPassword, generateAccessToken) };
