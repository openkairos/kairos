export type Source = Readonly<{
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  appIdentifier: string;
  writeKeyHash: string;
}>;
