import { mongoDBClient } from '@/framework/mongodb/client/client';
import { type SourcesCollection, sourcesCollectionName } from '@/framework/mongodb/schema/sources-collection-schema';

export const sourcesCollection: SourcesCollection = mongoDBClient.db().collection(sourcesCollectionName);
