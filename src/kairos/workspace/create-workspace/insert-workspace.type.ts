import type { Result } from '@/kairos/shared/result/result.type';
import type { WorkspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import type { InitialWorkspace } from '@/kairos/workspace/domain/initialize-workspace';
import type { Workspace } from '@/kairos/workspace/domain/workspace.type';

type InsertWorkspaceResult = Result<Workspace, WorkspaceSlugConflictError>;

export type InsertWorkspace = (workspace: InitialWorkspace) => Promise<InsertWorkspaceResult>;
