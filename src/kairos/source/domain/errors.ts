export const sourceNameConflictError = {
  type: 'SOURCE_NAME_CONFLICT',
  message: 'Source name already exists in this workspace',
} as const;

export type SourceNameConflictError = typeof sourceNameConflictError;
