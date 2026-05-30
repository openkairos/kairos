export interface Source {
  id: string;
  description: string;
  environment: string;
  label: string;
  name: string;
  workspaceId: string;
}

export type NewSource = Omit<Source, 'id' | 'workspaceId'>;
