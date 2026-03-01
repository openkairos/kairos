import { createSaveWorkspace } from '@/app/shared/infrastructure/persistence/repository/workspace-repository/save-workspace';
import { createWorkspace } from '@/app/workspace/application/create-workspace';
import { createWorkspaceRequestConstraints } from '@/app/workspace/interface/http/create-workspace-request';
import { validateRequest } from '@/composition/shared/http/middleware';
import { workspacesCollection } from '@/composition/shared/persistence/mongodb';

const saveWorkspace = createSaveWorkspace({ workspacesCollection });

export const createWorkspaceHandler = createWorkspace({ saveWorkspace });

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
