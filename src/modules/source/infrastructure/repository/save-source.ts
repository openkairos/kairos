import { MongoServerError } from 'mongodb';
import { err, ok } from '@/modules/shared/kernel/result';
import type { SourcesCollection } from '@/modules/shared/persistence/mongodb/sources-collection-schema';
import { sourceNameEnvironmentConflictError } from '@/modules/source/domain/errors';
import type { SaveSource } from '@/modules/source/domain/source-repository';

type SaveSourceDependencies = Readonly<{
  sourcesCollection: SourcesCollection;
}>;

const DUPLICATE_KEY_ERROR_CODE = 11000;

function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}

export function createSaveSource({ sourcesCollection }: SaveSourceDependencies): SaveSource {
  return async ({ workspaceId }, { description, environment, label, name }) => {
    try {
      const inserted = await sourcesCollection.insertOne({
        description,
        environment,
        label,
        name,
        workspace_id: workspaceId,
      });

      return ok({
        id: inserted.insertedId.toHexString(),
        description,
        environment,
        label,
        name,
        workspaceId,
      });
    } catch (error: unknown) {
      if (isDuplicateError(error)) return err(sourceNameEnvironmentConflictError);

      throw error;
    }
  };
}
