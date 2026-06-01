import { hashPassword } from '@/framework/security/password';
import { sourcesCollection } from '@/framework/mongodb/collection/sources-collection';
import { makeInsertSource } from '@/kairos/source/adapter/mongodb/insert-source';
import { generateWriteKey } from '@/kairos/source/adapter/write-key/generate-write-key';
import { makeCreateSource } from '@/kairos/source/create-source/create-source';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';

const insertSource: InsertSource = makeInsertSource(sourcesCollection);

export const createSource = makeCreateSource({
  insertSource,
  generateWriteKey,
  hashWriteKey: hashPassword,
});
