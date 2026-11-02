import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite-plus';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Keep browser wallet SDKs out of the Cloudflare SSR bundle. */
function stacksConnectSsrStub(): Plugin {
  const stub = path.resolve(rootDir, 'src/stubs/stacks-connect.ts');
  return {
    name: 'stacks-connect-ssr-stub',
    enforce: 'pre',
    resolveId(id, _importer, options) {
      if (options?.ssr && id === '@stacks/connect') {
        return stub;
      }
    },
  };
}

const config = defineConfig(({ mode }) => ({
  resolve: {
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 2527,
  },
  plugins:
    mode === 'test'
      ? []
      : [stacksConnectSsrStub(), devtools(), tailwindcss(), tanstackStart(), viteReact()],
}));

export default config;
