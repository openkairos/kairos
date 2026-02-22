import { type InvalidCredentialsError } from '@/app/authentication/domain/errors';
import type { User } from '@/app/authentication/domain/user';
import { type Result } from '@/app/shared/application/util/result';

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsError>>;
