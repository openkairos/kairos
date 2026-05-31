import type { Result } from '@/kairos/shared/result/result.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { InitialWorkspace, Workspace } from '@/kairos/workspace/domain/workspace';

type InsertWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export type InsertWorkspace = (workspace: InitialWorkspace) => Promise<InsertWorkspaceResult>;
