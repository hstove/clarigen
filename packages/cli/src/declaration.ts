import {
  isClarityAbiBuffer,
  isClarityAbiList,
  isClarityAbiOptional,
  isClarityAbiPrimitive,
  isClarityAbiResponse,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiTuple,
  type ClarityAbiType,
  isClarityAbiTraitReference,
} from '@clarigen/core';
// import { ClarityAbiArg, ClarityAbiFunction, ClarityAbiType } from '../types.ts';
import {
  toCamelCase,
  type ClarityAbiArg,
  type ClarityAbiFunction,
} from '@clarigen/core';

export const jsTypeFromAbiType = (
  val: ClarityAbiType,
  isArgument = false
): string => {
  if (isClarityAbiPrimitive(val)) {
    if (val === 'uint128') {
      if (isArgument) return 'number | bigint';
      return 'bigint';
    }
    if (val === 'int128') {
      if (isArgument) return 'number | bigint';
      return 'bigint';
    }
    if (val === 'bool') {
      return 'boolean';
    }
    if (val === 'principal') {
      return 'string';
    }
    if (val === 'none') {
      return 'null';
    }
    if (val === 'trait_reference') {
      return 'string';
    }
    throw new Error(
      `Unexpected Clarity ABI type primitive: ${JSON.stringify(val)}`
    );
  }
  if (isClarityAbiBuffer(val)) {
    return 'Uint8Array';
  }
  if (isClarityAbiResponse(val)) {
    const ok = jsTypeFromAbiType(val.response.ok, isArgument);
    const err = jsTypeFromAbiType(val.response.error, isArgument);
    return `Response<${ok}, ${err}>`;
  }
  if (isClarityAbiOptional(val)) {
    const innerType = jsTypeFromAbiType(val.optional, isArgument);
    return `${innerType} | null`;
  }
  if (isClarityAbiTuple(val)) {
    const tupleDefs: string[] = [];
    val.tuple.forEach(({ name, type }) => {
      const camelName = toCamelCase(name);
      const innerType = jsTypeFromAbiType(type, isArgument);
      tupleDefs.push(`"${camelName}": ${innerType};`);
    });
    return `{
  ${tupleDefs.join('\n  ')}
}`;
  }
  if (isClarityAbiList(val)) {
    const innerType = jsTypeFromAbiType(val.list.type, isArgument);
    return `${innerType}[]`;
  }
  if (isClarityAbiStringAscii(val)) {
    return 'string';
  }
  if (isClarityAbiStringUtf8(val)) {
    return 'string';
  }
  if (isClarityAbiTraitReference(val)) {
    return 'string';
  }
  throw new Error(`Unexpected Clarity ABI type: ${JSON.stringify(val)}`);
};

export function abiArgType(arg: ClarityAbiArg) {
  const nativeType = jsTypeFromAbiType(arg.type, true);
  const argName = getArgName(arg.name);
  return `${argName}: TypedAbiArg<${nativeType}, "${argName}">`;
}

export function abiFunctionType(abiFunction: ClarityAbiFunction) {
  const args = abiFunction.args.map(abiArgType);
  const retType = jsTypeFromAbiType(abiFunction.outputs.type);
  const argsTuple = `[${args.join(', ')}]`;
  return `TypedAbiFunction<${argsTuple}, ${retType}>`;
}

// Check if it's a reserved word, and then camelCase
export function getArgName(name: string) {
  const camel = toCamelCase(name);
  const prefix = RESERVED[camel] ? '_' : '';
  return `${prefix}${camel}`;
}

function _hash(...words: string[]) {
  const h: Record<string, boolean> = {};
  for (const word of words) {
    h[word] = true;
  }
  return h;
}

const RESERVED = _hash(
  // Keywords, ES6 11.6.2.1, http://www.ecma-international.org/ecma-262/6.0/index.html#sec-keywords
  'break',
  'do',
  'in',
  'typeof',
  'case',
  'else',
  'instanceof',
  'var',
  'catch',
  'export',
  'new',
  'void',
  'class',
  'extends',
  'return',
  'while',
  'const',
  'finally',
  'super',
  'with',
  'continue',
  'for',
  'switch',
  'yield',
  'debugger',
  'function',
  'this',
  'default',
  'if',
  'throw',
  'delete',
  'import',
  'try',
  // Future Reserved Words, ES6 11.6.2.2
  // http://www.ecma-international.org/ecma-262/6.0/index.html#sec-future-reserved-words
  'enum',
  'await',
  // NullLiteral & BooleanLiteral
  'null',
  'true',
  'false'
);
