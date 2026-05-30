import { type CreateIndexesOptions, type Db, type IndexSpecification } from 'mongodb';

type MongoIndexConfig = Readonly<{
  collectionName: string;
  keys: IndexSpecification;
  options?: CreateIndexesOptions;
}>;

type EnsureMongoIndexesDependencies = Readonly<{
  database: Pick<Db, 'collection'>;
  indexes: readonly MongoIndexConfig[];
}>;

export const createEnsureIndexes =
  ({ database, indexes }: EnsureMongoIndexesDependencies): (() => Promise<void>) =>
  async () => {
    await Promise.all(
      indexes.map(async ({ collectionName, keys, options }) => {
        await database.collection(collectionName).createIndex(keys, options);
      }),
    );
  };
