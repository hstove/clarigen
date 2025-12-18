import {
  ClarityAbiType,
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiList,
} from '@clarigen/core';
import { Cl } from '@stacks/transactions';

export const MAX_UINT128 = 2n ** 128n - 1n;
export const MAX_INT128 = 2n ** 127n - 1n;
export const MIN_INT128 = -(2n ** 127n);

export type ValidatorFn = (value: any) => string | undefined;

export function getClarityValidators(type: ClarityAbiType) {
  const validators: ValidatorFn[] = [];

  if (isClarityAbiPrimitive(type)) {
    if (type === 'uint128') {
      validators.push((val: string) => {
        if (!val) return 'Required';
        try {
          const b = BigInt(val);
          if (b < 0n) return 'Must be non-negative';
          if (b > MAX_UINT128) return 'Exceeds uint128 maximum';
        } catch {
          return 'Invalid unsigned integer';
        }
      });
    } else if (type === 'int128') {
      validators.push((val: string) => {
        if (!val) return 'Required';
        try {
          const b = BigInt(val);
          if (b < MIN_INT128) return 'Below int128 minimum';
          if (b > MAX_INT128) return 'Exceeds int128 maximum';
        } catch {
          return 'Invalid signed integer';
        }
      });
    } else if (type === 'principal' || type === 'trait_reference') {
      const requireContract = type === 'trait_reference';
      validators.push((val: string) => {
        if (!val) return 'Required';
        if (requireContract && !val.includes('.')) {
          return 'Contract principal required (address.contract-name)';
        }
        try {
          Cl.principal(val);
        } catch {
          return 'Invalid Stacks address';
        }
      });
    }
  }

  if (isClarityAbiBuffer(type)) {
    const maxLength = type.buffer.length;
    validators.push((val: string) => {
      if (!val) return 'Required';
      const hex = val.startsWith('0x') ? val.slice(2) : val;
      if (!/^[0-9a-fA-F]*$/.test(hex)) {
        return 'Invalid hex string';
      }
      if (hex.length % 2 !== 0) {
        return 'Hex string must have even length';
      }
      if (hex.length / 2 > maxLength) {
        return `Buffer exceeds maximum length of ${maxLength} bytes`;
      }
    });
  }

  if (isClarityAbiStringAscii(type)) {
    const maxLength = type['string-ascii'].length;
    validators.push((val: string) => {
      if (typeof val !== 'string') return 'Required';
      if (val.length > maxLength) {
        return `String exceeds maximum length of ${maxLength}`;
      }
      // eslint-disable-next-line no-control-regex
      if (/[^\x00-\x7F]/.test(val)) {
        return 'Only ASCII characters allowed';
      }
    });
  }

  if (isClarityAbiStringUtf8(type)) {
    const maxLength = type['string-utf8'].length;
    validators.push((val: string) => {
      if (typeof val !== 'string') return 'Required';
      if (Array.from(val).length > maxLength) {
        return `String exceeds maximum length of ${maxLength} characters`;
      }
    });
  }

  if (isClarityAbiList(type)) {
    const maxLength = type.list.length;
    validators.push((val: any[]) => {
      if (!Array.isArray(val)) return 'Required';
      if (val.length > maxLength) {
        return `List exceeds maximum length of ${maxLength} items`;
      }
    });
  }

  return {
    onChange: ({ value }: { value: any }) => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
      return undefined;
    },
  };
}
