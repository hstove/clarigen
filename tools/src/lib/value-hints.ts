import { BytesReader, deserializeCV } from '@stacks/transactions';
import { cvToString } from '@clarigen/core';
import { hex } from '@scure/base';
import { hexToBytes } from './hex';

export type BufferHint = { label: string; value: string };

const OPCODES: Record<number, string> = {
  0: 'OP_0',
  79: 'OP_1NEGATE',
  99: 'OP_IF',
  100: 'OP_NOTIF',
  103: 'OP_ELSE',
  104: 'OP_ENDIF',
  105: 'OP_VERIFY',
  106: 'OP_RETURN',
  117: 'OP_DROP',
  118: 'OP_DUP',
  124: 'OP_SWAP',
  130: 'OP_SIZE',
  135: 'OP_EQUAL',
  136: 'OP_EQUALVERIFY',
  168: 'OP_SHA256',
  169: 'OP_HASH160',
  170: 'OP_HASH256',
  172: 'OP_CHECKSIG',
  173: 'OP_CHECKSIGVERIFY',
  174: 'OP_CHECKMULTISIG',
  175: 'OP_CHECKMULTISIGVERIFY',
  177: 'OP_CHECKLOCKTIMEVERIFY',
  178: 'OP_CHECKSEQUENCEVERIFY',
  186: 'OP_CHECKSIGADD',
};

const OP_PUSHBYTES_MAX = 0x4b;
const OP_PUSHDATA1 = 0x4c;
const OP_PUSHDATA2 = 0x4d;
const OP_1 = 0x51;
const OP_16 = 0x60;
const BYTE = 256;

/** Returns [dataStart, dataLength] for a push opcode, or null. */
function pushData(
  bytes: Uint8Array,
  op: number,
  next: number
): [number, number] | null {
  if (op >= 1 && op <= OP_PUSHBYTES_MAX) return [next, op];
  if (op === OP_PUSHDATA1) return [next + 1, bytes[next] ?? Number.NaN];
  if (op === OP_PUSHDATA2) {
    const low = bytes[next] ?? Number.NaN;
    const high = bytes[next + 1] ?? Number.NaN;
    return [next + 2, low + high * BYTE];
  }
  return null;
}

function opcodeName(op: number): string | undefined {
  if (op >= OP_1 && op <= OP_16) return `OP_${op - OP_1 + 1}`;
  return OPCODES[op];
}

/**
 * Disassemble a Bitcoin script. Returns null unless the bytes parse cleanly
 * and contain at least one non-push opcode.
 */
export function disassembleScript(bytes: Uint8Array): string | null {
  const ops: string[] = [];
  let hasOpcode = false;
  let i = 0;
  while (i < bytes.length) {
    const op = bytes[i] as number;
    const push = pushData(bytes, op, i + 1);
    if (push) {
      const [start, length] = push;
      if (Number.isNaN(length) || start + length > bytes.length) return null;
      ops.push(hex.encode(bytes.slice(start, start + length)));
      i = start + length;
      continue;
    }
    const name = opcodeName(op);
    if (!name) return null;
    if (op !== 0 && (op < OP_1 || op > OP_16)) hasOpcode = true;
    ops.push(name);
    i += 1;
  }
  return hasOpcode ? ops.join(' ') : null;
}

const PRINTABLE = /^[\x20-\x7e\n\r\t]+$/;
const COMPRESSED_PUBKEY_BYTES = 33;
const HASH160_BYTES = 20;
const HASH256_BYTES = 32;

function nestedClarity(bytes: Uint8Array): string | null {
  try {
    const reader = new BytesReader(bytes);
    const value = deserializeCV(reader);
    return reader.consumed === bytes.length ? cvToString(value) : null;
  } catch {
    return null;
  }
}

/** Best-effort interpretations of a buffer's contents. */
export function bufferHints(bufferHex: string): BufferHint[] {
  if (bufferHex.length === 0) return [];
  const bytes = hexToBytes(bufferHex);
  const hints: BufferHint[] = [
    { label: 'length', value: `${bytes.length} bytes` },
  ];

  const script = disassembleScript(bytes);
  if (script) hints.push({ label: 'btc script', value: script });

  const isPubkey =
    bytes.length === COMPRESSED_PUBKEY_BYTES &&
    (bytes[0] === 0x02 || bytes[0] === 0x03);
  if (isPubkey)
    hints.push({ label: 'looks like', value: 'compressed public key' });
  if (bytes.length === HASH160_BYTES) {
    hints.push({ label: 'looks like', value: 'hash160 (20 bytes)' });
  }
  if (bytes.length === HASH256_BYTES) {
    hints.push({ label: 'looks like', value: '32-byte hash' });
  }

  const nested = nestedClarity(bytes);
  if (nested) hints.push({ label: 'clarity value', value: nested });

  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  if (PRINTABLE.test(text)) hints.push({ label: 'utf-8', value: `"${text}"` });

  return hints;
}

const TRAILING_ZEROS = /0+$/;
const GROUPING = /\B(?=(\d{3})+(?!\d))/g;

export function groupDigits(value: bigint): string {
  return value.toString().replace(GROUPING, ',');
}

/** Render a raw integer amount as a decimal with the given precision. */
export function scaleAmount(value: bigint, decimals: number): string {
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const base = 10n ** BigInt(decimals);
  const whole = groupDigits(abs / base);
  const fraction = (abs % base)
    .toString()
    .padStart(decimals, '0')
    .replace(TRAILING_ZEROS, '');
  return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`;
}

const HINT_THRESHOLD = 10_000n;

/** Grouped digits plus 6 and 8 decimal readings for large integers. */
export function integerHints(value: bigint): string[] {
  const abs = value < 0n ? -value : value;
  if (abs < HINT_THRESHOLD) return [];
  return [
    groupDigits(value),
    `${scaleAmount(value, 6)} @ 6 dec (STX)`,
    `${scaleAmount(value, 8)} @ 8 dec (BTC)`,
  ];
}
