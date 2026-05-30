import { err, ok } from '@/kairos/shared/kernel/result';
import { type WorkspacesCollection } from '@/kairos/shared/persistence/mongodb/workspaces-collection-schema';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { type SaveWorkspace } from '@/kairos/workspace/domain/workspace-repository';
import { MongoServerError } from 'mongodb';

type SaveWorkspaceDependencies = Readonly<{
  workspacesCollection: WorkspacesCollection;
}>;

const DUPLICATE_KEY_ERROR_CODE = 11000;

function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}

export function createSaveWorkspace({ workspacesCollection }: SaveWorkspaceDependencies): SaveWorkspace {
  return async ({ environments, name, slug }) => {
    try {
      const inserted = await workspacesCollection.insertOne({
        environments,
        name,
        slug,
      });

      return ok({
        id: inserted.insertedId.toHexString(),
        environments,
        name,
        slug,
      });
    } catch (error: unknown) {
      if (isDuplicateError(error)) return err(workspaceSlugConflictError);

      throw error;
    }
  };
}
