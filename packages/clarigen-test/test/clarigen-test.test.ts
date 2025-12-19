import { it } from 'vitest';
import { boolCV } from '@stacks/transactions';
import {
  type ClarityValue as HiroClarityValue,
  deserializeCV as deserializeCVHiro,
} from '@stacks/transactions';
import {
  type ClarityValue as MSClarityValue,
  serializeCV as serializeCVMS,
} from '@stacks/transactions';
import * as Hiro from '@stacks/transactions';

// biome-ignore lint/suspicious/noExportsInTest: ignored using `--suppress`
export function cvConvert(value: MSClarityValue | HiroClarityValue) {
  return deserializeCVHiro(serializeCVMS(value as unknown as MSClarityValue));
}

// it('works fine for all MS clarity types', () => {
//   cvConvert(MS.uintCV(1n));
//   cvConvert(MS.intCV(1n));
//   cvConvert(MS.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'));
//   cvConvert(MS.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.asdf'));
//   cvConvert(MS.boolCV(true));
//   cvConvert(MS.stringAsciiCV('asdf'));
//   cvConvert(MS.stringUtf8CV('asdf'));
//   cvConvert(MS.optionalCVOf(boolCV(true)));
//   cvConvert(MS.bufferCV(Buffer.from('asdf')));
//   cvConvert(MS.responseOkCV(boolCV(true)));
//   cvConvert(MS.responseErrorCV(boolCV(true)));
//   cvConvert(MS.listCV([boolCV(true)]));
//   cvConvert(
//     MS.tupleCV({
//       a: boolCV(true),
//     })
//   );

//   serializeCVHiro(MS.uintCV(1n));
//   serializeCVHiro(MS.intCV(1n));
//   // These are broken
//   // serializeCVHiro(MS.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'));
//   // serializeCVHiro(MS.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.asdf'));
//   serializeCVHiro(MS.boolCV(true));
//   serializeCVHiro(MS.stringAsciiCV('asdf'));
//   serializeCVHiro(MS.stringUtf8CV('asdf'));
//   serializeCVHiro(MS.optionalCVOf(boolCV(true)));
//   serializeCVHiro(MS.bufferCV(Buffer.from('asdf')));
//   serializeCVHiro(MS.responseOkCV(boolCV(true)));
//   serializeCVHiro(MS.responseErrorCV(boolCV(true)));
//   serializeCVHiro(MS.listCV([boolCV(true)]));
//   serializeCVHiro(
//     MS.tupleCV({
//       a: boolCV(true),
//     })
//   );
// });

it('works fine for all Hiro clarity types', () => {
  cvConvert(Hiro.uintCV(1n));
  cvConvert(Hiro.intCV(1n));
  cvConvert(Hiro.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'));
  cvConvert(Hiro.principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.asdf'));
  cvConvert(Hiro.boolCV(true));
  cvConvert(Hiro.stringAsciiCV('asdf'));
  cvConvert(Hiro.stringUtf8CV('asdf'));
  cvConvert(Hiro.optionalCVOf(boolCV(true)));
  cvConvert(Hiro.bufferCV(Uint8Array.from([1, 2, 3])));
  cvConvert(Hiro.responseOkCV(boolCV(true)));
  cvConvert(Hiro.responseErrorCV(boolCV(true)));
  cvConvert(Hiro.listCV([boolCV(true)]));
  cvConvert(
    Hiro.tupleCV({
      a: boolCV(true),
    })
  );
});
