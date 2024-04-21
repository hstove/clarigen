import { makeConfig } from '../../tsup.config';

export default makeConfig({
  entry: ['src/index.ts', 'src/run-cli.ts'],
  minify: false,
  sourcemap: true,
});
