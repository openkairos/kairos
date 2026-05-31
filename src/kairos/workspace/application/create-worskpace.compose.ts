import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { makeInsertWorkspace } from '@/kairos/workspace/adapter/repository/insert-workspace';
import { makeCreateWorkspace } from '@/kairos/workspace/application/create-workspace';
import type { InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';

const insertWorkspace: InsertWorkspace = makeInsertWorkspace(workspacesCollection);

export const createWorkspace = makeCreateWorkspace(insertWorkspace);
