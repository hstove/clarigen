import { serialize } from '../src/files/base';
import { expect, test } from 'vitest';

test('can serialize a uint8array', () => {
  const arr = new Uint8Array([1, 2, 3, 4]);
  const serialized = serialize(arr);
  expect(serialized).toEqual('Uint8Array.from([1,2,3,4])');
  // biome-ignore lint/security/noGlobalEval: ignored using `--suppress`
  expect(eval(serialized)).toEqual(arr);
});
