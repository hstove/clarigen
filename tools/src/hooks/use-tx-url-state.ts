import {
  useQueryStates,
  createParser,
  parseAsString,
  parseAsBoolean,
} from 'nuqs';
import type { ClarityAbiType } from '@clarigen/core';
import {
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiOptional,
  isClarityAbiList,
  isClarityAbiTuple,
} from '@clarigen/core';
import { useMemo } from 'react';

type OptionalValue = { isNone: boolean; value: unknown };

const parseAsOptional = createParser({
  parse: (value: string): OptionalValue | null => {
    if (value === '') return { isNone: true, value: null };
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null && 'isNone' in parsed) {
        const opt = parsed as OptionalValue;
        // Treat {isNone: false, value: null} as none - invalid state
        if (!opt.isNone && opt.value === null) {
          return { isNone: true, value: null };
        }
        return opt;
      }
      return { isNone: false, value: parsed };
    } catch {
      return { isNone: false, value };
    }
  },
  serialize: (value: OptionalValue): string => {
    if (value.isNone) return '';
    return JSON.stringify(value);
  },
  eq: (a: OptionalValue, b: OptionalValue) => {
    if (a.isNone !== b.isNone) return false;
    if (a.isNone) return true;
    return JSON.stringify(a.value) === JSON.stringify(b.value);
  },
});

const parseAsList = createParser({
  parse: (value: string): unknown[] | null => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },
  serialize: (value: unknown[]): string => JSON.stringify(value),
  eq: (a: unknown[], b: unknown[]) => JSON.stringify(a) === JSON.stringify(b),
});

const parseAsTuple = createParser({
  parse: (value: string): Record<string, unknown> | null => {
    if (!value) return {};
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'object' &&
        parsed !== null &&
        !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  },
  serialize: (value: Record<string, unknown>): string => JSON.stringify(value),
  eq: (a: Record<string, unknown>, b: Record<string, unknown>) =>
    JSON.stringify(a) === JSON.stringify(b),
});

type ParserType =
  | ReturnType<typeof parseAsBoolean.withDefault>
  | ReturnType<typeof parseAsString.withDefault>
  | ReturnType<typeof parseAsOptional.withDefault>
  | ReturnType<typeof parseAsList.withDefault>
  | ReturnType<typeof parseAsTuple.withDefault>;

function getParserForType(type: ClarityAbiType): ParserType {
  if (isClarityAbiPrimitive(type)) {
    switch (type) {
      case 'bool':
        return parseAsBoolean.withDefault(false);
      case 'uint128':
      case 'int128':
      case 'principal':
      case 'trait_reference':
        return parseAsString.withDefault('');
      case 'none':
        return parseAsString.withDefault('');
    }
  }

  if (isClarityAbiBuffer(type)) {
    return parseAsString.withDefault('');
  }

  if (isClarityAbiStringAscii(type) || isClarityAbiStringUtf8(type)) {
    return parseAsString.withDefault('');
  }

  if (isClarityAbiOptional(type)) {
    return parseAsOptional.withDefault({ isNone: true, value: null });
  }

  if (isClarityAbiList(type)) {
    return parseAsList.withDefault([]);
  }

  if (isClarityAbiTuple(type)) {
    const defaultObj: Record<string, unknown> = {};
    for (const member of type.tuple) {
      defaultObj[member.name] = getDefaultValueForType(member.type);
    }
    return parseAsTuple.withDefault(defaultObj);
  }

  return parseAsString.withDefault('');
}

function getDefaultValueForType(type: ClarityAbiType): unknown {
  if (typeof type === 'string') {
    switch (type) {
      case 'bool':
        return false;
      case 'uint128':
      case 'int128':
      case 'principal':
      case 'trait_reference':
        return '';
      case 'none':
        return null;
    }
  }
  if ('buffer' in type) return '';
  if ('string-ascii' in type) return '';
  if ('string-utf8' in type) return '';
  if ('optional' in type) return { isNone: true, value: null };
  if ('list' in type) return [];
  if ('tuple' in type) {
    const obj: Record<string, unknown> = {};
    for (const member of type.tuple) {
      obj[member.name] = getDefaultValueForType(member.type);
    }
    return obj;
  }
  return '';
}

type FunctionArg = { name: string; type: ClarityAbiType };

export function useTxUrlState(args: FunctionArg[]) {
  const parsers = useMemo(() => {
    const result: Record<string, ParserType> = {
      txid: parseAsString.withDefault(''),
    };
    for (const arg of args) {
      result[arg.name] = getParserForType(arg.type);
    }
    return result;
  }, [args]);

  const [urlState, setUrlState] = useQueryStates(parsers);

  return {
    urlState: urlState as Record<string, unknown>,
    setUrlState: setUrlState as (
      values: Partial<Record<string, unknown>>
    ) => Promise<URLSearchParams>,
  };
}
