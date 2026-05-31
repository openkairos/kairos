import { Result } from '@/kairos/shared/result/result.type';
import {
  type InsertWorkspace,
  type WorkspaceToInsert,
} from '@/kairos/workspace/create-workspace/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/errors';
import type { Workspace } from '@/kairos/workspace/workspace.type';

export type CreateWorkspaceCommand = Readonly<{
  environments?: string[];
  name: string;
  slug: string;
}>;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

const DEFAULT_ENVIRONMENTS = ['default'];

const hasEnvironments = (command: CreateWorkspaceCommand): boolean =>
  command.environments !== undefined && command.environments.length > 0;

const toWorkspaceToInsert = (command: CreateWorkspaceCommand): WorkspaceToInsert => ({
  environments: hasEnvironments(command) ? command.environments! : DEFAULT_ENVIRONMENTS,
  name: command.name,
  slug: command.slug,
});

export const makeCreateWorkspace =
  (insertWorkspace: InsertWorkspace) =>
  async (command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> => {
    const workspace: WorkspaceToInsert = toWorkspaceToInsert(command);
    return insertWorkspace(workspace);
  };
