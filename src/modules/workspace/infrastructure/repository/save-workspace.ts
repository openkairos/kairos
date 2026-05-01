import { MongoServerError } from 'mongodb';
import { err, ok } from '@/modules/shared/kernel/result';
import { type WorkspacesCollection } from '@/modules/shared/persistence/mongodb/workspaces-collection-schema';
import { workspaceSlugConflictError } from '@/modules/workspace/domain/errors';
import { type SaveWorkspace } from '@/modules/workspace/domain/workspace-repository';

type SaveWorkspaceDependencies = Readonly<{
  workspacesCollection: WorkspacesCollection;
}>;

const DUPLICATE_KEY_ERROR_CODE = 11000;

function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}

export function createSaveWorkspace({ workspacesCollection }: SaveWorkspaceDependencies): SaveWorkspace {
  return async ({ name, slug }) => {
    try {
      const inserted = await workspacesCollection.insertOne({ name, slug });

      return ok({
        id: inserted.insertedId.toHexString(),
        name,
        slug,
      });
    } catch (error: unknown) {
      if (isDuplicateError(error)) return err(workspaceSlugConflictError);

      throw error;
    }
  };
}
