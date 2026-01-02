import { findByEmail } from './user-repository';
import { type UserRepository } from '@/authentication/types';

export const userRepository: UserRepository = {
  findByEmail,
};
