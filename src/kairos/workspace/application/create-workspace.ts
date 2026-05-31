import { Result } from '@/kairos/shared/result/result.type';
import { type InsertWorkspace, type WorkspaceToInsert } from '@/kairos/workspace/application/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace';

type CreateWorkspaceDependencies = Readonly<{
  saveWorkspace: InsertWorkspace;
}>;

export type CreateWorkspaceCommand = Readonly<WorkspaceToInsert>;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export function createCreateWorkspace({ saveWorkspace }: CreateWorkspaceDependencies) {
  return async function createWorkspace(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> {
    return saveWorkspace(command);
  };
}
