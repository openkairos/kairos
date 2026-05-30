import { MongoClient } from 'mongodb';

type CreateMongodbClientDependencies = Readonly<{
  uri: string;
  makeClient?: (uri: string) => MongoClient;
}>;

export function createMongodbClient({
  uri,
  makeClient = (connectionUri: string): MongoClient => new MongoClient(connectionUri),
}: CreateMongodbClientDependencies): MongoClient {
  return makeClient(uri);
}
