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
});
