import { createPasswordHasher } from '@koala-ts/framework';

export const passwordHasher = createPasswordHasher();

export const hashPassword = (plainPassword: string): Promise<string> => passwordHasher.hash(plainPassword);
