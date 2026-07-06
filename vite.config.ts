import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@clarigen/core/deployment',
        replacement: fileURLToPath(new URL('./packages/core/src/deployment.ts', import.meta.url)),
      },
      {
        find: '@clarigen/core',
        replacement: fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      },
      {
        find: '@clarigen/docs',
        replacement: fileURLToPath(new URL('./packages/docs/src/index.ts', import.meta.url)),
      },
      {
        find: '@clarigen/cli',
        replacement: fileURLToPath(new URL('./packages/cli/src/index.ts', import.meta.url)),
      },
      {
        find: '@clarigen/boot/mainnet',
        replacement: fileURLToPath(new URL('./packages/boot/src/mainnet.ts', import.meta.url)),
      },
      {
        find: '@clarigen/boot/testnet',
        replacement: fileURLToPath(new URL('./packages/boot/src/testnet.ts', import.meta.url)),
      },
      {
        find: '@clarigen/boot',
        replacement: fileURLToPath(new URL('./packages/boot/src/index.ts', import.meta.url)),
      },
      {
        find: '@clarigen/test',
        replacement: fileURLToPath(
          new URL('./packages/clarigen-test/src/index.ts', import.meta.url)
        ),
      },
    ],
  },
  test: {
    projects: [
      fileURLToPath(new URL('./demo-project', import.meta.url)),
      fileURLToPath(new URL('./packages/*', import.meta.url)),
      fileURLToPath(new URL('./tools', import.meta.url)),
    ],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'off' },
    options: { typeAware: false, typeCheck: false },
    ignorePatterns: ['tools/src/routeTree.gen.ts'],
  },
  fmt: {
    printWidth: 100,
    trailingComma: 'es5',
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    arrowParens: 'avoid',
    sortPackageJson: false,
    ignorePatterns: ['tools/src/routeTree.gen.ts'],
  },
});
