export interface Workspace {
  id: string;
  environments: string[];
  name: string;
  slug: string;
}

export type InitializeWorkspaceProps = Readonly<{
  environments?: string[];
  name: string;
  slug: string;
}>;

export type InitialWorkspace = Readonly<{
  environments: string[];
  name: string;
  slug: string;
}>;

const DEFAULT_ENVIRONMENTS = ['default'];

const environmentsFrom = ({ environments }: InitializeWorkspaceProps): string[] =>
  environments === undefined || environments.length === 0 ? DEFAULT_ENVIRONMENTS : environments;

export const initializeWorkspace = (props: InitializeWorkspaceProps): InitialWorkspace => ({
  environments: environmentsFrom(props),
  name: props.name,
  slug: props.slug,
});
