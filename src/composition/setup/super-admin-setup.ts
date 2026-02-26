import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { createCreateSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/exists-super-admin';
import { usersCollection } from '@/composition/shared/persistence/mongodb';
import { hashPassword } from '@/composition/shared/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSuperAdmin = ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
