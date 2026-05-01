import { workspacesCollection } from '@/modules/shared/persistence/mongodb';
import { validateRequest } from '@/modules/shared/http';
import { createCreateWorkspace } from '@/modules/workspace/application/create-workspace';
import { type SaveWorkspace } from '@/modules/workspace/domain/workspace-repository';
import { createSaveWorkspace } from '@/modules/workspace/infrastructure/repository/save-workspace';
import { createWorkspaceRequestConstraints } from '@/modules/workspace/interface/http/create-workspace-request';

const saveWorkspace: SaveWorkspace = createSaveWorkspace({ workspacesCollection });

export const createWorkspace = createCreateWorkspace({ saveWorkspace });

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
