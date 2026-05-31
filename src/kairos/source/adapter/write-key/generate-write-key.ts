import { randomBytes } from 'node:crypto';

export const generateWriteKey = (): string => randomBytes(32).toString('base64url');
