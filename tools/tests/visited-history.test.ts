import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addVisitedFunction,
  clearVisitedHistory,
  getVisitedContracts,
  getVisitedFunctions,
} from '../src/lib/visited-history';

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
  Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
});

describe('getVisitedFunctions / addVisitedFunction', () => {
  it('returns empty array when no history exists', () => {
    expect(getVisitedFunctions()).toEqual([]);
  });

  it('stores and retrieves a single function visit', () => {
    addVisitedFunction('SP123.token', 'transfer', 'mainnet');
    const visited = getVisitedFunctions();
    expect(visited).toHaveLength(1);
    expect(visited[0].contractId).toBe('SP123.token');
    expect(visited[0].functionName).toBe('transfer');
    expect(visited[0].network).toBe('mainnet');
    expect(visited[0].lastVisited).toBeTypeOf('number');
    expect(visited[0].version).toBe(1);
  });

  it('stores contract-only visits with null functionName', () => {
    addVisitedFunction('SP123.token', null, 'mainnet');
    const visited = getVisitedFunctions();
    expect(visited).toHaveLength(1);
    expect(visited[0].functionName).toBeNull();
  });

  it('stores multiple visits in most-recent-first order', () => {
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');
    addVisitedFunction('SP222.b', 'fn2', 'testnet');
    addVisitedFunction('SP333.c', 'fn3', 'mainnet');

    const visited = getVisitedFunctions();
    expect(visited).toHaveLength(3);
    expect(visited[0].contractId).toBe('SP333.c');
    expect(visited[1].contractId).toBe('SP222.b');
    expect(visited[2].contractId).toBe('SP111.a');
  });

  it('moves existing visit to front (deduplication)', () => {
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');
    addVisitedFunction('SP222.b', 'fn2', 'mainnet');
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');

    const visited = getVisitedFunctions();
    expect(visited).toHaveLength(2);
    expect(visited[0].contractId).toBe('SP111.a');
    expect(visited[1].contractId).toBe('SP222.b');
  });

  it('treats same contract/function on different networks as separate entries', () => {
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');
    addVisitedFunction('SP111.a', 'fn1', 'testnet');

    const visited = getVisitedFunctions();
    expect(visited).toHaveLength(2);
  });

  it('skips empty contractId', () => {
    addVisitedFunction('', 'transfer', 'mainnet');
    expect(getVisitedFunctions()).toEqual([]);
  });

  it('skips empty network', () => {
    addVisitedFunction('SP123.token', 'transfer', '');
    expect(getVisitedFunctions()).toEqual([]);
  });
});

describe('getVisitedContracts', () => {
  it('returns empty array when no history exists', () => {
    expect(getVisitedContracts()).toEqual([]);
  });

  it('returns unique contract IDs in visit order', () => {
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');
    addVisitedFunction('SP222.b', 'fn2', 'mainnet');
    addVisitedFunction('SP111.a', 'fn3', 'mainnet');

    const contracts = getVisitedContracts();
    expect(contracts).toEqual(['SP111.a', 'SP222.b']);
  });

  it('preserves order of first occurrence', () => {
    addVisitedFunction('SP333.c', 'fn1', 'mainnet');
    addVisitedFunction('SP222.b', 'fn2', 'mainnet');
    addVisitedFunction('SP111.a', 'fn3', 'mainnet');

    const contracts = getVisitedContracts();
    expect(contracts).toEqual(['SP111.a', 'SP222.b', 'SP333.c']);
  });
});

describe('clearVisitedHistory', () => {
  it('clears all visited history', () => {
    addVisitedFunction('SP111.a', 'fn1', 'mainnet');
    addVisitedFunction('SP222.b', 'fn2', 'mainnet');

    clearVisitedHistory();

    expect(getVisitedFunctions()).toEqual([]);
    expect(getVisitedContracts()).toEqual([]);
  });
});

describe('schema validation', () => {
  it('clears invalid data from storage and returns empty array', () => {
    mockStorage['clarigen:visited:functions'] = JSON.stringify([
      { contractId: 'SP123.token', functionName: 'transfer' }, // missing fields
    ]);
    expect(getVisitedFunctions()).toEqual([]);
    expect(mockStorage['clarigen:visited:functions']).toBeUndefined();
  });

  it('clears non-array data from storage', () => {
    mockStorage['clarigen:visited:functions'] = JSON.stringify({
      invalid: 'object',
    });
    expect(getVisitedFunctions()).toEqual([]);
    expect(mockStorage['clarigen:visited:functions']).toBeUndefined();
  });
});
