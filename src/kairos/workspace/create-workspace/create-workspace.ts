import { Result } from '@/kairos/shared/result/result.type';
import { type InsertWorkspace } from '@/kairos/workspace/create-workspace/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { initializeWorkspace, type InitializeWorkspaceProps } from '@/kairos/workspace/domain/workspace';
import type { Workspace } from '@/kairos/workspace/domain/workspace';

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export const makeCreateWorkspace =
  (insertWorkspace: InsertWorkspace) =>
  async (props: InitializeWorkspaceProps): Promise<CreateWorkspaceResult> => {
    const workspace = initializeWorkspace(props);

    return insertWorkspace(workspace);
  };
