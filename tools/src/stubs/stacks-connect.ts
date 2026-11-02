/** Client-only stubs so `@stacks/connect` never loads during Workers SSR. */

export function connect(): Promise<void> {
  return Promise.reject(new Error('@stacks/connect is client-only'));
}

export function disconnect(): void {
  throw new Error('@stacks/connect is client-only');
}

export function request(_method: string, _params?: unknown): Promise<never> {
  return Promise.reject(new Error('@stacks/connect is client-only'));
}

export function getLocalStorage(): null {
  return null;
}
