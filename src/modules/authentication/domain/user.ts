export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';

export type UserRole = 'ROLE_SUPER_ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export const userMetadata = {
  password: { ignore: true },
  id: { groups: ['auth:login'] },
  username: { groups: ['auth:login'] },
  email: { groups: ['auth:login'] },
  roles: { groups: ['auth:login'] },
};
