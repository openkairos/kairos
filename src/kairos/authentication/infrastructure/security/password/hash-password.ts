import { passwordHasher } from '@/kairos/authentication/infrastructure/security/password/password-hasher';

export const hashPassword = (plainPassword: string): Promise<string> => passwordHasher.hash(plainPassword);
