import { type InvalidCredentialsError } from '@/modules/authentication/domain/errors';
import type { User } from '@/modules/authentication/domain/user';
import { type Result } from '@/modules/shared/kernel/result';

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsError>>;
