import type { Collection, ObjectId, OptionalId } from 'mongodb';

export interface WorkspaceCollectionSchema {
  _id: ObjectId;
  environments?: string[];
  name: string;
  slug: string;
}

export type WorkspacesCollection = Collection<OptionalId<WorkspaceCollectionSchema>>;

export const workspacesCollectionName = 'workspaces';
