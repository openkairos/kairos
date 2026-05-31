import type { Workspace } from '@/kairos/workspace/domain/workspace.type';

export type InitialWorkspace = Readonly<Omit<Workspace, 'id'>>;

type InitializeWorkspaceProps = Readonly<
  Omit<InitialWorkspace, 'environments'> & {
    environments?: string[];
  }
>;

const DEFAULT_ENVIRONMENTS = ['default'] as const;
const environmentsFrom = (props: InitializeWorkspaceProps): string[] =>
  props.environments === undefined || props.environments.length === 0
    ? [...DEFAULT_ENVIRONMENTS]
    : [...props.environments];

export const initializeWorkspace = (props: InitializeWorkspaceProps): InitialWorkspace => ({
  environments: environmentsFrom(props),
  name: props.name,
  slug: props.slug,
});
