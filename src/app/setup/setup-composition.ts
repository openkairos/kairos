import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { createCreateSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/exists-super-admin';
import { hashPassword } from '@/app/shared/infrastructure/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSuperAdmin = ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
