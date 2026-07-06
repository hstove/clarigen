import { getClarinetVitestsArgv, vitestSetupFilePath } from '@stacks/clarinet-sdk/vitest';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    target: 'node16',
    entry: ['esm/index.ts'],
    minify: false,
    outDir: 'dist',
    sourcemap: true,
    exports: true,
    dts: true,
    format: ['esm', 'cjs'],
  },
  test: {
    environment: 'clarinet',
    environmentOptions: {
      clarinet: {
        ...getClarinetVitestsArgv(),
        initBeforeEach: false,
      },
    },
    isolate: false,
    pool: 'forks',
    setupFiles: [vitestSetupFilePath],
  },
});
