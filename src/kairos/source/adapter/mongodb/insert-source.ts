import { ObjectId } from 'mongodb';
import { isDuplicateError } from '@/framework/mongodb/error/is-duplicate-error';
import type { SourcesCollection } from '@/framework/mongodb/schema/sources-collection-schema';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import { sourceNameConflictError } from '@/kairos/source/domain/errors';

export const insertSourceIntoMongoDB =
  (collection: SourcesCollection): InsertSource =>
  async ({ description, environments, labels, name, workspaceId, writeKey }) => {
    try {
      const inserted = await collection.insertOne({
        description,
        environments,
        labels,
        name,
        write_key: writeKey,
        workspace_id: new ObjectId(workspaceId),
      });

      return ok({
        id: inserted.insertedId.toHexString(),
        description,
        environments,
        labels,
        name,
        workspaceId,
      });
    } catch (error: unknown) {
      if (isDuplicateError(error)) return err(sourceNameConflictError);

      throw error;
    }
  };
