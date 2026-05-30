export type RuntimeInfrastructureTask = () => Promise<unknown>;

export function createEnsureRuntimeInfrastructure(
  runtimeInfrastructureTasks: readonly RuntimeInfrastructureTask[],
): () => Promise<void> {
  return async () => {
    for (const runtimeInfrastructureTask of runtimeInfrastructureTasks) {
      await runtimeInfrastructureTask();
    }
  };
}
