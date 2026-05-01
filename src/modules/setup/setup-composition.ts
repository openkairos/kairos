import { mongodbConfig } from '@/config/mongodb';
import { setupConfig } from '@/config/setup';
import { createEnsureSuperAdminTask } from '@/modules/setup/application/ensure-super-admin';
import { runSetup, type SetupTask } from '@/modules/setup/application/run-setup';
import { type CreateSuperAdmin, type ExistsSuperAdmin } from '@/modules/setup/domain/super-admin-repository';
import {
  createEnsureRuntimeInfrastructure,
  type RuntimeInfrastructureTask,
} from '@/modules/setup/infrastructure/ensure-runtime-infrastructure';
import { createCreateSuperAdmin } from '@/modules/setup/infrastructure/repository/create-super-admin';
import { createExistsSuperAdmin } from '@/modules/setup/infrastructure/repository/exists-super-admin';
import { ensureMongoIndexes, mongoDBClient, usersCollection } from '@/modules/shared/persistence/mongodb';
import { hashPassword } from '@/modules/shared/security/password';

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
