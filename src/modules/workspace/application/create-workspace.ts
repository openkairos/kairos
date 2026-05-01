import type { Result } from '@/modules/shared/kernel/result';
import type { WorkspaceSlugConflictError } from '@/modules/workspace/domain/errors';
import type { Workspace } from '@/modules/workspace/domain/workspace';
import { type NewWorkspace, type SaveWorkspace } from '@/modules/workspace/domain/workspace-repository';

interface CreateWorkspaceDependencies {
  saveWorkspace: SaveWorkspace;
}

export type CreateWorkspaceCommand = NewWorkspace;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export function createCreateWorkspace({ saveWorkspace }: CreateWorkspaceDependencies) {
  return async function createWorkspace(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> {
    return saveWorkspace(command);
  };
}
