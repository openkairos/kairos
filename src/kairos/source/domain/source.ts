export interface Source {
  id: string;
  description?: string;
  environments: string[];
  labels: string[];
  name: string;
  workspaceId: string;
}

export type InitializeSourceProps = Readonly<{
  description?: string;
  environments: string[];
  labels: string[];
  name: string;
  workspaceId: string;
  writeKey: string;
}>;

export type InitialSource = Readonly<{
  description?: string;
  environments: string[];
  labels: string[];
  name: string;
  workspaceId: string;
  writeKey: string;
}>;

export const initializeSource = (props: InitializeSourceProps): InitialSource => ({
  description: props.description,
  environments: [...props.environments],
  labels: [...props.labels],
  name: props.name,
  workspaceId: props.workspaceId,
  writeKey: props.writeKey,
});
