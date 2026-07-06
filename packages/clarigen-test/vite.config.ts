import { getClarinetVitestsArgv, vitestSetupFilePath } from '@stacks/clarinet-sdk/vitest';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    target: 'node16',
    entry: ['src/index.ts'],
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
        manifest: '../../demo-project/Clarinet.toml',
        manifestPath: '../../demo-project/Clarinet.toml',
      },
    },
    isolate: false,
    pool: 'forks',
    setupFiles: [vitestSetupFilePath],
  },
});
