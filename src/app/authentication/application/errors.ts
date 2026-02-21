export interface InvalidCredentialsError {
  type: 'INVALID_CREDENTIALS';
  message: 'Invalid credentials';
}

export const invalidCredentialsError: InvalidCredentialsError = {
  type: 'INVALID_CREDENTIALS',
  message: 'Invalid credentials',
};
