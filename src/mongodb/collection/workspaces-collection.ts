import { mongoDBClient } from '@/mongodb/client/client';
import { WorkspacesCollection, workspacesCollectionName } from '@/mongodb/schema/workspaces-collection-schema';

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
