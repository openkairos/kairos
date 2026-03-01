import type { Result } from '@/app/shared/application/result';
import type { WorkspaceSlugConflictError } from '@/app/workspace/domain/errors';
import type { Workspace } from '@/app/workspace/domain/workspace';
import { type NewWorkspace, type SaveWorkspace } from '@/app/workspace/domain/workspace-repository';

interface CreateWorkspaceDependencies {
  saveWorkspace: SaveWorkspace;
}

export type CreateWorkspaceCommand = NewWorkspace;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export function createWorkspace({ saveWorkspace }: CreateWorkspaceDependencies) {
  return async function execute(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> {
    return saveWorkspace(command);
  };
}
