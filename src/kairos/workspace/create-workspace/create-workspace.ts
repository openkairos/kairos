import { Result } from '@/kairos/shared/result/result.type';
import { CreateWorkspaceCommand } from '@/kairos/workspace/create-workspace/create-workspace-command.type';
import { type InsertWorkspace } from '@/kairos/workspace/create-workspace/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace';
import { initializeWorkspace } from '@/kairos/workspace/domain/workspace';

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export const makeCreateWorkspace =
  (insertWorkspace: InsertWorkspace) =>
  async (command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> => {
    const workspace = initializeWorkspace(command);

    return insertWorkspace(workspace);
  };
