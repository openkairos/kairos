import { type InvalidCredentialsException } from '@/app/authentication/application/errors';
import { type Result } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

/**
 * Finds user by email.
 * @throws{import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export type FindOneByEmailOrFail = (email: string) => Promise<User>;

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsException>>;
