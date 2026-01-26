import { login } from '@/authentication/application/login';
import { partial } from '@/shared/application/util';
import { findByEmail } from '@/shared/infrastructure/persistence/repository/user-repository';

export const loginUseCase = { execute: partial(login, findByEmail) };
