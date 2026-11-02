import { describe, expect, it } from 'vitest';
import { Cl, cvToHex, Pc, postConditionToHex } from '@stacks/transactions';
import { cvToString } from '@clarigen/core';
import { decodeInput, transactionWarnings } from '../src/lib/tx-decode';
import { bufferHints, integerHints } from '../src/lib/value-hints';

const SETUP_BOND_TX =
  '0x000000000104000e26d303a4a793e36bf0c72decee74b370dbcddc000000000000000400000000000004490001eebfdeacd2a83f67dc66fa580ef85f57cab06c1b17c0008e8671ef5ee2d432e27dbcd07d523b1cc3b464191e2783079310fbb301e8e201df68a2e61662beda650301000000000216000000000000000000000000000000000000000005706f782d350a73657475702d626f6e64000000060100000000000000000000000000000002010000000000000000000000000000012c010000000000000000000000000004147801000000000000000000000000000001f402000000232102fd9c38fb020cb9efe3f89f80cc118a27272828c477eaa0a5a6d7403ee8d8fc45ac0b000000030c00000002086d61782d736174730100000000000000000000000000989680067374616b65720516b4c3fa8d89cfa2c2c40f0d2fcc773aa4107e43370c00000002086d61782d736174730100000000000000000000000b3ee78300067374616b65720616099fb88926d82f30b2f40eaf3ee423cb725bdb3b1673746274632d7374616b65722d626f6e642d322d76320c00000002086d61782d736174730100000000000000000000000083215600067374616b65720616111984c0f34b08f6c64ee0a0698755e41e918de015736274632d626f6e642d7374616b65722d76312d32';

const SENDER = 'SP72DMR3MJKS7RVBY33JVV7EEJSQ1PYDVKDP10FX';

function only(input: string, mode: Parameters<typeof decodeInput>[1] = 'auto') {
  const entries = decodeInput(input, mode);
  if (entries.length !== 1) throw new Error(`got ${entries.length} entries`);
  const [entry] = entries;
  if (entry?.status !== 'ok') throw new Error(entry?.message);
  return entry.item;
}

describe('decodeInput', () => {
  it('decodes a full contract-call transaction', () => {
    const item = only(SETUP_BOND_TX);
    if (item.kind !== 'transaction') throw new Error(item.kind);
    const { tx } = item;
    expect(tx.network).toBe('mainnet');
    expect(tx.origin.address).toBe(SENDER);
    expect(tx.origin.nonce).toBe(4n);
    expect(tx.origin.fee).toBe(1097n);
    expect(tx.origin.signed).toBe(true);
    expect(tx.postConditionMode).toBe('allow');
    expect(tx.txid).toBe('0x0325239e1444936f22610055a7cd161e6a7055c7b7eeac336c6e772b1d9df3d0');
    if (tx.payload.kind !== 'contract-call') throw new Error(tx.payload.kind);
    expect(tx.payload.contractId).toBe('SP000000000000000000002Q6VF78.pox-5');
    expect(tx.payload.functionName).toBe('setup-bond');
    expect(tx.payload.args.map(a => cvToString(a)).slice(0, 2)).toEqual(['u2', 'u300']);
    const messages = transactionWarnings(tx).map(w => w.level);
    expect(messages).toContain('danger');
  });

  it('decodes a bare contract-call payload', () => {
    const payloadHex = SETUP_BOND_TX.slice(SETUP_BOND_TX.indexOf('0216000000'));
    const item = only(payloadHex);
    if (item.kind !== 'payload') throw new Error(item.kind);
    expect(item.network).toBe('mainnet');
    expect(item.payload.kind).toBe('contract-call');
  });

  it('decodes a single clarity arg', () => {
    const item = only(cvToHex(Cl.uint(300)));
    expect(item.kind).toBe('clarity');
  });

  it('decodes one arg per line', () => {
    const input = [cvToHex(Cl.uint(1)), cvToHex(Cl.stringAscii('hi'))].join('\n');
    const entries = decodeInput(input, 'auto');
    expect(entries.map(e => e.status === 'ok' && e.item.kind)).toEqual(['clarity', 'clarity']);
  });

  it('decodes space-separated values', () => {
    const input = `${cvToHex(Cl.uint(1))} ${cvToHex(Cl.bool(true))}`;
    expect(decodeInput(input, 'auto')).toHaveLength(2);
  });

  it('decodes a post-condition hex', () => {
    const pc = Pc.principal(SENDER).willSendLte(1000).ustx();
    const item = only(postConditionToHex(pc));
    expect(item).toEqual({
      kind: 'post-condition',
      postCondition: { ...pc, amount: '1000' },
    });
  });

  it('decodes a stx_callContract request', () => {
    const pc = Pc.principal(SENDER).willSendEq(5).ustx();
    const item = only(
      JSON.stringify({
        contract: 'SP000000000000000000002Q6VF78.pox-5',
        functionName: 'setup-bond',
        functionArgs: [cvToHex(Cl.uint(2))],
        postConditions: [postConditionToHex(pc), pc],
        postConditionMode: 'deny',
        network: 'mainnet',
      })
    );
    if (item.kind !== 'call-request') throw new Error(item.kind);
    expect(item.request.postConditions).toHaveLength(2);
    expect(item.request.call.args).toHaveLength(1);
  });

  it('detects a txid', () => {
    const item = only('0x0325239e1444936f22610055a7cd161e6a7055c7b7eeac336c6e772b1d9df3d0');
    expect(item.kind).toBe('txid');
  });

  it('reports garbage as an error', () => {
    const [entry] = decodeInput('0xzz', 'auto');
    expect(entry?.status).toBe('error');
  });
});

describe('value hints', () => {
  it('disassembles a p2pk script buffer', () => {
    const hints = bufferHints(
      '2102fd9c38fb020cb9efe3f89f80cc118a27272828c477eaa0a5a6d7403ee8d8fc45ac'
    );
    expect(hints.find(h => h.label === 'btc script')?.value).toBe(
      '02fd9c38fb020cb9efe3f89f80cc118a27272828c477eaa0a5a6d7403ee8d8fc45 OP_CHECKSIG'
    );
  });

  it('scales large integers', () => {
    expect(integerHints(48_300_000_000n)).toEqual([
      '48,300,000,000',
      '48,300 @ 6 dec (STX)',
      '483 @ 8 dec (BTC)',
    ]);
    expect(integerHints(300n)).toEqual([]);
  });
});
