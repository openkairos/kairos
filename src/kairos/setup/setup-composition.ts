import { mongodbConfig } from '@/config/mongodb';
import { setupConfig } from '@/config/setup';
import { createEnsureSuperAdminTask } from '@/kairos/setup/application/ensure-super-admin';
import { runSetup, type SetupTask } from '@/kairos/setup/application/run-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/kairos/setup/domain/super-admin-repository';
import {
  createEnsureRuntimeInfrastructure,
  type RuntimeInfrastructureTask,
} from '@/kairos/setup/infrastructure/ensure-runtime-infrastructure';
import { createCreateSuperAdmin } from '@/kairos/setup/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/kairos/setup/infrastructure/repository/exists-super-admin';
import { ensureMongoIndexes } from '@/kairos/shared/persistence/mongodb/ensure-mongo-indexes';
import { mongoDBClient, usersCollection } from '@/kairos/shared/persistence/mongodb/mongodb-composition';
import { hashPassword } from '@/kairos/shared/security/password';

const existsSuperAdmin: ExistsSuperAdmin = createExistsSuperAdmin({ usersCollection });
const createSuperAdmin: CreateSuperAdmin = createCreateSuperAdmin({ usersCollection });

const createSuperAdminSetupTask = createEnsureSuperAdminTask({ existsSuperAdmin, createSuperAdmin, hashPassword });

function createRuntimeInfrastructureTasks(): RuntimeInfrastructureTask[] {
  return [
    mongoDBClient.connect.bind(mongoDBClient),
    ensureMongoIndexes({ database: mongoDBClient.db(), indexes: mongodbConfig.indexes }),
  ];
}

export const ensureSuperAdminExists: SetupTask = createSuperAdminSetupTask({
  username: setupConfig.superAdminUsername,
  email: setupConfig.superAdminEmail,
  password: setupConfig.superAdminPassword,
});

function createSetupTasks(): SetupTask[] {
  return [ensureSuperAdminExists];
}

export const ensureRuntimeInfrastructure = createEnsureRuntimeInfrastructure(createRuntimeInfrastructureTasks());

export const executeSetup = runSetup(createSetupTasks());
