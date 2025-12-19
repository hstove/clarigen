import { getTypeString, cvToString } from '../src/clarity-types';
import type { ClarityAbiType } from '../src/abi-types';
import { responseOkCV, tupleCV, uintCV, listCV } from '@stacks/transactions';
import { expect, it, describe } from 'vitest';

describe('cvToString', () => {
  it('formats tuples correctly', () => {
    const cv = tupleCV({
      a: uintCV(1),
      b: responseOkCV(uintCV(2)),
    });
    expect(cvToString(cv)).toEqual('{ a: u1, b: (ok u2) }');
  });

  it('keeps lists as they are', () => {
    const cv = listCV([uintCV(1), uintCV(2)]);
    expect(cvToString(cv)).toEqual('(list u1 u2)');
  });

  it('handles nested tuples and lists', () => {
    const cv = tupleCV({
      a: listCV([uintCV(1)]),
      b: tupleCV({ c: uintCV(2) }),
    });
    expect(cvToString(cv)).toEqual('{ a: (list u1), b: { c: u2 } }');
  });

  it('pretty-indents tuples', () => {
    const cv = tupleCV({
      a: uintCV(1),
      b: tupleCV({
        c: uintCV(2),
      }),
    });
    const expected = `{
  a: u1,
  b: {
    c: u2
  }
}`;
    expect(cvToString(cv, { indent: 2 })).toEqual(expected);
  });
});

describe('getTypeString', () => {
  it('formats tuples correctly', () => {
    const abi: ClarityAbiType = {
      tuple: [
        { name: 'a', type: 'uint128' },
        { name: 'b', type: { response: { ok: 'uint128', error: 'int128' } } },
      ],
    };
    expect(getTypeString(abi)).toEqual('{ a: uint, b: (response uint int) }');
  });

  it('keeps lists as they are', () => {
    const abi: ClarityAbiType = {
      list: { type: 'uint128', length: 10 },
    };
    expect(getTypeString(abi)).toEqual('(list 10 uint)');
  });

  it('handles nested types', () => {
    const abi: ClarityAbiType = {
      tuple: [
        { name: 'a', type: { list: { type: 'uint128', length: 5 } } },
        { name: 'b', type: { tuple: [{ name: 'c', type: 'bool' }] } },
      ],
    };
    expect(getTypeString(abi)).toEqual('{ a: (list 5 uint), b: { c: bool } }');
  });
});
