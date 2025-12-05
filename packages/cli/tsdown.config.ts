import { makeConfig } from '../../tsdown.config.ts';

export default makeConfig({
  entry: ['src/index.ts', 'src/run-cli.ts'],
  minify: false,
  sourcemap: true,
});
