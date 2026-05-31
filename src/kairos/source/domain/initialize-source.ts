import type { Source } from '@/kairos/source/domain/source.type';

export type InitialSource = Readonly<Omit<Source, 'id'>>;

export type InitializeSourceProps = Readonly<{
  workspaceId: string;
  name: string;
  description?: string;
  appIdentifier: string;
  writeKeyHash: string;
}>;

export const initializeSource = (props: InitializeSourceProps): InitialSource => ({
  workspaceId: props.workspaceId,
  name: props.name,
  description: props.description ?? null,
  appIdentifier: props.appIdentifier,
  writeKeyHash: props.writeKeyHash,
});
