import { type InvalidCredentialsError } from '@/kairos/authentication/domain/errors';
import type { User } from '@/kairos/authentication/domain/user';
import { type Result } from '@/kairos/shared/kernel/result';

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsError>>;
