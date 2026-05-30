import { securityConfig } from '@/config/security';
import { createLogin, type GenerateAccessToken } from '@/kairos/authentication/application/login';
import { type FindOneByEmail } from '@/kairos/authentication/domain/user-credentials-repository';
import { createFindOneByEmail } from '@/kairos/authentication/infrastructure/repository/find-one-by-email';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/kairos/authentication/infrastructure/security/access-token';
import { createVerifyPassword } from '@/kairos/authentication/infrastructure/security/password/verify-password';
import { loginRequestConstraints } from '@/kairos/authentication/interface/http/login-request';
import { systemClock } from '@/kairos/shared/clock';
import { validateRequest } from '@/kairos/shared/http';

import { usersCollection } from '@/kairos/shared/infrastructure/mongodb/collection/users-collection';
import { passwordHasher } from '@/kairos/shared/security/password';
import { createSecretKey, randomUUID } from 'node:crypto';

const signingKey = createSecretKey(Buffer.from(securityConfig.appKey.replace('base64:', ''), 'base64'));

const signAccessToken: SignAccessToken = createJwtAccessTokenSigner({
  key: signingKey,
  accessTokenConfig: securityConfig.accessToken,
  clock: systemClock,
  newJti: randomUUID,
});

const generateAccessToken: GenerateAccessToken = createGenerateAccessToken({
  accessTokenConfig: securityConfig.accessToken,
  sign: signAccessToken,
});

const findOneByEmail: FindOneByEmail = createFindOneByEmail({ usersCollection });
const verifyPassword = createVerifyPassword({ hasher: passwordHasher });

export const login = createLogin({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});

export const validateLoginRequest = validateRequest(loginRequestConstraints);
