import { assertIsNonEmptyString } from '@/app/shared/application/assert';

const connectionString = process.env.MONGODB_CONNECTION_STRING;
assertIsNonEmptyString(connectionString, 'MONGODB_CONNECTION_STRING is not defined in environment variables');

export const mongodbConfig = {
  connectionString,
};
