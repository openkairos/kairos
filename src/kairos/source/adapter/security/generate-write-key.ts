import { randomBytes } from 'node:crypto';

export function generateWriteKey(): string {
  return `kairos_wk_${randomBytes(32).toString('hex')}`;
}
