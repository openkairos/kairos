import { isDuplicateError } from '@/framework/mongodb/error/is-duplicate-error';
import { type WorkspacesCollection } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import { type InsertWorkspace } from '@/kairos/workspace/application/insert-workspace.type';
import { workspaceSlugConflictError } from '@/kairos/workspace/domain/errors';

type Dependencies = Readonly<{
  workspacesCollection: WorkspacesCollection;
}>;

export function makeInsertWorkspace({ workspacesCollection }: Dependencies): InsertWorkspace {
  return async function insertWorkspace({ environments, name, slug }) {
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
