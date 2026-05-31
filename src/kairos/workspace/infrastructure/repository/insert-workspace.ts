import { isDuplicateError } from '@/framework/mongodb/error/is-duplicate-error';
import { WorkspacesCollection } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { type InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';

export const makeInsertWorkspace =
  (collection: WorkspacesCollection): InsertWorkspace =>
  async ({ environments, name, slug }) => {
    try {
      const inserted = await collection.insertOne({
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
