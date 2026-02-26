import { createSecretKey, randomUUID } from 'node:crypto';
import { type GenerateAccessToken, login } from '@/app/authentication/application/login';
import { type FindOneByEmail } from '@/app/authentication/domain/user-credentials-repository';
import { loginRequestConstraints } from '@/app/authentication/interface/http/login-request';
import { systemClock } from '@/app/shared/application/clock';
import { createFindOneByEmail } from '@/app/shared/infrastructure/persistence/repository/user-repository/find-one-by-email';
import {
  createGenerateAccessToken,
  createJwtAccessTokenSigner,
  type SignAccessToken,
} from '@/app/shared/infrastructure/security/access-token';
import { validateRequest } from '@/composition/http/middleware';
import { usersCollection } from '@/composition/persistence/mongodb';
import { verifyPassword } from '@/composition/security/password';
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

export const loginUser = login({
  findOneByEmail,
  verifyPassword,
  generateAccessToken,
});

export const validateLoginRequest = validateRequest(loginRequestConstraints);
