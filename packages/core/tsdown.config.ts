import { makeConfig } from '../../tsdown.config.ts';

export default makeConfig({
  exports: true,
  entry: ['src/index.ts', 'src/deployment.ts'],
});
