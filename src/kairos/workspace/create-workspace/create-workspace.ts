import { Result } from '@/kairos/shared/result/result.type';
import {
  type InsertWorkspace,
  type WorkspaceToInsert,
} from '@/kairos/workspace/create-workspace/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/errors';
import type { Workspace } from '@/kairos/workspace/workspace.type';

export type CreateWorkspaceCommand = Readonly<WorkspaceToInsert>;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export const makeCreateWorkspace =
  (insertWorkspace: InsertWorkspace) =>
  async (command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> => {
    return insertWorkspace(command);
  };
