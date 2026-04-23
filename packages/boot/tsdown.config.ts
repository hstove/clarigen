import { makeConfig } from '../../tsdown.config.ts';

export default makeConfig({
  entry: ['src/mainnet.ts', 'src/testnet.ts', 'src/index.ts'],
  minify: false,
  sourcemap: true,
  // splitting: false,
});
