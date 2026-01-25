export const securityConfig = {
  appKey: process.env.APP_KEY ?? '',
  accessToken: {
    ttl: 3600,
    algorithm: 'HS256',
    issuer: 'kairos',
  },
};
