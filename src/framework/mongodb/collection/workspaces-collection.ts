import { mongoDBClient } from '@/framework/mongodb/client/client';
import {
  WorkspacesCollection,
  workspacesCollectionName,
} from '@/framework/mongodb/schema/workspaces-collection-schema';

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
