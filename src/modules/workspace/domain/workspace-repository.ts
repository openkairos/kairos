import type { Result } from '@/modules/shared/kernel/result';
import type { WorkspaceSlugConflictError } from '@/modules/workspace/domain/errors';
import type { Workspace } from '@/modules/workspace/domain/workspace';

export interface NewWorkspace {
  name: string;
  slug: string;
}

export type SaveWorkspace = (workspace: NewWorkspace) => Promise<Result<Workspace, WorkspaceSlugConflictError>>;
