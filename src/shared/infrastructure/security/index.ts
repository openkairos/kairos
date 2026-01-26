import { createPasswordHasher } from '@koala-ts/framework';

export const passwordHasher = createPasswordHasher();
export * from './password-verifier';
