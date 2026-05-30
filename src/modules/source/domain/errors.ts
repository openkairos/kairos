export interface SourceNameEnvironmentConflictError {
  type: 'SOURCE_NAME_ENVIRONMENT_CONFLICT';
  message: 'Source name already exists in this workspace environment';
}

export const sourceNameEnvironmentConflictError: SourceNameEnvironmentConflictError = {
  type: 'SOURCE_NAME_ENVIRONMENT_CONFLICT',
  message: 'Source name already exists in this workspace environment',
};
