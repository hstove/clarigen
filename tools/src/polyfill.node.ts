/**
 * Node/API-route polyfills (oRPC file schemas). Not safe for the client bundle.
 */

import { File } from 'node:buffer';

if (typeof globalThis.File === 'undefined') {
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  globalThis.File = File as any;
}
