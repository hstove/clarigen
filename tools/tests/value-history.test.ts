import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addContextHistory,
  addTypeHistory,
  getContextHistory,
  getCombinedHistory,
  getTypeHistory,
  saveFormHistory,
} from '../src/lib/value-history';

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
  // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
  Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
});

describe('getContextHistory / addContextHistory', () => {
  const contractId = 'SP123.token';
  const functionName = 'transfer';
  const argName = 'recipient';

  it('returns empty array when no history exists', () => {
    expect(getContextHistory(contractId, functionName, argName)).toEqual([]);
  });

  it('stores and retrieves a single value', () => {
    addContextHistory(contractId, functionName, argName, 'SP456');
    expect(getContextHistory(contractId, functionName, argName)).toEqual([
      'SP456',
    ]);
  });

  it('stores multiple values in most-recent-first order', () => {
    addContextHistory(contractId, functionName, argName, 'SP111');
    addContextHistory(contractId, functionName, argName, 'SP222');
    addContextHistory(contractId, functionName, argName, 'SP333');
    expect(getContextHistory(contractId, functionName, argName)).toEqual([
      'SP333',
      'SP222',
      'SP111',
    ]);
  });

  it('moves existing value to front (deduplication)', () => {
    addContextHistory(contractId, functionName, argName, 'SP111');
    addContextHistory(contractId, functionName, argName, 'SP222');
    addContextHistory(contractId, functionName, argName, 'SP111');
    expect(getContextHistory(contractId, functionName, argName)).toEqual([
      'SP111',
      'SP222',
    ]);
  });

  it('limits to 10 items', () => {
    for (let i = 0; i < 15; i++) {
      addContextHistory(contractId, functionName, argName, `SP${i}`);
    }
    const history = getContextHistory(contractId, functionName, argName);
    expect(history).toHaveLength(10);
    // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
    expect(history[0]!).toBe('SP14');
    // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
    expect(history[9]!).toBe('SP5');
  });

  it('skips empty strings', () => {
    addContextHistory(contractId, functionName, argName, 'SP111');
    addContextHistory(contractId, functionName, argName, '');
    addContextHistory(contractId, functionName, argName, '   ');
    expect(getContextHistory(contractId, functionName, argName)).toEqual([
      'SP111',
    ]);
  });
});

describe('getTypeHistory / addTypeHistory', () => {
  const clarityType = 'principal';

  it('returns empty array when no history exists', () => {
    expect(getTypeHistory(clarityType)).toEqual([]);
  });

  it('stores and retrieves values', () => {
    addTypeHistory(clarityType, 'SP111');
    addTypeHistory(clarityType, 'SP222');
    expect(getTypeHistory(clarityType)).toEqual(['SP222', 'SP111']);
  });

  it('limits to 20 items', () => {
    for (let i = 0; i < 25; i++) {
      addTypeHistory(clarityType, `SP${i}`);
    }
    const history = getTypeHistory(clarityType);
    expect(history).toHaveLength(20);
    expect(history[0]).toBe('SP24');
    expect(history[19]).toBe('SP5');
  });
});

describe('getCombinedHistory', () => {
  it('returns both context and type history', () => {
    addContextHistory('SP123.token', 'transfer', 'recipient', 'SPCONTEXT');
    addTypeHistory('principal', 'SPGLOBAL');

    const combined = getCombinedHistory(
      'SP123.token',
      'transfer',
      'recipient',
      'principal'
    );
    expect(combined.contextHistory).toEqual(['SPCONTEXT']);
    expect(combined.typeHistory).toEqual(['SPGLOBAL']);
  });
});

describe('saveFormHistory', () => {
  it('saves values to both context and type stores', () => {
    saveFormHistory('SP123.token', 'transfer', [
      { name: 'recipient', type: 'principal', value: 'SP456' },
      { name: 'amount', type: 'uint128', value: '1000' },
    ]);

    expect(getContextHistory('SP123.token', 'transfer', 'recipient')).toEqual([
      'SP456',
    ]);
    expect(getContextHistory('SP123.token', 'transfer', 'amount')).toEqual([
      '1000',
    ]);
    expect(getTypeHistory('principal')).toEqual(['SP456']);
    expect(getTypeHistory('uint128')).toEqual(['1000']);
  });

  it('skips empty values', () => {
    saveFormHistory('SP123.token', 'transfer', [
      { name: 'recipient', type: 'principal', value: '' },
      { name: 'amount', type: 'uint128', value: '1000' },
    ]);

    expect(getContextHistory('SP123.token', 'transfer', 'recipient')).toEqual(
      []
    );
    expect(getContextHistory('SP123.token', 'transfer', 'amount')).toEqual([
      '1000',
    ]);
  });
});
