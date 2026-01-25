import { createPasswordHasher } from '@koala-ts/framework';
import { type PasswordHasher } from '@/shared/application/security/types';

export * from './types';
export const passwordHasher: PasswordHasher = createPasswordHasher();
