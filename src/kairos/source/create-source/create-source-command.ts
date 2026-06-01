import type { InitializeSourceProps } from '@/kairos/source/domain/initialize-source';

export type CreateSourceCommand = Readonly<{
  workspaceId: string;
  name: string;
  description?: string;
  appIdentifier: string;
}>;

export const toInitializeSourceProps = (command: CreateSourceCommand, writeKeyHash: string): InitializeSourceProps => ({
  workspaceId: command.workspaceId,
  name: command.name,
  description: command.description,
  appIdentifier: command.appIdentifier,
  writeKeyHash,
});
