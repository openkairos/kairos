import type { Source } from '@/kairos/source/domain/source';

export type FindSourcesByWorkspace = (workspaceId: string) => Promise<Source[]>;
