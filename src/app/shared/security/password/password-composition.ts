import { passwordHasher } from '@/app/shared/security/password/password-hasher';

export const hashPassword = (plainPassword: string): Promise<string> => passwordHasher.hash(plainPassword);
