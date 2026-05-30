export type CreateSourceCommand = Readonly<{
  description?: string;
  environments: string[];
  labels: string[];
  name: string;
  workspaceId: string;
}>;
