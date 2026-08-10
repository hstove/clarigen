/** Client-only stubs so `@stacks/connect` never loads during Workers SSR. */

export async function connect(): Promise<void> {
  throw new Error("@stacks/connect is client-only");
}

export function disconnect(): void {
  throw new Error("@stacks/connect is client-only");
}

export async function request(
  _method: string,
  _params?: unknown
): Promise<never> {
  throw new Error("@stacks/connect is client-only");
}

export function getLocalStorage(): null {
  return null;
}
