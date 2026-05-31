import { Result } from '@/kairos/shared/result/result.type';
import { type InsertWorkspace } from '@/kairos/workspace/create-workspace/insert-workspace.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { initializeWorkspace, type InitializeWorkspaceProps } from '@/kairos/workspace/domain/workspace';
import type { Workspace } from '@/kairos/workspace/domain/workspace';

export type CreateWorkspaceCommand = Readonly<{
  environments?: string[];
  name: string;
  slug: string;
}>;

export type CreateWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

const toInitializeWorkspaceProps = (command: CreateWorkspaceCommand): InitializeWorkspaceProps => ({
  environments: command.environments,
  name: command.name,
  slug: command.slug,
});

export const makeCreateWorkspace =
  (insertWorkspace: InsertWorkspace) =>
  async (command: CreateWorkspaceCommand): Promise<CreateWorkspaceResult> => {
    const workspace = initializeWorkspace(toInitializeWorkspaceProps(command));

    return insertWorkspace(workspace);
  };
