import { mongoDBClient } from '@/framework/mongodb/client/client';
import type { SourcesCollection } from '@/framework/mongodb/schema/sources-collection-schema';
import { sourcesCollectionName } from '@/framework/mongodb/schema/sources-collection-schema';

export const sourcesCollection: SourcesCollection = mongoDBClient.db().collection(sourcesCollectionName);
