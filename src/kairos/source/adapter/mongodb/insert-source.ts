import { isDuplicateError } from '@/framework/mongodb/error/is-duplicate-error';
import type { SourcesCollection } from '@/framework/mongodb/schema/sources-collection-schema';
import { err } from '@/kairos/shared/result/err';
import { ok } from '@/kairos/shared/result/ok';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';
import { sourceAppIdentifierConflictError } from '@/kairos/source/domain/errors';
import { ObjectId } from 'mongodb';

export const makeInsertSource =
  (collection: SourcesCollection): InsertSource =>
  async ({ workspaceId, name, description, appIdentifier, writeKeyHash }) => {
    try {
      const document = {
        workspace_id: new ObjectId(workspaceId),
        name,
        app_identifier: appIdentifier,
        write_key_hash: writeKeyHash,
        description,
      };
      const inserted = await collection.insertOne(document);

      return ok({
        id: inserted.insertedId.toHexString(),
        workspaceId,
        name,
        description,
        appIdentifier,
        writeKeyHash,
      });
    } catch (error: unknown) {
      if (isDuplicateError(error)) return err(sourceAppIdentifierConflictError);

      throw error;
    }
  };
