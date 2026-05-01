export type SetupTask = () => Promise<unknown>;

export function runSetup(setupTasks: readonly SetupTask[]): () => Promise<void> {
  return async () => {
    for (const setupTask of setupTasks) {
      await setupTask();
    }
  };
}
