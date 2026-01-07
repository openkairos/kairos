import { login } from '@/authentication/login';
import { partial } from '@/shared/application/fp';
import { userRepository } from '@/shared/infrastructure/persistence/repository';

export const loginUseCase = { execute: partial(login, userRepository) };
