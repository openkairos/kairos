import { ensureSystemSetup } from '@/app/system/application/ensure-system-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/app/system/domain/system-setup-repository';
import { createCreateSuperAdmin } from '@/app/system/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/app/system/infrastructure/repository/exists-super-admin';
import { usersCollection } from '@/app/shared/persistence/mongodb';
import { hashPassword } from '@/app/shared/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

export const setupSystem = ensureSystemSetup({
  existsSuperAdmin,
  createSuperAdmin,
  hashPassword,
});
