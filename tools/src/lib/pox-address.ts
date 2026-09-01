import { bech32, bech32m, createBase58check } from '@scure/base';
import { sha256 } from '@noble/hashes/sha2.js';
import { Cl } from '@stacks/transactions';
import { cvToString } from '@clarigen/core';
import { bytesToHex, hexToBytes, stripHexPrefix } from './hex';

const b58 = createBase58check(sha256);

export type BtcNetwork = 'mainnet' | 'testnet';

export const PoXAddressVersion = {
  P2PKH: 0x00,
  P2SH: 0x01,
  P2SHP2WPKH: 0x02,
  P2SHP2WSH: 0x03,
  P2WPKH: 0x04,
  P2WSH: 0x05,
  P2TR: 0x06,
} as const;

export type PoXAddressVersionNumber =
  (typeof PoXAddressVersion)[keyof typeof PoXAddressVersion];

const BITCOIN_VERSION = {
  mainnet: { P2PKH: 0x00, P2SH: 0x05 },
  testnet: { P2PKH: 0x6f, P2SH: 0xc4 },
} as const;

const SEGWIT_PREFIX: Record<BtcNetwork, 'bc' | 'tb'> = {
  mainnet: 'bc',
  testnet: 'tb',
};

const SEGWIT_V0 = 0;
const SEGWIT_V1 = 1;

export const POX_VERSION_LABELS: Record<number, string> = {
  [PoXAddressVersion.P2PKH]: 'p2pkh',
  [PoXAddressVersion.P2SH]: 'p2sh',
  [PoXAddressVersion.P2SHP2WPKH]: 'p2sh-p2wpkh',
  [PoXAddressVersion.P2SHP2WSH]: 'p2sh-p2wsh',
  [PoXAddressVersion.P2WPKH]: 'p2wpkh',
  [PoXAddressVersion.P2WSH]: 'p2wsh',
  [PoXAddressVersion.P2TR]: 'p2tr',
};

export type PoxAddressDecoded = {
  version: number;
  versionHex: string;
  hashbytes: Uint8Array;
  hashbytesHex: string;
  addressType: string;
  network: BtcNetwork;
  address: string;
  clarity: string;
};

function versionHex(version: number): string {
  return `0x${version.toString(16).padStart(2, '0')}`;
}

function hashLenForVersion(version: number): 20 | 32 {
  if (
    version === PoXAddressVersion.P2WSH ||
    version === PoXAddressVersion.P2TR
  ) {
    return 32;
  }
  return 20;
}

function bitcoinVersionToPoxVersion(btcVersion: number): {
  version: number;
  network: BtcNetwork;
} {
  if (btcVersion === BITCOIN_VERSION.mainnet.P2PKH) {
    return { version: PoXAddressVersion.P2PKH, network: 'mainnet' };
  }
  if (btcVersion === BITCOIN_VERSION.testnet.P2PKH) {
    return { version: PoXAddressVersion.P2PKH, network: 'testnet' };
  }
  if (btcVersion === BITCOIN_VERSION.mainnet.P2SH) {
    return { version: PoXAddressVersion.P2SH, network: 'mainnet' };
  }
  if (btcVersion === BITCOIN_VERSION.testnet.P2SH) {
    return { version: PoXAddressVersion.P2SH, network: 'testnet' };
  }
  throw new Error(`unsupported bitcoin address version 0x${btcVersion.toString(16)}`);
}

function poxVersionToBitcoinVersion(
  version: number,
  network: BtcNetwork
): number {
  switch (version) {
    case PoXAddressVersion.P2PKH:
      return BITCOIN_VERSION[network].P2PKH;
    case PoXAddressVersion.P2SH:
    case PoXAddressVersion.P2SHP2WPKH:
    case PoXAddressVersion.P2SHP2WSH:
      return BITCOIN_VERSION[network].P2SH;
    default:
      throw new Error('not a legacy pox address version');
  }
}

function isSegwitAddress(address: string): boolean {
  const lower = address.toLowerCase();
  return (
    lower.startsWith('bc1') ||
    lower.startsWith('tb1') ||
    lower.startsWith('bcrt1')
  );
}

function networkFromHrp(hrp: string): BtcNetwork {
  if (hrp === 'bc') return 'mainnet';
  if (hrp === 'tb' || hrp === 'bcrt') return 'testnet';
  throw new Error(`unsupported bech32 prefix ${hrp}`);
}

function segwitVersionToPoxVersion(
  witnessVersion: number,
  dataLength: number
): number {
  if (witnessVersion === SEGWIT_V0 && dataLength === 20) {
    return PoXAddressVersion.P2WPKH;
  }
  if (witnessVersion === SEGWIT_V0 && dataLength === 32) {
    return PoXAddressVersion.P2WSH;
  }
  if (witnessVersion === SEGWIT_V1 && dataLength === 32) {
    return PoXAddressVersion.P2TR;
  }
  throw new Error(
    'unsupported native segwit address; expected p2wpkh, p2wsh, or p2tr'
  );
}

function decodeNativeSegwit(address: string): {
  witnessVersion: number;
  data: Uint8Array;
  network: BtcNetwork;
} {
  const lower = address.toLowerCase();
  if (lower.startsWith('bc1p') || lower.startsWith('tb1p') || lower.startsWith('bcrt1p')) {
    const decoded = bech32m.decode(address as `${string}1${string}`);
    const witnessVersion = decoded.words[0];
    if (witnessVersion === undefined || witnessVersion === SEGWIT_V0) {
      throw new Error('taproot addresses must use bech32m with witness version 1');
    }
    return {
      witnessVersion,
      data: bech32m.fromWords(decoded.words.slice(1)),
      network: networkFromHrp(decoded.prefix),
    };
  }

  const decoded = bech32.decode(address as `${string}1${string}`);
  const witnessVersion = decoded.words[0];
  if (witnessVersion === undefined) {
    throw new Error('invalid bech32 address');
  }
  if (witnessVersion > 0) {
    throw new Error('addresses with witness version >= 1 should be encoded in bech32m');
  }
  return {
    witnessVersion,
    data: bech32.fromWords(decoded.words.slice(1)),
    network: networkFromHrp(decoded.prefix),
  };
}

export function poxTupleClarity(version: number, hashbytes: Uint8Array) {
  return Cl.tuple({
    version: Cl.buffer(Uint8Array.from([version])),
    hashbytes: Cl.buffer(hashbytes),
  });
}

export function poxTupleString(version: number, hashbytes: Uint8Array): string {
  return cvToString(poxTupleClarity(version, hashbytes), { indent: 2 });
}

function toDecoded(args: {
  version: number;
  hashbytes: Uint8Array;
  network: BtcNetwork;
  address: string;
}): PoxAddressDecoded {
  const { version, hashbytes, network, address } = args;
  return {
    version,
    versionHex: versionHex(version),
    hashbytes,
    hashbytesHex: bytesToHex(hashbytes),
    addressType: POX_VERSION_LABELS[version] ?? `version ${version}`,
    network,
    address,
    clarity: poxTupleString(version, hashbytes),
  };
}

/** Decode a BTC address into the pox-addr `{ version, hashbytes }` tuple. */
export function btcAddressToPoxTuple(address: string): PoxAddressDecoded {
  const trimmed = address.replace(/\s+/g, '');
  if (trimmed.length === 0) {
    throw new Error('address is empty');
  }

  try {
    if (isSegwitAddress(trimmed)) {
      const { witnessVersion, data, network } = decodeNativeSegwit(trimmed);
      const version = segwitVersionToPoxVersion(witnessVersion, data.length);
      return toDecoded({ version, hashbytes: data, network, address: trimmed });
    }

    const decoded = b58.decode(trimmed);
    const btcVersion = decoded[0];
    if (btcVersion === undefined) {
      throw new Error('invalid base58 address');
    }
    const hashbytes = decoded.slice(1);
    const { version, network } = bitcoinVersionToPoxVersion(btcVersion);
    if (hashbytes.length !== 20) {
      throw new Error('legacy bitcoin addresses must have a 20-byte hash');
    }
    return toDecoded({ version, hashbytes, network, address: trimmed });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('unsupported')) {
      throw error;
    }
    throw new Error(`invalid bitcoin address: ${trimmed}`);
  }
}

export function parsePoxVersionHex(input: string): number {
  const stripped = stripHexPrefix(input);
  if (stripped.length === 0) {
    throw new Error('version is empty');
  }
  const padded = stripped.length % 2 === 0 ? stripped : `0${stripped}`;
  const bytes = hexToBytes(padded);
  if (bytes.length !== 1) {
    throw new Error('version must be 1 byte');
  }
  const version = bytes[0];
  if (version === undefined) {
    throw new Error('version must be 1 byte');
  }
  if (!(version in POX_VERSION_LABELS)) {
    throw new Error('version must be 0x00–0x06');
  }
  return version;
}

export function parseHashbytesHex(input: string): Uint8Array {
  return hexToBytes(input);
}

/** Encode a pox-addr `{ version, hashbytes }` tuple as a BTC address. */
export function poxTupleToBtcAddress(
  versionInput: string,
  hashbytesInput: string,
  network: BtcNetwork
): { address: string; decoded: PoxAddressDecoded } {
  const version = parsePoxVersionHex(versionInput);
  const hashbytes = parseHashbytesHex(hashbytesInput);
  const expectedLen = hashLenForVersion(version);
  if (hashbytes.length !== expectedLen) {
    throw new Error(
      `${POX_VERSION_LABELS[version]} hashbytes must be ${expectedLen} bytes`
    );
  }

  let address: string;
  switch (version) {
    case PoXAddressVersion.P2PKH:
    case PoXAddressVersion.P2SH:
    case PoXAddressVersion.P2SHP2WPKH:
    case PoXAddressVersion.P2SHP2WSH: {
      const btcVersion = poxVersionToBitcoinVersion(version, network);
      const payload = new Uint8Array(1 + hashbytes.length);
      payload[0] = btcVersion;
      payload.set(hashbytes, 1);
      address = b58.encode(payload);
      break;
    }
    case PoXAddressVersion.P2WPKH:
    case PoXAddressVersion.P2WSH: {
      const words = bech32.toWords(hashbytes);
      address = bech32.encode(SEGWIT_PREFIX[network], [SEGWIT_V0, ...words]);
      break;
    }
    case PoXAddressVersion.P2TR: {
      const words = bech32m.toWords(hashbytes);
      address = bech32m.encode(SEGWIT_PREFIX[network], [SEGWIT_V1, ...words]);
      break;
    }
    default:
      throw new Error(`unexpected address version: ${version}`);
  }

  return {
    address,
    decoded: toDecoded({ version, hashbytes, network, address }),
  };
}
