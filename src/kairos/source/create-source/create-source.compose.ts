import { sourcesCollection } from '@/framework/mongodb/collection/sources-collection';
import { insertSourceIntoMongoDB } from '@/kairos/source/adapter/mongodb/insert-source';
import { generateWriteKey } from '@/kairos/source/adapter/security/generate-write-key';
import { makeCreateSource } from '@/kairos/source/create-source/create-source';
import type { InsertSource } from '@/kairos/source/create-source/insert-source.type';

const insertSource: InsertSource = insertSourceIntoMongoDB(sourcesCollection);

export const createSource = makeCreateSource({ generateWriteKey, insertSource });
