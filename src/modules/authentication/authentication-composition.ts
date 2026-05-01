import { createSecretKey, randomUUID } from 'node:crypto';
import { createLogin, type GenerateAccessToken } from '@/modules/authentication/application/login';
import { type FindOneByEmail } from '@/modules/authentication/domain/user-credentials-repository';
import { createFindOneByEmail } from '@/modules/authentication/infrastructure/repository/find-one-by-email';
import { loginRequestConstraints } from '@/modules/authentication/interface/http/login-request';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/modules/authentication/infrastructure/security/access-token';
import { createVerifyPassword } from '@/modules/authentication/infrastructure/security/password/verify-password';
import { systemClock } from '@/modules/shared/clock';
import { usersCollection } from '@/modules/shared/persistence/mongodb';
import { passwordHasher } from '@/modules/shared/security/password';
import { validateRequest } from '@/modules/shared/http';
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
