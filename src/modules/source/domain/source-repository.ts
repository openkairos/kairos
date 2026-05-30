import type { Result } from '@/modules/shared/kernel/result';
import type { WorkspaceContext } from '@/modules/shared/control-plane';
import type { SourceNameEnvironmentConflictError } from '@/modules/source/domain/errors';
import type { NewSource, Source } from '@/modules/source/domain/source';

export type SaveSource = (
  workspaceContext: WorkspaceContext,
  source: NewSource,
) => Promise<Result<Source, SourceNameEnvironmentConflictError>>;

export type FindSourcesByWorkspace = (workspaceContext: WorkspaceContext) => Promise<Source[]>;
