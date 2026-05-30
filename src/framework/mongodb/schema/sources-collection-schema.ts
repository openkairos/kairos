import { type Collection, type ObjectId, type OptionalId } from 'mongodb';

export interface SourceCollectionSchema {
  _id: ObjectId;
  description?: string;
  environments: string[];
  labels: string[];
  name: string;
  write_key: string;
  workspace_id: ObjectId;
}

export type SourcesCollection = Collection<OptionalId<SourceCollectionSchema>>;

export const sourcesCollectionName = 'sources';
