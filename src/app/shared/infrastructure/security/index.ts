import { createPasswordHasher } from '@koala-ts/framework';

export const passwordHasher = createPasswordHasher();

export * from './verify-password';
export * from './generate-access-token';
