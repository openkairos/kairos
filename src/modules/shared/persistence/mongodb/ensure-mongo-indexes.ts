import { type CreateIndexesOptions, type Db, type IndexSpecification } from 'mongodb';
import { type RuntimeInfrastructureTask } from '@/modules/setup/infrastructure/ensure-runtime-infrastructure';

type MongoIndexConfig = Readonly<{
  collectionName: string;
  keys: IndexSpecification;
  options?: CreateIndexesOptions;
}>;

type EnsureMongoIndexesDependencies = Readonly<{
  database: Pick<Db, 'collection'>;
  indexes: readonly MongoIndexConfig[];
}>;

export function ensureMongoIndexes({ database, indexes }: EnsureMongoIndexesDependencies): RuntimeInfrastructureTask {
  return async () => {
    await Promise.all(
      indexes.map(async ({ collectionName, keys, options }) => {
        await database.collection(collectionName).createIndex(keys, options);
      }),
    );
  };
}
