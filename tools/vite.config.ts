import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
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

const config = defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 2527,
  },
  plugins: [
    stacksConnectSsrStub(),
    devtools(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
