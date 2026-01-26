import { type User } from '@/shared/domain';

/**
 * Finds user by email.
 * @throws{import('@/authentication/application/errors').InvalidCredentialsError}
 */
export type UserFinder = (email: string) => Promise<User>;
