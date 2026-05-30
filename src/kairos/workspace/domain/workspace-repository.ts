import { Result } from '@/kairos/shared/result/result.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace';

export interface NewWorkspace {
  environments: string[];
  name: string;
  slug: string;
}

export type SaveWorkspace = (workspace: NewWorkspace) => Promise<Result<Workspace, WorkspaceSlugConflictError>>;
