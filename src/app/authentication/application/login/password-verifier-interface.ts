/**
 * Verifies a plain text password against a hashed password.
 * @throws {import('@/app/authentication/application/errors').InvalidCredentialsError}
 */
export type PasswordVerifier = (password: string, hashedPassword: string) => Promise<void>;
