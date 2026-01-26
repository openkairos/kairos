import { type User } from '@/shared/domain';

export type UserFinder = (email: string) => Promise<User | undefined>;
