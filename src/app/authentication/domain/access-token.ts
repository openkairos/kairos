export interface AccessToken {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
}

export const accessTokenSerializerMetadata = {
  token_type: { groups: ['auth:login'] },
  expires_in: { groups: ['auth:login'] },
  access_token: { groups: ['auth:login'] },
};
