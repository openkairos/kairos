import type { Result } from '@/app/shared/kernel/result';
import type { WorkspaceSlugConflictError } from '@/app/workspace/domain/errors';
import type { Workspace } from '@/app/workspace/domain/workspace';

export interface NewWorkspace {
  name: string;
  slug: string;
}

export type SaveWorkspace = (workspace: NewWorkspace) => Promise<Result<Workspace, WorkspaceSlugConflictError>>;
