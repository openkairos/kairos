import { type ResultHttpMapping } from '@/interface/http/result-to-http';
import { HTTP_CONFLICT, HTTP_CREATED } from '@/interface/http/status-code';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace.type';

export const createWorkspaceResponse: ResultHttpMapping<Workspace, WorkspaceSlugConflictError> = {
  success: {
    status: HTTP_CREATED,
  },
  error: {
    byType: {
      WORKSPACE_SLUG_CONFLICT: {
        status: HTTP_CONFLICT,
      },
    },
  },
};
