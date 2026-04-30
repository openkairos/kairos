import { type User, type UserRole } from '@/app/user/domain/user';

export interface CreateUserCommand {
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export type FindUserByEmail = (email: string) => Promise<User | null>;

export type CreateUser = (command: CreateUserCommand) => Promise<User>;

export type ExistsUserByRole = (role: UserRole) => Promise<boolean>;
