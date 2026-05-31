import { validateRequest } from '@/framework/http/validator';
import { createWorkspaceRequestConstraints } from '@/kairos/workspace/interface/http/create-workspace-request';

export const validateCreateWorkspaceRequest = validateRequest(createWorkspaceRequestConstraints);
