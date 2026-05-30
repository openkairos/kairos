import { mongoDBClient } from '@/kairos/shared/infrastructure/mongodb/client/client';
import {
  WorkspacesCollection,
  workspacesCollectionName,
} from '@/kairos/shared/infrastructure/mongodb/schema/workspaces-collection-schema';

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
