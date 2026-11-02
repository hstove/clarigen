import {
  AddressHashMode,
  AuthType,
  BytesReader,
  type ClarityValue,
  ClarityType,
  deserializeCV,
  deserializeLPList,
  deserializePayload,
  deserializePostConditionWire,
  deserializeTransaction,
  addressFromVersionHash,
  addressHashModeToVersion,
  addressToString,
  isSingleSig,
  PayloadType,
  type PayloadWire,
  type PostCondition,
  type PostConditionWire,
  PostConditionMode,
  postConditionToWire,
  type SpendingCondition,
  StacksWireType,
  wireToPostCondition,
} from '@stacks/transactions';
import { principalToString } from '@clarigen/core';
import { bytesToHex, hexToBytes, isHexString, stripHexPrefix } from './hex';

export type DecodeMode =
  | 'auto'
  | 'transaction'
  | 'payload'
  | 'clarity'
  | 'post-condition'
  | 'post-conditions'
  | 'txid';

export const DECODE_MODES: { value: DecodeMode; label: string }[] = [
  { value: 'auto', label: 'auto-detect' },
  { value: 'transaction', label: 'transaction' },
  { value: 'payload', label: 'tx payload' },
  { value: 'clarity', label: 'clarity value' },
  { value: 'post-condition', label: 'post-condition' },
  { value: 'post-conditions', label: 'post-condition list' },
  { value: 'txid', label: 'txid (fetch)' },
];

export type TxNetwork = 'mainnet' | 'testnet';
export type PostConditionModeName = 'allow' | 'deny' | 'originator';

export type Spender = {
  address: string;
  hashMode: string;
  nonce: bigint;
  fee: bigint;
  signed: boolean;
  signatures: number;
  signaturesRequired: number;
};

export type ContractCallInfo = {
  kind: 'contract-call';
  contractId: string;
  functionName: string;
  args: ClarityValue[];
};

export type TxPayload =
  | ContractCallInfo
  | { kind: 'token-transfer'; recipient: string; amount: bigint; memo: string }
  | {
      kind: 'smart-contract';
      contractName: string;
      code: string;
      clarityVersion: number | null;
    }
  | { kind: 'other'; label: string };

export type DecodedTransaction = {
  network: TxNetwork;
  chainId: number;
  sponsored: boolean;
  origin: Spender;
  sponsor: Spender | null;
  postConditionMode: PostConditionModeName;
  postConditions: PostCondition[];
  payload: TxPayload;
  txid: string;
  byteLength: number;
};

export type CallRequest = {
  network: TxNetwork | null;
  call: ContractCallInfo;
  postConditionMode: PostConditionModeName | null;
  postConditions: PostCondition[];
};

export type DecodedItem =
  | { kind: 'transaction'; tx: DecodedTransaction }
  | { kind: 'payload'; payload: TxPayload; network: TxNetwork | null }
  | { kind: 'call-request'; request: CallRequest }
  | { kind: 'clarity'; value: ClarityValue }
  | { kind: 'post-condition'; postCondition: PostCondition }
  | { kind: 'post-conditions'; postConditions: PostCondition[] }
  | { kind: 'txid'; txid: string };

export type DecodeEntry =
  | { status: 'ok'; source: string; item: DecodedItem }
  | { status: 'error'; source: string; message: string };

const TXID_BYTES = 32;
const EMPTY_SIGNATURE = /^0*$/;

const HASH_MODE_LABELS: Record<number, string> = {
  [AddressHashMode.P2PKH]: 'p2pkh (single-sig)',
  [AddressHashMode.P2WPKH]: 'p2wpkh (single-sig)',
  [AddressHashMode.P2SH]: 'p2sh (multisig)',
  [AddressHashMode.P2WSH]: 'p2wsh (multisig)',
  [AddressHashMode.P2SHNonSequential]: 'p2sh non-sequential (multisig)',
  [AddressHashMode.P2WSHNonSequential]: 'p2wsh non-sequential (multisig)',
};

function modeName(mode: PostConditionMode): PostConditionModeName {
  if (mode === PostConditionMode.Allow) return 'allow';
  if (mode === PostConditionMode.Deny) return 'deny';
  return 'originator';
}

/** Run a deserializer and require that it consumes every byte. */
function readAll<T>(bytes: Uint8Array, read: (reader: BytesReader) => T): T {
  const reader = new BytesReader(bytes);
  const result = read(reader);
  if (reader.consumed !== bytes.length) {
    throw new Error(`${bytes.length - reader.consumed} trailing bytes after decoding`);
  }
  return result;
}

function spenderInfo(condition: SpendingCondition, network: TxNetwork): Spender {
  const version = addressHashModeToVersion(condition.hashMode, network);
  const address = addressToString(addressFromVersionHash(version, condition.signer));
  const hashMode = HASH_MODE_LABELS[condition.hashMode] ?? 'unknown';
  if (isSingleSig(condition)) {
    const signed = !EMPTY_SIGNATURE.test(condition.signature.data);
    return {
      address,
      hashMode,
      nonce: condition.nonce,
      fee: condition.fee,
      signed,
      signatures: signed ? 1 : 0,
      signaturesRequired: 1,
    };
  }
  const signatures = condition.fields.filter(
    field => field.contents.type === StacksWireType.MessageSignature
  ).length;
  return {
    address,
    hashMode,
    nonce: condition.nonce,
    fee: condition.fee,
    signed: signatures >= condition.signaturesRequired,
    signatures,
    signaturesRequired: condition.signaturesRequired,
  };
}

function payloadInfo(payload: PayloadWire): TxPayload {
  switch (payload.payloadType) {
    case PayloadType.ContractCall:
      return {
        kind: 'contract-call',
        contractId: `${addressToString(payload.contractAddress)}.${payload.contractName.content}`,
        functionName: payload.functionName.content,
        args: payload.functionArgs,
      };
    case PayloadType.TokenTransfer:
      return {
        kind: 'token-transfer',
        recipient: principalToString(payload.recipient),
        amount: payload.amount,
        memo: payload.memo.content,
      };
    case PayloadType.SmartContract:
      return {
        kind: 'smart-contract',
        contractName: payload.contractName.content,
        code: payload.codeBody.content,
        clarityVersion: null,
      };
    case PayloadType.VersionedSmartContract:
      return {
        kind: 'smart-contract',
        contractName: payload.contractName.content,
        code: payload.codeBody.content,
        clarityVersion: payload.clarityVersion,
      };
    default:
      return { kind: 'other', label: PayloadType[payload.payloadType] };
  }
}

export function decodeTransaction(bytes: Uint8Array): DecodedTransaction {
  const tx = readAll(bytes, reader => deserializeTransaction(reader));
  const network: TxNetwork = tx.transactionVersion === 0 ? 'mainnet' : 'testnet';
  const sponsored = tx.auth.authType === AuthType.Sponsored;
  return {
    network,
    chainId: tx.chainId,
    sponsored,
    origin: spenderInfo(tx.auth.spendingCondition, network),
    sponsor:
      tx.auth.authType === AuthType.Sponsored
        ? spenderInfo(tx.auth.sponsorSpendingCondition, network)
        : null,
    postConditionMode: modeName(tx.postConditionMode),
    postConditions: tx.postConditions.values.map(pc =>
      wireToPostCondition(pc as PostConditionWire)
    ),
    payload: payloadInfo(tx.payload),
    txid: `0x${tx.txid()}`,
    byteLength: bytes.length,
  };
}

const MAINNET_ADDRESS_VERSIONS = new Set([22, 20]);

function payloadNetwork(payload: PayloadWire): TxNetwork | null {
  if (payload.payloadType === PayloadType.ContractCall) {
    return MAINNET_ADDRESS_VERSIONS.has(payload.contractAddress.version) ? 'mainnet' : 'testnet';
  }
  if (payload.payloadType === PayloadType.TokenTransfer) {
    return principalNetwork(principalToString(payload.recipient));
  }
  return null;
}

function decodePayload(bytes: Uint8Array): DecodedItem {
  const payload = readAll(bytes, reader => deserializePayload(reader));
  return {
    kind: 'payload',
    payload: payloadInfo(payload),
    network: payloadNetwork(payload),
  };
}

function decodeClarity(bytes: Uint8Array): ClarityValue {
  return readAll(bytes, reader => deserializeCV(reader));
}

function decodePostCondition(bytes: Uint8Array): PostCondition {
  return wireToPostCondition(readAll(bytes, reader => deserializePostConditionWire(reader)));
}

function decodePostConditionList(bytes: Uint8Array): PostCondition[] {
  const list = readAll(bytes, reader => deserializeLPList(reader, StacksWireType.PostCondition));
  return list.values.map(pc => wireToPostCondition(pc));
}

function decodeTxid(bytes: Uint8Array): string {
  if (bytes.length !== TXID_BYTES) {
    throw new Error('txid must be 32 bytes');
  }
  return bytesToHex(bytes);
}

const HEX_DECODERS: Record<Exclude<DecodeMode, 'auto'>, (bytes: Uint8Array) => DecodedItem> = {
  transaction: bytes => ({
    kind: 'transaction',
    tx: decodeTransaction(bytes),
  }),
  payload: decodePayload,
  clarity: bytes => ({ kind: 'clarity', value: decodeClarity(bytes) }),
  'post-conditions': bytes => ({
    kind: 'post-conditions',
    postConditions: decodePostConditionList(bytes),
  }),
  'post-condition': bytes => ({
    kind: 'post-condition',
    postCondition: decodePostCondition(bytes),
  }),
  txid: bytes => ({ kind: 'txid', txid: decodeTxid(bytes) }),
};

const AUTO_ORDER: Exclude<DecodeMode, 'auto'>[] = [
  'transaction',
  'clarity',
  'payload',
  'post-conditions',
  'post-condition',
  'txid',
];

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function decodeHex(input: string, mode: DecodeMode): DecodedItem {
  const stripped = stripHexPrefix(input);
  if (!isHexString(stripped)) throw new Error('not valid hex');
  const bytes = hexToBytes(stripped);
  if (mode !== 'auto') return HEX_DECODERS[mode](bytes);
  for (const candidate of AUTO_ORDER) {
    try {
      return HEX_DECODERS[candidate](bytes);
    } catch {
      // try the next format
    }
  }
  throw new Error(
    'could not decode as a transaction, payload, clarity value, post-condition, or txid'
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isPostConditionObject(value: unknown): value is PostCondition {
  const record = asRecord(value);
  return typeof record?.type === 'string' && record.type.endsWith('-postcondition');
}

function jsonPostCondition(value: unknown): PostCondition {
  if (typeof value === 'string') return decodePostCondition(hexToBytes(value));
  if (isPostConditionObject(value)) {
    // round-trip through the wire format to validate it
    return wireToPostCondition(postConditionToWire(value));
  }
  throw new Error('unrecognized post-condition');
}

function jsonClarityArg(value: unknown): ClarityValue {
  if (typeof value === 'string') return decodeClarity(hexToBytes(value));
  throw new Error('function args must be hex-serialized Clarity values');
}

function jsonNetwork(value: unknown): TxNetwork | null {
  const name = typeof value === 'string' ? value : (asRecord(value)?.chainId ?? null);
  if (name === 'mainnet' || name === 1) return 'mainnet';
  if (name === 'testnet' || name === 'devnet' || typeof name === 'number') {
    return 'testnet';
  }
  return null;
}

function jsonMode(value: unknown): PostConditionModeName | null {
  if (value === 'allow' || value === PostConditionMode.Allow) return 'allow';
  if (value === 'deny' || value === PostConditionMode.Deny) return 'deny';
  return null;
}

/** Decode a `stx_callContract`-style request object. */
function decodeCallRequest(record: Record<string, unknown>): CallRequest {
  const contract =
    typeof record.contract === 'string'
      ? record.contract
      : `${String(record.contractAddress)}.${String(record.contractName)}`;
  const functionName = record.functionName;
  if (typeof functionName !== 'string') {
    throw new Error('call request is missing functionName');
  }
  const args = Array.isArray(record.functionArgs) ? record.functionArgs : [];
  const pcs = Array.isArray(record.postConditions) ? record.postConditions : [];
  return {
    network: jsonNetwork(record.network),
    call: {
      kind: 'contract-call',
      contractId: contract,
      functionName,
      args: args.map(jsonClarityArg),
    },
    postConditionMode: jsonMode(record.postConditionMode),
    postConditions: pcs.map(jsonPostCondition),
  };
}

function decodeJsonValue(value: unknown, mode: DecodeMode): DecodedItem {
  if (typeof value === 'string') return decodeHex(value, mode);
  if (Array.isArray(value)) {
    return {
      kind: 'post-conditions',
      postConditions: value.map(jsonPostCondition),
    };
  }
  const record = asRecord(value);
  if (!record) throw new Error('unsupported JSON value');
  if (isPostConditionObject(record)) {
    return { kind: 'post-condition', postCondition: jsonPostCondition(record) };
  }
  if ('functionName' in record) {
    return { kind: 'call-request', request: decodeCallRequest(record) };
  }
  const params = asRecord(record.params);
  if (params && 'functionName' in params) {
    return { kind: 'call-request', request: decodeCallRequest(params) };
  }
  throw new Error('unrecognized JSON shape');
}

function decodeOne(source: string, mode: DecodeMode): DecodeEntry {
  try {
    const trimmed = source.trim();
    const isJson = trimmed.startsWith('{') || trimmed.startsWith('[');
    const item = isJson ? decodeJsonValue(JSON.parse(trimmed), mode) : decodeHex(trimmed, mode);
    return { status: 'ok', source: trimmed, item };
  } catch (error) {
    return {
      status: 'error',
      source: source.trim(),
      message: errorMessage(error),
    };
  }
}

const VALUE_SEPARATOR = /[\s,]+/;
const QUOTES = /^["'`]|["'`]$/g;

/**
 * Decode pasted input. The whole input is tried first; if that fails, each
 * whitespace- or comma-separated value is decoded on its own, so several args or
 * post-conditions can be pasted at once.
 */
export function decodeInput(input: string, mode: DecodeMode): DecodeEntry[] {
  if (input.trim().length === 0) return [];
  const whole = decodeOne(input, mode);
  if (whole.status === 'ok') return [whole];
  const parts = input
    .split(VALUE_SEPARATOR)
    .map(part => part.trim().replace(QUOTES, ''))
    .filter(part => part.length > 0);
  if (parts.length <= 1) return [whole];
  return parts.map(part => decodeOne(part, mode));
}

export type Warning = { level: 'danger' | 'warn' | 'info'; message: string };

const HIGH_FEE_USTX = 5_000_000n;

function principalNetwork(principal: string): TxNetwork | null {
  const prefix = principal.slice(0, 2).toUpperCase();
  if (prefix === 'SP' || prefix === 'SM') return 'mainnet';
  if (prefix === 'ST' || prefix === 'SN') return 'testnet';
  return null;
}

export function collectPrincipals(value: ClarityValue): string[] {
  switch (value.type) {
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return [principalToString(value)];
    case ClarityType.OptionalSome:
    case ClarityType.ResponseOk:
    case ClarityType.ResponseErr:
      return collectPrincipals(value.value);
    case ClarityType.List:
      return value.value.flatMap(collectPrincipals);
    case ClarityType.Tuple:
      return Object.values(value.value).flatMap(collectPrincipals);
    default:
      return [];
  }
}

function networkWarnings(network: TxNetwork, principals: string[]): Warning[] {
  const mismatched = [
    ...new Set(
      principals.filter(p => {
        const detected = principalNetwork(p);
        return detected !== null && detected !== network;
      })
    ),
  ];
  return mismatched.map(principal => ({
    level: 'danger',
    message: `${principal} is not a ${network} address`,
  }));
}

function postConditionWarnings(
  mode: PostConditionModeName | null,
  postConditions: PostCondition[]
): Warning[] {
  if (mode === 'allow') {
    return [
      {
        level: 'danger',
        message:
          'post-condition mode is ALLOW: the transaction can transfer any assets, not just those listed',
      },
    ];
  }
  if (mode === 'deny' && postConditions.length === 0) {
    return [
      {
        level: 'info',
        message: 'deny mode with no post-conditions: no assets may leave any account',
      },
    ];
  }
  return [];
}

function payloadPrincipals(payload: TxPayload): string[] {
  if (payload.kind === 'contract-call') {
    return [payload.contractId, ...payload.args.flatMap(collectPrincipals)];
  }
  if (payload.kind === 'token-transfer') return [payload.recipient];
  return [];
}

export function transactionWarnings(tx: DecodedTransaction): Warning[] {
  const warnings: Warning[] = [
    ...postConditionWarnings(tx.postConditionMode, tx.postConditions),
    ...networkWarnings(tx.network, [
      ...payloadPrincipals(tx.payload),
      ...tx.postConditions.map(pc => pc.address).filter(a => a !== 'origin'),
    ]),
  ];
  if (tx.origin.fee >= HIGH_FEE_USTX || (tx.sponsor?.fee ?? 0n) >= HIGH_FEE_USTX) {
    warnings.push({ level: 'warn', message: 'fee is unusually high' });
  }
  if (tx.sponsored) {
    warnings.push({
      level: 'info',
      message: 'sponsored transaction: the sponsor pays the fee',
    });
  }
  if (tx.origin.signed) {
    warnings.push({
      level: 'info',
      message: 'origin has already signed this transaction',
    });
  }
  return warnings;
}

export function callRequestWarnings(request: CallRequest): Warning[] {
  return [
    ...postConditionWarnings(request.postConditionMode, request.postConditions),
    ...(request.network ? networkWarnings(request.network, payloadPrincipals(request.call)) : []),
  ];
}

export function payloadWarnings(payload: TxPayload, network: TxNetwork | null): Warning[] {
  return [
    {
      level: 'info',
      message: 'payload only: sender, fee, nonce, and post-conditions are not included',
    },
    ...(network ? networkWarnings(network, payloadPrincipals(payload)) : []),
  ];
}
