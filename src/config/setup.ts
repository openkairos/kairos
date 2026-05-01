import { assertIsNonEmptyString } from '@/app/shared/kernel/assert';

const superAdminUsername = process.env.SUPER_ADMIN_USERNAME;
const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

assertIsNonEmptyString(superAdminUsername, 'SUPER_ADMIN_USERNAME is not defined in environment variables');
assertIsNonEmptyString(superAdminEmail, 'SUPER_ADMIN_EMAIL is not defined in environment variables');
assertIsNonEmptyString(superAdminPassword, 'SUPER_ADMIN_PASSWORD is not defined in environment variables');

export const setupConfig = {
  superAdminUsername,
  superAdminEmail,
  superAdminPassword,
};
