import { Result } from '@/kairos/shared/result/result.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { Workspace } from '@/kairos/workspace/domain/workspace';

export interface WorkspaceToInsert {
  environments: string[];
  name: string;
  slug: string;
}

export type InsertWorkspace = (workspace: WorkspaceToInsert) => Promise<Result<Workspace, WorkspaceSlugConflictError>>;
