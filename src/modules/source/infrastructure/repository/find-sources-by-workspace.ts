import type {
  SourceCollectionSchema,
  SourcesCollection,
} from '@/modules/shared/persistence/mongodb/sources-collection-schema';
import type { FindSourcesByWorkspace } from '@/modules/source/domain/source-repository';
import type { Source } from '@/modules/source/domain/source';

type FindSourcesByWorkspaceDependencies = Readonly<{
  sourcesCollection: SourcesCollection;
}>;

function toSource(document: SourceCollectionSchema): Source {
  return {
    id: document._id.toHexString(),
    description: document.description,
    environment: document.environment,
    label: document.label,
    name: document.name,
    workspaceId: document.workspace_id,
  };
}

export function createFindSourcesByWorkspace({
  sourcesCollection,
}: FindSourcesByWorkspaceDependencies): FindSourcesByWorkspace {
  return async ({ workspaceId }) => {
    const sources = await sourcesCollection.find({ workspace_id: workspaceId }).toArray();

    return sources.map(toSource);
  };
}
