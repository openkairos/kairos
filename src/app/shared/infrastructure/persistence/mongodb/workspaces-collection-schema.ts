import { type Collection, type ObjectId, type OptionalId } from 'mongodb';
import type { Workspace } from '@/app/workspace/domain/workspace';

export interface WorkspaceCollectionSchema extends Omit<Workspace, 'id'> {
  _id: ObjectId;
}

export type WorkspacesCollection = Collection<OptionalId<WorkspaceCollectionSchema>>;

export const workspacesCollectionName = 'workspaces';
