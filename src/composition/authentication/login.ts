import { createSecretKey, randomUUID } from 'node:crypto';
import { login } from '@/app/authentication/application/login';
import { systemClock } from '@/app/shared/application/clock';
import { findOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository';
import { createGenerateAccessToken } from '@/app/shared/infrastructure/security/generate-access-token';
import { createJwtAccessTokenSigner } from '@/app/shared/infrastructure/security/jwt-access-token-signer';
import { verifyPassword } from '@/app/shared/infrastructure/security/verify-password';
import { securityConfig } from '@/config/security';

const signingKey = createSecretKey(Buffer.from(securityConfig.appKey.replace('base64:', ''), 'base64'));

const signAccessToken = createJwtAccessTokenSigner({
  key: signingKey,
  accessTokenConfig: securityConfig.accessToken,
  clock: systemClock,
  newJti: randomUUID,
});

const generateAccessToken = createGenerateAccessToken({
  accessTokenConfig: securityConfig.accessToken,
  sign: signAccessToken,
});

export const loginUser = login({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});
