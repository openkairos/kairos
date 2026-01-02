import { partial } from 'ramda';
import { login } from '@/authentication/login';
import { userRepository } from '@/shared/infrastructure/persistence/repository';

export const loginUseCase = { execute: partial(login, [userRepository]) };
