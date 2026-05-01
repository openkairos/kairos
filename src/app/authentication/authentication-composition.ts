import { createSecretKey, randomUUID } from 'node:crypto';
import { createLogin, type GenerateAccessToken } from '@/app/authentication/application/login';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { createFindOneByEmail } from '@/app/authentication/infrastructure/repository/find-one-by-email';
import { loginRequestConstraints } from '@/app/authentication/interface/http/login-request';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/app/authentication/infrastructure/security/access-token';
import { createVerifyPassword } from '@/app/authentication/infrastructure/security/password/verify-password';
import { systemClock } from '@/app/shared/clock';
import { usersCollection } from '@/app/shared/persistence/mongodb';
import { passwordHasher } from '@/app/shared/security/password';
import { validateRequest } from '@/app/shared/http';
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
