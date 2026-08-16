import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getHiroApiKey,
  getHiroApiKeyHeaders,
  HIRO_API_KEY_STORAGE_KEY,
  setHiroApiKey,
} from '../src/lib/hiro-api-key';
import { getStacksApi } from '../src/lib/stacks-api';

const mockStorage: Record<string, string> = {};

vi.stubGlobal('window', {
  localStorage: {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  },
});

beforeEach(() => {
  for (const key of Object.keys(mockStorage)) delete mockStorage[key];
});

describe('Hiro API key storage', () => {
  it('stores a trimmed key and removes it when cleared', () => {
    setHiroApiKey('  test-key  ');

    expect(mockStorage[HIRO_API_KEY_STORAGE_KEY]).toBe('test-key');
    expect(getHiroApiKey()).toBe('test-key');
    expect(getHiroApiKeyHeaders()).toEqual({ 'x-api-key': 'test-key' });

    setHiroApiKey('   ');

    expect(getHiroApiKey()).toBeUndefined();
    expect(getHiroApiKeyHeaders()).toEqual({});
  });
});

describe('Stacks API client', () => {
  it('adds the Hiro API key to API requests', async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ abi: '{}', source_code: '' })
    );
    vi.stubGlobal('fetch', fetchMock);

    const client = getStacksApi('mainnet', 'test-key');
    await client.GET('/extended/v1/contract/{contract_id}', {
      params: { path: { contract_id: 'SP123.contract' } },
    });

    const request = fetchMock.mock.calls[0]?.[0];
    expect(request).toBeInstanceOf(Request);
    expect((request as Request).headers.get('x-api-key')).toBe('test-key');
  });
});
