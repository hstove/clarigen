import { isHexString, stripHexPrefix } from './hex';

const TXID_HEX_LENGTH = 64;

/** Normalize a Stacks txid to lowercase 0x-prefixed hex. */
export function normalizeTxid(input: string): string {
  const stripped = stripHexPrefix(input).toLowerCase();
  if (stripped.length === 0) {
    throw new Error('txid is empty');
  }
  if (!isHexString(stripped) || stripped.length !== TXID_HEX_LENGTH) {
    throw new Error('txid must be 32 bytes of hex');
  }
  return `0x${stripped}`;
}
