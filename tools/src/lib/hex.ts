import { hex } from '@scure/base';

/** Strip whitespace and an optional 0x prefix. */
export function stripHexPrefix(value: string): string {
  const compact = value.replace(/\s+/g, '');
  if (compact.length >= 2 && compact.slice(0, 2).toLowerCase() === '0x') {
    return compact.slice(2);
  }
  return compact;
}

export function isHexString(value: string): boolean {
  return /^[0-9a-f]*$/i.test(value);
}

/**
 * Normalize hex to a 0x-prefixed lowercase string.
 * Throws if the value is empty, not hex, or has an odd number of digits.
 */
export function normalizeHex(value: string): string {
  const stripped = stripHexPrefix(value);
  if (stripped.length === 0) {
    throw new Error('hex is empty');
  }
  if (!isHexString(stripped)) {
    throw new Error('invalid hex');
  }
  if (stripped.length % 2 !== 0) {
    throw new Error('hex must have even length');
  }
  return `0x${stripped.toLowerCase()}`;
}

export function hexToBytes(value: string): Uint8Array {
  return hex.decode(stripHexPrefix(normalizeHex(value)));
}

export function bytesToHex(bytes: Uint8Array): string {
  return `0x${hex.encode(bytes)}`;
}
