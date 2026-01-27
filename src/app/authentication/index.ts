import { login } from '@/app/authentication/application/login/login';
import { generateAccessToken } from '@/app/authentication/infrastructure/generate-access-token';
import { verifyPassword } from '@/app/authentication/infrastructure/password-verifier';
import { partial } from '@/app/shared/application/util';
import { findByEmailOrFail } from '@/app/shared/infrastructure/persistence/repository/user-repository';

export const loginUseCase = { execute: partial(login, findByEmailOrFail, verifyPassword, generateAccessToken) };
