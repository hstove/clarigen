import { describe, expect, it } from 'vitest';
import {
  detectNetworkFromAddress,
  isNetworkMismatch,
} from '../src/lib/constants';

describe('detectNetworkFromAddress', () => {
  it('detects mainnet addresses (SP prefix)', () => {
    expect(
      detectNetworkFromAddress('SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9')
    ).toBe('mainnet');
    expect(
      detectNetworkFromAddress('SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE')
    ).toBe('mainnet');
  });

  it('detects testnet/devnet addresses (ST prefix)', () => {
    expect(
      detectNetworkFromAddress('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')
    ).toBe('testnet');
    expect(
      detectNetworkFromAddress('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG')
    ).toBe('testnet');
  });

  it('handles lowercase prefixes', () => {
    expect(
      detectNetworkFromAddress('sp3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9')
    ).toBe('mainnet');
    expect(
      detectNetworkFromAddress('st1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM')
    ).toBe('testnet');
  });

  it('returns null for invalid prefixes', () => {
    expect(detectNetworkFromAddress('')).toBe(null);
    expect(detectNetworkFromAddress('AB123')).toBe(null);
    expect(detectNetworkFromAddress('XX')).toBe(null);
  });
});

describe('isNetworkMismatch', () => {
  it('detects mainnet address on testnet route', () => {
    const result = isNetworkMismatch(
      'testnet',
      'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token'
    );
    expect(result.mismatch).toBe(true);
    expect(result.detectedNetwork).toBe('mainnet');
    expect(result.expectedNetwork).toBe('testnet');
  });

  it('detects testnet address on mainnet route', () => {
    const result = isNetworkMismatch(
      'mainnet',
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.contract'
    );
    expect(result.mismatch).toBe(true);
    expect(result.detectedNetwork).toBe('testnet');
    expect(result.expectedNetwork).toBe('mainnet');
  });

  it('returns no mismatch when networks match', () => {
    const mainnetResult = isNetworkMismatch(
      'mainnet',
      'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token'
    );
    expect(mainnetResult.mismatch).toBe(false);

    const testnetResult = isNetworkMismatch(
      'testnet',
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.contract'
    );
    expect(testnetResult.mismatch).toBe(false);
  });

  it('treats devnet as testnet (ST addresses are valid)', () => {
    const result = isNetworkMismatch(
      'devnet',
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.contract'
    );
    expect(result.mismatch).toBe(false);
  });

  it('detects mainnet address on devnet route', () => {
    const result = isNetworkMismatch(
      'devnet',
      'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token'
    );
    expect(result.mismatch).toBe(true);
    expect(result.detectedNetwork).toBe('mainnet');
  });
});
