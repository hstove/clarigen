import { type UserConfig, defineConfig } from 'tsdown';

export const defaultConfig: UserConfig = {
  target: 'node16',
  entry: ['src/index.ts'],
  minify: true,
  outDir: 'dist',
  exports: true,
  dts: true,
  // splitting: true,
  format: ['esm', 'cjs'],
};

export function makeConfig(opts: Partial<UserConfig> = {}) {
  const config: UserConfig = {
    ...defaultConfig,
    ...opts,
  };
  // console.log('config', config);
  return defineConfig(config);
}
