/**
 * Verifies a plain text password against a hashed password.
 * @throws {import('@/authentication/application/errors').InvalidCredentialsError}
 */
export type PasswordVerifier = (password: string, hashedPassword: string) => Promise<void>;
