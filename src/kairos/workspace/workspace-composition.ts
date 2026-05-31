import { validateRequest } from '@/framework/http/validator';
import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { createCreateWorkspace } from '@/kairos/workspace/application/create-workspace';
import { type InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { makeInsertWorkspace } from '@/kairos/workspace/infrastructure/repository/insert-workspace';
import { createWorkspaceRequestConstraints } from '@/kairos/workspace/interface/http/create-workspace-request';

const insertWorkspace: InsertWorkspace = makeInsertWorkspace({ workspacesCollection });

export const createWorkspace = createCreateWorkspace({ insertWorkspace });

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
