import { passwordHasher } from '@/app/shared/infrastructure/security/password/password-hasher';
import { createVerifyPassword } from '@/app/shared/infrastructure/security/password/verify-password';

export const hashPassword = (plainPassword: string): Promise<string> => passwordHasher.hash(plainPassword);

export const verifyPassword = createVerifyPassword({ hasher: passwordHasher });
