import { createSecretKey, randomUUID } from 'node:crypto';
import { createLogin, type GenerateAccessToken } from '@/app/authentication/application/login';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { createFindOneByEmail } from '@/app/authentication/infrastructure/repository/find-one-by-email';
import { loginRequestConstraints } from '@/app/authentication/interface/http/login-request';
import { systemClock } from '@/app/shared/application/clock';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/app/shared/infrastructure/security/access-token';
import { usersCollection } from '@/app/shared/infrastructure/persistence/mongodb';
import { verifyPassword } from '@/app/shared/infrastructure/security/password';
import { validateRequest } from '@/app/shared/interface/http';
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

export const login = createLogin({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});

export const validateLoginRequest = validateRequest(loginRequestConstraints);
