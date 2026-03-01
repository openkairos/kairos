import { type ResultHttpMapping } from '@/app/shared/infrastructure/http/result-to-http';
import { HTTP_CONFLICT, HTTP_CREATED } from '@/app/shared/interface/http/status-code';
import type { WorkspaceSlugConflictError } from '@/app/workspace/domain/errors';
import type { Workspace } from '@/app/workspace/domain/workspace';

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
