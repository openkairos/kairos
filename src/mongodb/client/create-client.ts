import { MongoClient } from 'mongodb';

type CreateMongodbClientDependencies = Readonly<{
  uri: string;
  makeClient?: (uri: string) => MongoClient;
}>;

export function createClient({
  uri,
  makeClient = (connectionUri: string): MongoClient => new MongoClient(connectionUri),
}: CreateMongodbClientDependencies): MongoClient {
  return makeClient(uri);
}
