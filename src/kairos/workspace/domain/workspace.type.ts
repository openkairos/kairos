export type Workspace = Readonly<{
  id: string;
  environments: string[];
  name: string;
  slug: string;
}>;
