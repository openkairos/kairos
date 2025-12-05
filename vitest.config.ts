import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./tests/__vitest__/global.ts'],
    setupFiles: ['./tests/__vitest__/unit.ts'],
    coverage: {
      exclude: [
        '**/*.config.*',
        '**/dist/**',
        '**/config/**',
        '**/tests/**',
        '**/types.*',
        '**/index.*',
        'src/bootstrap.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
