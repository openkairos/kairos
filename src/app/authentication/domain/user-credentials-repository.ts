import { type InvalidCredentialsError } from '@/app/authentication/application/errors';
import { type Result } from '@/app/shared/application/util/result';
import type { User } from '@/app/shared/domain/entity';

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsError>>;
