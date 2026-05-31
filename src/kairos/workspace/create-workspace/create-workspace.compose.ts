import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { makeInsertWorkspace } from '@/kairos/workspace/adapter/mongodb/insert-workspace';
import { makeCreateWorkspace } from '@/kairos/workspace/create-workspace/create-workspace';
import type { InsertWorkspace } from '@/kairos/workspace/create-workspace/insert-workspace.type';

const insertWorkspace: InsertWorkspace = makeInsertWorkspace(workspacesCollection);

export const createWorkspace = makeCreateWorkspace(insertWorkspace);
