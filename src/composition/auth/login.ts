import { createSecretKey, randomUUID } from 'node:crypto';
import { createLogin, type GenerateAccessToken } from '@/app/authentication/application/login';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { loginRequestConstraints } from '@/app/authentication/interface/http/login-request';
import { systemClock } from '@/app/shared/application/clock';
import { createFindOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository/find-one-by-email';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/app/shared/infrastructure/security/access-token';
import { validateRequest } from '@/composition/shared/http/middleware';
import { usersCollection } from '@/composition/shared/persistence/mongodb';
import { verifyPassword } from '@/composition/shared/security/password';
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
