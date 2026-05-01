import { ensureSystemSetup } from '@/modules/system/application/ensure-system-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/modules/system/domain/system-setup-repository';
import { createCreateSuperAdmin } from '@/modules/system/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/modules/system/infrastructure/repository/exists-super-admin';
import { usersCollection } from '@/modules/shared/persistence/mongodb';
import { hashPassword } from '@/modules/shared/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSystem = ensureSystemSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
