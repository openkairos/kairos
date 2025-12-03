import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./tests/__vitest__/global.ts'],
    setupFiles: ['./tests/__vitest__/unit.ts'],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/config/**',
        'src/index.ts',
        '**/tests/**',
        '**/types.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
