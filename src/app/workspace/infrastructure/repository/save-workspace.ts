import { MongoServerError } from 'mongodb';
import { err, ok } from '@/app/shared/kernel/result';
import { type WorkspacesCollection } from '@/app/shared/persistence/mongodb/workspaces-collection-schema';
import { workspaceSlugConflictError } from '@/app/workspace/domain/errors';
import { type SaveWorkspace } from '@/app/workspace/domain/workspace-repository';

interface SaveWorkspaceDependencies {
  workspacesCollection: WorkspacesCollection;
}

const DUPLICATE_KEY_ERROR_CODE = 11000;

function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}

export function createSaveWorkspace({ workspacesCollection }: SaveWorkspaceDependencies): SaveWorkspace {
  return async ({ name, slug }) => {
    await workspacesCollection.createIndex({ slug: 1 }, { unique: true });

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
