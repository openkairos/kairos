export type CreateWorkspaceCommand = Readonly<{
  environments?: string[];
  name: string;
  slug: string;
}>;
