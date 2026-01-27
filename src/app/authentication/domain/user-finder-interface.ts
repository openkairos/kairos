import { type User } from '@/app/shared/domain/entity';

/**
 * Finds user by email.
 * @throws{import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export type UserFinder = (email: string) => Promise<User>;
