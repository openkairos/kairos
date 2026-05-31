import { DUPLICATE_KEY_ERROR_CODE } from '@/framework/mongodb/error-code';
import { type WorkspacesCollection } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { type InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';
import { MongoServerError } from 'mongodb';

type SaveWorkspaceDependencies = Readonly<{
  workspacesCollection: WorkspacesCollection;
}>;

function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}

export function createSaveWorkspace({ workspacesCollection }: SaveWorkspaceDependencies): InsertWorkspace {
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
