import { type User } from '@/shared/domain/entity/User';

export type JwtSigner = (user: User) => Promise<string>;
