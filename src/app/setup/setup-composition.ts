import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/setup/domain/super-admin-setup-repository';
import { createCreateSuperAdmin } from '@/app/setup/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/setup/infrastructure/repository/exists-super-admin';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { hashPassword } from '@/app/shared/infrastructure/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSuperAdmin = ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
