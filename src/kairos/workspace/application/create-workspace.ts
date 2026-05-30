import type { Result } from '@/kairos/shared/kernel/result';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace';
import { type NewWorkspace, type SaveWorkspace } from '@/kairos/workspace/domain/workspace-repository';

type CreateWorkspaceDependencies = Readonly<{
  saveWorkspace: SaveWorkspace;
}>;

export type CreateWorkspaceCommand = Readonly<NewWorkspace>;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export function createCreateWorkspace({ saveWorkspace }: CreateWorkspaceDependencies) {
  return async function createWorkspace(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> {
    return saveWorkspace(command);
  };
}
