import { validateRequest } from '@/kairos/shared/http';

import { workspacesCollection } from '@/framework/mongodb/collection/workspaces-collection';
import { createCreateWorkspace } from '@/kairos/workspace/application/create-workspace';
import { type SaveWorkspace } from '@/kairos/workspace/domain/workspace-repository';
import { createSaveWorkspace } from '@/kairos/workspace/infrastructure/repository/save-workspace';
import { createWorkspaceRequestConstraints } from '@/kairos/workspace/interface/http/create-workspace-request';

const saveWorkspace: SaveWorkspace = createSaveWorkspace({ workspacesCollection });

export const createWorkspace = createCreateWorkspace({ saveWorkspace });

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
