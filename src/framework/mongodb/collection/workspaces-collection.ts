import { mongoDBClient } from '@/framework/mongodb/client/client';
import type { WorkspacesCollection } from '@/framework/mongodb/schema/workspaces-collection-schema';
import { workspacesCollectionName } from '@/framework/mongodb/schema/workspaces-collection-schema';

export const workspacesCollection: WorkspacesCollection = mongoDBClient.db().collection(workspacesCollectionName);
