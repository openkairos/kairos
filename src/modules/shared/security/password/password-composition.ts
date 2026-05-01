import { passwordHasher } from '@/modules/shared/security/password/password-hasher';

export const hashPassword = (plainPassword: string): Promise<string> => passwordHasher.hash(plainPassword);
