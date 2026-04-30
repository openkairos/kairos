import type { User } from '@/app/user/domain/user';

export interface SuperAdminCredentials {
  username: string;
  email: string;
  password: string;
}

export type ExistsSuperAdmin = () => Promise<boolean>;

export type CreateSuperAdmin = (credentials: SuperAdminCredentials) => Promise<User>;
