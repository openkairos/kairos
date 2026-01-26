import { type User } from '@/shared/domain';

export type JwtSigner = (user: User) => Promise<string>;
