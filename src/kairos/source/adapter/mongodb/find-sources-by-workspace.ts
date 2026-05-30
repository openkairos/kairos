import type {
  SourceCollectionSchema,
  SourcesCollection,
} from '@/framework/mongodb/schema/sources-collection-schema';
import type { FindSourcesByWorkspace } from '@/kairos/source/find-sources-by-workspace/find-sources-by-workspace.type';
import type { Source } from '@/kairos/source/domain/source';
import { ObjectId } from 'mongodb';

const toSource = (document: SourceCollectionSchema): Source => ({
  id: document._id.toHexString(),
  description: document.description,
  environments: document.environments,
  labels: document.labels,
  name: document.name,
  workspaceId: document.workspace_id.toHexString(),
});

export const findSourcesByWorkspaceInMongoDB =
  (collection: SourcesCollection): FindSourcesByWorkspace =>
  async workspaceId => {
    const sources = await collection.find({ workspace_id: new ObjectId(workspaceId) }).toArray();

    return sources.map(toSource);
  };
