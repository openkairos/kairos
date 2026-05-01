import { workspacesCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { validateRequest } from '@/app/shared/interface/http';
import { createCreateWorkspace } from '@/app/workspace/application/create-workspace';
import { type SaveWorkspace } from '@/app/workspace/domain/workspace-repository';
import { createSaveWorkspace } from '@/app/workspace/infrastructure/repository/save-workspace';
import { createWorkspaceRequestConstraints } from '@/app/workspace/interface/http/create-workspace-request';

const saveWorkspace: SaveWorkspace = createSaveWorkspace({ workspacesCollection });

export const createWorkspace = createCreateWorkspace({ saveWorkspace });

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
