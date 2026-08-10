/**
 * SSR polyfills loaded from `router.tsx` before route modules.
 * Keep this free of Node-only imports so the client Vite build can include it.
 */

/**
 * `@stacks/connect` (and its lit web components) extend `HTMLElement` at module
 * init. Cloudflare Workers SSR has no DOM, so stub the minimum needed to load.
 */
if (typeof globalThis.HTMLElement === 'undefined') {
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  globalThis.HTMLElement = class HTMLElement {} as any;
}

if (typeof globalThis.customElements === 'undefined') {
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  globalThis.customElements = {
    define() {},
    get() {
      return undefined;
    },
    whenDefined() {
      return Promise.resolve(undefined as unknown as CustomElementConstructor);
    },
    upgrade() {},
    getName() {
      return null;
    },
  } as any;
}
