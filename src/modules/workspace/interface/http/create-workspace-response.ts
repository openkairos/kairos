import { type ResultHttpMapping } from '@/modules/shared/http/result-to-http';
import { HTTP_CONFLICT, HTTP_CREATED } from '@/modules/shared/http/status-code';
import type { WorkspaceSlugConflictError } from '@/modules/workspace/domain/errors';
import type { Workspace } from '@/modules/workspace/domain/workspace';

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
