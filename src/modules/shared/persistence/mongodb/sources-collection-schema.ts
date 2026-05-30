import { type Collection, type ObjectId, type OptionalId } from 'mongodb';

export interface SourceCollectionSchema {
  _id: ObjectId;
  description: string;
  environment: string;
  label: string;
  name: string;
  workspace_id: string;
}

export type SourcesCollection = Collection<OptionalId<SourceCollectionSchema>>;

export const sourcesCollectionName = 'sources';
