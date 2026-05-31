import type { InvalidCredentialsError } from '@/kairos/authentication/domain/errors';
import type { User } from '@/kairos/authentication/domain/user';

import type { Result } from '@/kairos/shared/result/result.type';

export type FindOneByEmail = (email: string) => Promise<Result<User, InvalidCredentialsError>>;
