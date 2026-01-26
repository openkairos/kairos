import { login } from '@/authentication/application/login';
import { partial } from '@/shared/application/util';
import { findByEmailOrFail } from '@/shared/infrastructure/persistence/repository/user-repository';

export const loginUseCase = { execute: partial(login, findByEmailOrFail) };
