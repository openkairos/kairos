import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { createCreateSuperAdmin } from '@/app/setup/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/setup/infrastructure/repository/exists-super-admin';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { hashPassword } from '@/app/shared/infrastructure/security/password';
import { createCreateUser } from '@/app/user/infrastructure/repository/create-user';
import { createExistsUserByRole } from '@/app/user/infrastructure/repository/exists-user-by-role';

const existsUserByRole = createExistsUserByRole({ usersCollection });
const createUser = createCreateUser({ usersCollection });

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ existsUserByRole });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ createUser });

export const setupSuperAdmin = ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
