import { loadEnvConfig } from '@koala-ts/framework';

loadEnvConfig(process.env.NODE_ENV ?? 'development');
