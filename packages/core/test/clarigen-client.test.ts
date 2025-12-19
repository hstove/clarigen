import { ClarigenClient, projectFactory } from '../src';
import { test, expect, vi } from 'vitest';
import { project } from '../../../demo-project/esm';
import { STACKS_MAINNET } from '@stacks/network';

const sbtc = projectFactory(project, 'mainnet').sbtcToken;

test('can create a ClarigenClient', () => {
  const client = new ClarigenClient('mainnet');
  expect(client).toBeDefined();
});

test('can create a ClarigenClient with headers', () => {
  const client = new ClarigenClient(STACKS_MAINNET, 'my-api-key', {
    'my-custom-header': 'hello',
  });
  expect(client).toBeDefined();
});

test('can call a read-only function', async () => {
  const fetchMock = vi.spyOn(global, 'fetch');
  fetchMock.mockResolvedValueOnce(
    new Response(
      JSON.stringify({
        okay: true,
        result: '0x0100000000000000000000000000000000',
      }),
      { status: 200 }
    )
  );

  const customHeaders = {
    'my-custom-header': 'hello',
    'another-header': 'world',
  };
  const client = new ClarigenClient('mainnet', undefined, customHeaders);
  const balance = await client.ro(sbtc.getBalance(sbtc.identifier));

  expect(balance).toBeDefined();
  const fetchCalls = fetchMock.mock.calls;
  expect(fetchCalls.length).toBeGreaterThan(0);

  const hasHeaders = fetchCalls.some((call) => {
    const options = call[1] as RequestInit | undefined;
    if (!options?.headers) return false;

    const headers = options.headers;

    if (typeof headers === 'object') {
      const keys = Object.keys(headers).map((k) => k.toLowerCase());
      return (
        keys.includes('my-custom-header') || keys.includes('another-header')
      );
    }
    return false;
  });

  expect(hasHeaders).toBe(true);
});
