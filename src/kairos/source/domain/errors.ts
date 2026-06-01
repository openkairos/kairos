export const sourceAppIdentifierConflictError = {
  type: 'SOURCE_APP_IDENTIFIER_CONFLICT',
  message: 'Source app identifier already exists in workspace',
} as const;

export type SourceAppIdentifierConflictError = typeof sourceAppIdentifierConflictError;
