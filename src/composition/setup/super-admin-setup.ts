import { ensureSuperAdminSetup } from '@/app/setup/application/ensure-super-admin-setup';
import { createCreateSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/shared/infrastructure/persistence/repository/user-repository/exists-super-admin';
import { usersCollection } from '@/composition/persistence/mongodb';
import { hashPassword } from '@/composition/security/password';

const existsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSuperAdmin = ensureSuperAdminSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
