import { project, contracts } from './generated/clarigen-types';
import { projectFactory, rawClarityToValue, ResponseType } from '../src';
import { describe, test, it, expect } from 'vitest';

// const contracts = projectFactory(project, 'simnet');

describe('parsing raw clarity values', () => {
  it('uint', () => {
    const value = rawClarityToValue<bigint>('u111', 'uint128');
    expect(value).toEqual(111n);
  });

  it('tuple', () => {
    const type = contracts.tester.functions.getTup.outputs.type;
    const value = rawClarityToValue<
      ResponseType<(typeof contracts)['tester']['functions']['getTup']>
    >(
      `{
      a: u1,
      bool-prop: true,
      tuple-prop: {
        sub-prop: "asdf"
      }
    }`,
      type
    );
    expect(value).toEqual({
      a: 1n,
      boolProp: true,
      tupleProp: {
        subProp: 'asdf',
      },
    });
  });
});
