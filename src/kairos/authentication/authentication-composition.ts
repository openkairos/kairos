import { createSecretKey, randomUUID } from 'node:crypto';
import { createLogin, type GenerateAccessToken } from '@/kairos/authentication/application/login';
import { type FindOneByEmail } from '@/kairos/authentication/domain/user-credentials-repository';
import { createFindOneByEmail } from '@/kairos/authentication/infrastructure/repository/find-one-by-email';
import { loginRequestConstraints } from '@/kairos/authentication/interface/http/login-request';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/kairos/authentication/infrastructure/security/access-token';
import { createVerifyPassword } from '@/kairos/authentication/infrastructure/security/password/verify-password';
import { systemClock } from '@/kairos/shared/clock';
import { usersCollection } from '@/kairos/shared/persistence/mongodb';
import { passwordHasher } from '@/kairos/shared/security/password';
import { validateRequest } from '@/kairos/shared/http';
import { securityConfig } from '@/config/security';

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
