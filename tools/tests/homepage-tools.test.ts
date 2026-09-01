import { describe, expect, it } from 'vitest';
import { normalizeHex, stripHexPrefix } from '../src/lib/hex';
import { normalizeTxid } from '../src/lib/txid';
import {
  btcAddressToPoxTuple,
  poxTupleToBtcAddress,
} from '../src/lib/pox-address';
import { hexToCV } from '@stacks/transactions';
import { cvToString } from '@clarigen/core';
import { DECODER_EXAMPLES } from '../src/lib/decoder-examples';

describe('normalizeTxid', () => {
  const raw =
    'a5a59ef2961ac000efb78128e35a7a0b0ef3528ad6fd293be39cd1fcb8901682';
  const prefixed = `0x${raw}`;

  it('adds a 0x prefix when missing', () => {
    expect(normalizeTxid(raw)).toBe(prefixed);
  });

  it('keeps an existing 0x prefix', () => {
    expect(normalizeTxid(prefixed)).toBe(prefixed);
  });

  it('lowercases and strips whitespace', () => {
    expect(normalizeTxid(`  0x${raw.toUpperCase()}  `)).toBe(prefixed);
  });

  it('rejects the wrong length', () => {
    expect(() => normalizeTxid('0xabcd')).toThrow('32 bytes');
  });
});

describe('normalizeHex', () => {
  it('strips whitespace and adds 0x', () => {
    expect(normalizeHex('0a 0b')).toBe('0x0a0b');
    expect(stripHexPrefix('0x0A0B')).toBe('0A0B');
  });
});

describe('pox address conversion', () => {
  const p2wpkh = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4';
  const p2pkh = '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH';
  const hash = '0x751e76e8199196d454941c45d1b3a323f1433bd6';

  it('decodes p2wpkh into version 0x04 and hashbytes', () => {
    const decoded = btcAddressToPoxTuple(p2wpkh);
    expect(decoded.version).toBe(0x04);
    expect(decoded.versionHex).toBe('0x04');
    expect(decoded.hashbytesHex).toBe(hash);
    expect(decoded.addressType).toBe('p2wpkh');
    expect(decoded.network).toBe('mainnet');
  });

  it('decodes p2pkh into version 0x00 and the same hashbytes', () => {
    const decoded = btcAddressToPoxTuple(p2pkh);
    expect(decoded.version).toBe(0x00);
    expect(decoded.hashbytesHex).toBe(hash);
    expect(decoded.addressType).toBe('p2pkh');
  });

  it('encodes a p2wpkh tuple back to the same address', () => {
    const { address } = poxTupleToBtcAddress('0x04', hash, 'mainnet');
    expect(address).toBe(p2wpkh);
  });

  it('encodes a p2pkh tuple back to the same address', () => {
    const { address } = poxTupleToBtcAddress('00', hash.slice(2), 'mainnet');
    expect(address).toBe(p2pkh);
  });

  it('round-trips p2tr', () => {
    const hash32 =
      '0x751e76e8199196d454941c45d1b3a323f1433bd6751e76e8199196d454941c45';
    const { address, decoded } = poxTupleToBtcAddress('0x06', hash32, 'mainnet');
    expect(address.startsWith('bc1p')).toBe(true);
    const back = btcAddressToPoxTuple(address);
    expect(back.version).toBe(0x06);
    expect(back.hashbytesHex).toBe(decoded.hashbytesHex);
    expect(back.address).toBe(address);
  });

  it('round-trips testnet p2wpkh', () => {
    const { address } = poxTupleToBtcAddress('0x04', hash, 'testnet');
    expect(address.startsWith('tb1q')).toBe(true);
    const back = btcAddressToPoxTuple(address);
    expect(back.network).toBe('testnet');
    expect(back.hashbytesHex).toBe(hash);
  });
});

describe('decoder examples', () => {
  it('deserialize to the expected clarity literals', () => {
    expect(cvToString(hexToCV(DECODER_EXAMPLES[0].hex))).toBe('u42');
    expect(cvToString(hexToCV(DECODER_EXAMPLES[2].hex))).toBe(
      '(ok (list u1 u2 u3))'
    );
  });
});
