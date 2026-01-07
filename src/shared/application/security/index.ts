import { createPasswordHasher } from '@koala-ts/framework';

export const passwordHasher = createPasswordHasher();
export type PasswordHasher = typeof passwordHasher;
