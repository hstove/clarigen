import { Cl, cvToHex } from '@stacks/transactions';
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
        hashbytes: Cl.buffer(
          hexToBytes('0x751e76e8199196d454941c45d1b3a323f1433bd6')
        ),
      })
    ),
  },
  {
    label: 'ok list',
    hex: cvToHex(Cl.ok(Cl.list([Cl.uint(1), Cl.uint(2), Cl.uint(3)]))),
  },
] as const;
