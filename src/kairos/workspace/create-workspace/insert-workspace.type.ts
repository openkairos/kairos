import { Result } from '@/kairos/shared/result/result.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/errors';
import type { Workspace } from '@/kairos/workspace/workspace.type';

export interface WorkspaceToInsert {
  environments: string[];
  name: string;
  slug: string;
}

type InsertWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export type InsertWorkspace = (workspace: WorkspaceToInsert) => Promise<InsertWorkspaceResult>;
