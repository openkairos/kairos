export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const userMetadata = {
  password: { ignore: true },
};
