import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { makeCreateWorkspace } from '@/kairos/workspace/application/create-workspace';
import type { InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { makeInsertWorkspace } from '@/kairos/workspace/infrastructure/repository/insert-workspace';

const insertWorkspace: InsertWorkspace = makeInsertWorkspace({ workspacesCollection });

export const createWorkspace = makeCreateWorkspace(insertWorkspace);
