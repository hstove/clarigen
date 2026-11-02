/**
 * SSR polyfills loaded from `router.tsx` before route modules.
 * Keep this free of Node-only imports so the client Vite build can include it.
 */

/**
 * `@stacks/connect` (and its lit web components) extend `HTMLElement` at module
 * init. Cloudflare Workers SSR has no DOM, so stub the minimum needed to load.
 */
if (typeof globalThis.HTMLElement === 'undefined') {
  globalThis.HTMLElement =
    class HTMLElement {} as unknown as typeof globalThis.HTMLElement;
}

if (typeof globalThis.customElements === 'undefined') {
  const noop = () => undefined;
  globalThis.customElements = {
    define: noop,
    get() {
      return;
    },
    whenDefined() {
      return Promise.resolve(undefined as unknown as CustomElementConstructor);
    },
    upgrade: noop,
    getName() {
      return null;
    },
  } as unknown as CustomElementRegistry;
}
