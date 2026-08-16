export const HIRO_API_KEY_STORAGE_KEY = 'clarigen:hiro-api-key';

export function getHiroApiKey(): string | undefined {
  if (typeof window === 'undefined') return;

  try {
    return (
      window.localStorage.getItem(HIRO_API_KEY_STORAGE_KEY)?.trim() || undefined
    );
  } catch {
    return;
  }
}

export function setHiroApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;

  try {
    const trimmedApiKey = apiKey.trim();
    if (trimmedApiKey) {
      window.localStorage.setItem(HIRO_API_KEY_STORAGE_KEY, trimmedApiKey);
    } else {
      window.localStorage.removeItem(HIRO_API_KEY_STORAGE_KEY);
    }
  } catch {
    // Storage may be disabled or unavailable. API requests still work without a key.
  }
}

export function getHiroApiKeyHeaders(): Record<string, string> {
  const apiKey = getHiroApiKey();
  return apiKey ? { 'x-api-key': apiKey } : {};
}
