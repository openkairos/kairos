import { type Collection, type ObjectId, type OptionalId } from 'mongodb';

export interface WorkspaceCollectionSchema {
  _id: ObjectId;
  name: string;
  slug: string;
}

export type WorkspacesCollection = Collection<OptionalId<WorkspaceCollectionSchema>>;

export const workspacesCollectionName = 'workspaces';
