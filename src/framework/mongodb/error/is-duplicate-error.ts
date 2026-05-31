import { DUPLICATE_KEY_ERROR_CODE } from '@/framework/mongodb/error/code';
import { MongoServerError } from 'mongodb';

export function isDuplicateError(error: unknown): boolean {
  return error instanceof MongoServerError && error.code === DUPLICATE_KEY_ERROR_CODE;
}
