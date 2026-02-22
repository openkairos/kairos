export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const userMetadata = {
  password: { ignore: true },
  id: { groups: ['auth:login'] },
  username: { groups: ['auth:login'] },
  email: { groups: ['auth:login'] },
};
