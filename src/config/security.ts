import { assertIsNonEmptyString } from '@/app/shared/kernel/assert';

const appKey = process.env.APP_KEY;
assertIsNonEmptyString(appKey, 'APP_KEY is not defined in environment variables');

export const securityConfig = {
  appKey,
  accessToken: {
    ttl: 3600,
    algorithm: 'HS256',
    issuer: 'kairos',
  },
};
