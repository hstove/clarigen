import { Cl, cvToHex, Pc, postConditionToHex } from '@stacks/transactions';
import { hexToBytes } from './hex';

export const DECODER_EXAMPLES = [
  {
    label: 'uint',
    hex: cvToHex(Cl.uint(42)),
  },
  {
    label: 'tuple',
    hex: cvToHex(
      Cl.tuple({
        version: Cl.buffer(Uint8Array.from([0x04])),
        hashbytes: Cl.buffer(hexToBytes('0x751e76e8199196d454941c45d1b3a323f1433bd6')),
      })
    ),
  },
  {
    label: 'ok list',
    hex: cvToHex(Cl.ok(Cl.list([Cl.uint(1), Cl.uint(2), Cl.uint(3)]))),
  },
] as const;

const SETUP_BOND_TX =
  '0x000000000104000e26d303a4a793e36bf0c72decee74b370dbcddc000000000000000400000000000004490001eebfdeacd2a83f67dc66fa580ef85f57cab06c1b17c0008e8671ef5ee2d432e27dbcd07d523b1cc3b464191e2783079310fbb301e8e201df68a2e61662beda650301000000000216000000000000000000000000000000000000000005706f782d350a73657475702d626f6e64000000060100000000000000000000000000000002010000000000000000000000000000012c010000000000000000000000000004147801000000000000000000000000000001f402000000232102fd9c38fb020cb9efe3f89f80cc118a27272828c477eaa0a5a6d7403ee8d8fc45ac0b000000030c00000002086d61782d736174730100000000000000000000000000989680067374616b65720516b4c3fa8d89cfa2c2c40f0d2fcc773aa4107e43370c00000002086d61782d736174730100000000000000000000000b3ee78300067374616b65720616099fb88926d82f30b2f40eaf3ee423cb725bdb3b1673746274632d7374616b65722d626f6e642d322d76320c00000002086d61782d736174730100000000000000000000000083215600067374616b65720616111984c0f34b08f6c64ee0a0698755e41e918de015736274632d626f6e642d7374616b65722d76312d32';

const EXAMPLE_SENDER = 'SP72DMR3MJKS7RVBY33JVV7EEJSQ1PYDVKDP10FX';
const EXAMPLE_STX_PC = Pc.principal(EXAMPLE_SENDER).willSendLte(1_000_000).ustx();

export const TX_DECODER_EXAMPLES = [
  { label: 'pox-5 setup-bond tx', input: SETUP_BOND_TX },
  {
    label: 'txid',
    input: '0x0325239e1444936f22610055a7cd161e6a7055c7b7eeac336c6e772b1d9df3d0',
  },
  {
    label: 'args (one per line)',
    input: [
      cvToHex(Cl.uint(300)),
      cvToHex(
        Cl.bufferFromHex('2102fd9c38fb020cb9efe3f89f80cc118a27272828c477eaa0a5a6d7403ee8d8fc45ac')
      ),
      cvToHex(Cl.principal(`${EXAMPLE_SENDER}`)),
    ].join('\n'),
  },
  { label: 'post-condition', input: postConditionToHex(EXAMPLE_STX_PC) },
  {
    label: 'stx_callContract request',
    input: JSON.stringify(
      {
        contract: 'SP000000000000000000002Q6VF78.pox-5',
        functionName: 'setup-bond',
        functionArgs: [cvToHex(Cl.uint(2)), cvToHex(Cl.uint(300))],
        postConditions: [EXAMPLE_STX_PC],
        postConditionMode: 'deny',
        network: 'mainnet',
      },
      null,
      2
    ),
  },
] as const;
