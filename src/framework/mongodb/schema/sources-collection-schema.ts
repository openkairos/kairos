import type { Collection, ObjectId, OptionalId } from 'mongodb';

export interface SourceCollectionSchema {
  _id: ObjectId;
  workspace_id: ObjectId;
  name: string;
  description: string | null;
  app_identifier: string;
  write_key_hash: string;
}

export type SourcesCollection = Collection<OptionalId<SourceCollectionSchema>>;

export const sourcesCollectionName = 'sources';
