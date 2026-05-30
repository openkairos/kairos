import { mongoDBClient } from '@/kairos/shared/persistence/mongodb/mongodb-composition';
import {
  WorkspacesCollection,
  workspacesCollectionName,
} from '@/kairos/shared/persistence/mongodb/workspaces-collection-schema';

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
