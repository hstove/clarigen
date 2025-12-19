/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import {
  type ClarityAbi as _ClarityAbi,
  type ClarityAbiType as MSClarityAbiType,
  type ClarityAbiTypeTuple,
  ClarityType,
  type ClarityValue,
  type PrincipalCV,
  uintCV,
  contractPrincipalCV,
  intCV,
  stringAsciiCV,
  stringUtf8CV,
  noneCV,
  someCV,
  tupleCV,
  listCV,
  hexToCV,
  bufferCV,
  parseToCV as _parseToCV,
} from '@stacks/transactions';

import type {
  Response,
  ResponseOk,
  ResponseErr,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeUInt128,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeBool,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeBuffer,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeInt128,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeList,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeNone,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeOptional,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypePrimitive,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypePrincipal,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeResponse,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeStringAscii,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeStringUtf8,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiTypeTraitReference,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiMap,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiFunction,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiType,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityAbiArg,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  TypedAbiFunction,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  TypedAbiArg,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  StacksEpochId,
  // biome-ignore lint/style/noExportedImports: ignored using `--suppress`
  ClarityVersion,
} from './abi-types';
export type {
  ClarityAbiTypeUInt128,
  ClarityAbiTypeBool,
  ClarityAbiTypeBuffer,
  ClarityAbiTypeInt128,
  ClarityAbiTypeList,
  ClarityAbiTypeNone,
  ClarityAbiTypeOptional,
  ClarityAbiTypePrimitive,
  ClarityAbiTypePrincipal,
  ClarityAbiTypeResponse,
  ClarityAbiTypeStringAscii,
  ClarityAbiTypeStringUtf8,
  ClarityAbiTypeTraitReference,
  ClarityAbiMap,
  ClarityAbiFunction,
  ClarityAbiType,
  ClarityAbiArg,
  TypedAbiFunction,
  TypedAbiArg,
  StacksEpochId,
  ClarityVersion,
};
import { toCamelCase, toKebabCase, bytesToAscii, hexToBytes } from './utils';

export function ok<T, Err = never>(value: T): ResponseOk<T, Err> {
  return {
    isOk: true,
    value,
  };
}

export function err<Ok = never, T = unknown>(value: T): ResponseErr<Ok, T> {
  return {
    isOk: false,
    value,
  };
}

export function isResponse<T>(
  value: Response<T, T> | T
): value is Response<T, T> {
  return typeof value === 'object' && value !== null && 'isOk' in value;
}

// export interface ClarityAbi extends Omit<_ClarityAbi, 'maps'> {
//   maps: ClarityAbiMap[];
//   epoch: StacksEpochId;
//   clarity_version: ClarityVersion;
//   // clarity_version?: string;
// }

export interface ClarityAbi extends _ClarityAbi {
  // maps: ClarityAbiMap[];
  epoch: StacksEpochId;
  clarity_version: ClarityVersion;
  // clarity_version?: string;
}

export function principalToString(principal: PrincipalCV): string {
  return principal.value;
}

/**
 * @param val - ClarityValue
 * @param returnResponse - if true, this will return a "response" object.
 * Otherwise, it returns the inner value of the response (whether ok or err)
 */

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function cvToValue<T = any>(
  val: ClarityValue,
  returnResponse = false
): T {
  // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
  switch (val.type) {
    case ClarityType.BoolTrue:
      return true as unknown as T;
    case ClarityType.BoolFalse:
      return false as unknown as T;
    case ClarityType.Int:
    case ClarityType.UInt:
      return val.value as unknown as T;
    case ClarityType.Buffer:
      return hexToBytes(val.value) as unknown as T;
    case ClarityType.OptionalNone:
      return null as unknown as T;
    case ClarityType.OptionalSome:
      return cvToValue(val.value);
    case ClarityType.ResponseErr:
      if (returnResponse) return err(cvToValue(val.value)) as unknown as T;
      return cvToValue(val.value);
    case ClarityType.ResponseOk:
      if (returnResponse) return ok(cvToValue(val.value)) as unknown as T;
      return cvToValue(val.value);
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return principalToString(val) as unknown as T;
    case ClarityType.List:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return val.value.map((v) => cvToValue(v)) as unknown as T;
    case ClarityType.Tuple: {
      const tupleReduced = Object.entries(val.value).reduce(
        // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
        (acc, [key, val]) => {
          const keyFixed = toCamelCase(key);
          return {
            // biome-ignore lint/performance/noAccumulatingSpread: ignored using `--suppress`
            ...acc,
            [keyFixed]: cvToValue(val, returnResponse),
          };
        },
        // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
        {} as Record<string, any>
      );
      return tupleReduced as unknown as T;
    }
    case ClarityType.StringASCII:
      return val.value as unknown as T;
    case ClarityType.StringUTF8:
      return val.value as unknown as T;
  }
}

/**
 * Converts a hex encoded string to the javascript clarity value object {type: string; value: any}
 * @param hex - the hex encoded string with or without `0x` prefix
 * @param jsonCompat - enable to serialize bigints to strings
 */
export function hexToCvValue<_T>(hex: string, jsonCompat = false) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cvToValue(hexToCV(hex), jsonCompat);
}

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export type TupleInput = Record<string, any>;
export type CVInput = string | boolean | TupleInput | number | bigint;

function inputToBigInt(input: CVInput) {
  const isBigInt = typeof input === 'bigint';
  const isNumber = typeof input === 'number';
  const isString = typeof input === 'string';
  const isOk = isBigInt || isNumber || isString;
  if (!isOk) {
    throw new Error('Invalid input type for integer');
  }
  return BigInt(input);
}

export const isClarityAbiPrimitive = (
  val: ClarityAbiType
): val is ClarityAbiTypePrimitive => typeof val === 'string';
export const isClarityAbiBuffer = (
  val: ClarityAbiType
): val is ClarityAbiTypeBuffer =>
  (val as ClarityAbiTypeBuffer).buffer !== undefined;
export const isClarityAbiStringAscii = (
  val: ClarityAbiType
): val is ClarityAbiTypeStringAscii =>
  (val as ClarityAbiTypeStringAscii)['string-ascii'] !== undefined;
export const isClarityAbiStringUtf8 = (
  val: ClarityAbiType
): val is ClarityAbiTypeStringUtf8 =>
  (val as ClarityAbiTypeStringUtf8)['string-utf8'] !== undefined;
export const isClarityAbiResponse = (
  val: ClarityAbiType
): val is ClarityAbiTypeResponse =>
  (val as ClarityAbiTypeResponse).response !== undefined;
export const isClarityAbiOptional = (
  val: ClarityAbiType
): val is ClarityAbiTypeOptional =>
  (val as ClarityAbiTypeOptional).optional !== undefined;
export const isClarityAbiTuple = (
  val: ClarityAbiType
): val is ClarityAbiTypeTuple =>
  (val as ClarityAbiTypeTuple).tuple !== undefined;
export const isClarityAbiList = (
  val: ClarityAbiType
): val is ClarityAbiTypeList => (val as ClarityAbiTypeList).list !== undefined;
export const isClarityAbiTraitReference = (
  val: ClarityAbiType
): val is ClarityAbiTypeTraitReference => val === 'trait_reference';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ignored using `--suppress`
export function parseToCV(input: CVInput, type: ClarityAbiType): ClarityValue {
  if (isClarityAbiTuple(type)) {
    if (typeof input !== 'object') {
      throw new Error('Invalid tuple input');
    }
    const tuple: Record<string, ClarityValue> = {};
    // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
    type.tuple.forEach((key) => {
      const jsKey = findJsTupleKey(key.name, input);
      const val = input[jsKey];
      tuple[key.name] = parseToCV(val, key.type);
    });
    return tupleCV(tuple);
  }
  if (isClarityAbiList(type)) {
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    const inputs = input as any[];
    // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
    const values = inputs.map((input) => parseToCV(input, type.list.type));
    return listCV(values);
  }
  if (isClarityAbiOptional(type)) {
    if (input === null) return noneCV();
    return someCV(parseToCV(input, type.optional));
  }
  if (isClarityAbiStringAscii(type)) {
    if (typeof input !== 'string') {
      throw new Error('Invalid string-ascii input');
    }
    return stringAsciiCV(input);
  }
  if (isClarityAbiStringUtf8(type)) {
    if (typeof input !== 'string') {
      throw new Error('Invalid string-ascii input');
    }
    return stringUtf8CV(input);
  }
  if (type === 'bool') {
    const inputString = typeof input === 'boolean' ? input.toString() : input;
    return _parseToCV(inputString as string, type);
  }
  if (type === 'uint128') {
    const bigi = inputToBigInt(input);
    return uintCV(bigi.toString());
  }
  if (type === 'int128') {
    const bigi = inputToBigInt(input);
    return intCV(bigi.toString());
  }
  if (type === 'trait_reference') {
    if (typeof input !== 'string')
      throw new Error('Invalid input for trait_reference');
    const [addr, name] = input.split('.');
    // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
    return contractPrincipalCV(addr!, name!);
  }
  if (isClarityAbiBuffer(type)) {
    return bufferCV(input as Uint8Array);
  }
  return _parseToCV(input as string, type as MSClarityAbiType);
}

export type CvToStringOptions = {
  encoding?: 'tryAscii' | 'hex';
  indent?: number;
  depth?: number;
};
export function cvToString(
  val: ClarityValue,
  options?: CvToStringOptions | 'tryAscii' | 'hex'
): string;
export function cvToString(
  val: ClarityValue,
  optionsOrEncoding?: 'tryAscii' | 'hex' | CvToStringOptions
): string {
  const options: CvToStringOptions =
    typeof optionsOrEncoding === 'object'
      ? optionsOrEncoding
      : {
          encoding: optionsOrEncoding,
          indent: undefined,
          depth: undefined,
        };
  const encoding = options.encoding ?? 'hex';
  const indent = options.indent;
  const depth = options.depth ?? 0;

  // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
  switch (val.type) {
    case ClarityType.BoolTrue:
      return 'true';
    case ClarityType.BoolFalse:
      return 'false';
    case ClarityType.Int:
      return val.value.toString();
    case ClarityType.UInt:
      return `u${val.value.toString()}`;
    case ClarityType.Buffer:
      if (encoding === 'tryAscii') {
        const str = bytesToAscii(hexToBytes(val.value));
        // biome-ignore lint/performance/useTopLevelRegex: ignored using `--suppress`
        if (/[ -~]/.test(str)) {
          return JSON.stringify(str);
        }
      }
      return `0x${val.value}`;
    case ClarityType.OptionalNone:
      return 'none';
    case ClarityType.OptionalSome:
      return `(some ${cvToString(val.value, options)})`;
    case ClarityType.ResponseErr:
      return `(err ${cvToString(val.value, options)})`;
    case ClarityType.ResponseOk:
      return `(ok ${cvToString(val.value, options)})`;
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return `'${principalToString(val)}`;
    case ClarityType.List:
      return `(list ${val.value.map((v) => cvToString(v, options)).join(' ')})`;
    case ClarityType.Tuple: {
      const keys = Object.keys(val.value);
      if (indent === undefined || keys.length === 0) {
        return `{ ${keys
          .map(
            (key) =>
              `${key}: ${
                // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
                cvToString(val.value[key]!, options)
              }`
          )
          .join(', ')} }`;
      }
      const padding = ' '.repeat((depth + 1) * indent);
      const outerPadding = ' '.repeat(depth * indent);
      const lines = keys.map(
        (key) =>
          `${padding}${key}: ${
            // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
            cvToString(val.value[key]!, {
              ...options,
              depth: depth + 1,
            })
          }`
      );
      return `{\n${lines.join(',\n')}\n${outerPadding}}`;
    }
    case ClarityType.StringASCII:
      return `"${val.value}"`;
    case ClarityType.StringUTF8:
      return `u"${val.value}"`;
  }
}

/**
 * Convert a Clarity value to valid JSON. This does this same thing as
 * `cvToValue`, except that integers are returned as strings, and buffers
 * are returned as hex-encoded strings.
 *
 * @param val - ClarityValue
 */

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function cvToJSON<T = any>(
  val: ClarityValue,
  returnResponse = false
): T {
  // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
  switch (val.type) {
    case ClarityType.BoolTrue:
      return true as unknown as T;
    case ClarityType.BoolFalse:
      return false as unknown as T;
    case ClarityType.Int:
    case ClarityType.UInt:
      return `${val.value}` as unknown as T;
    case ClarityType.Buffer:
      return val.value as unknown as T;
    case ClarityType.OptionalNone:
      return null as unknown as T;
    case ClarityType.OptionalSome:
      return cvToJSON(val.value);
    case ClarityType.ResponseErr:
      if (returnResponse) return err(cvToJSON(val.value)) as unknown as T;
      return cvToJSON(val.value);
    case ClarityType.ResponseOk:
      if (returnResponse) return ok(cvToJSON(val.value)) as unknown as T;
      return cvToJSON(val.value);
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return principalToString(val) as unknown as T;
    case ClarityType.List:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return val.value.map((v) => cvToJSON(v)) as unknown as T;
    case ClarityType.Tuple: {
      const tupleReduced = Object.entries(val.value).reduce(
        // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
        (acc, [key, val]) => {
          const keyFixed = toCamelCase(key);
          return {
            // biome-ignore lint/performance/noAccumulatingSpread: ignored using `--suppress`
            ...acc,
            [keyFixed]: cvToJSON(val),
          };
        },
        // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
        {} as Record<string, any>
      );
      return tupleReduced as unknown as T;
    }
    case ClarityType.StringASCII:
      return val.value as unknown as T;
    case ClarityType.StringUTF8:
      return val.value as unknown as T;
  }
}

export function transformObjectArgs(
  func: ClarityAbiFunction,
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  args: Record<string, any>
) {
  return func.args.map((abiArg) => {
    const key = findJsTupleKey(abiArg.name, args);
    const val = args[key];
    return parseToCV(val, abiArg.type);
  });
}

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function transformArgsArray(func: ClarityAbiFunction, args: any[]) {
  // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
  return args.map((arg, index) => parseToCV(arg, func.args[index]!.type));
}

export function transformArgsToCV(
  func: ClarityAbiFunction,
  // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
  args: any[] | [Record<string, any>]
) {
  if (args.length === 0) return [];
  const [firstArg] = args;
  if (args.length === 1 && func.args.length !== 1) {
    return transformObjectArgs(func, firstArg);
  }
  if (
    typeof firstArg === 'object' &&
    !Array.isArray(firstArg) &&
    firstArg !== null
  ) {
    try {
      let hasAllArgs = true;
      // biome-ignore lint/complexity/noForEach: ignored using `--suppress`
      func.args.forEach((a) => {
        try {
          findJsTupleKey(a.name, firstArg);
        } catch (_error) {
          hasAllArgs = false;
        }
      });
      if (hasAllArgs) {
        return transformObjectArgs(func, firstArg);
      }
    } catch (_error) {
      // console.log('error transforming args:', _error);
      //
    }
  }
  return transformArgsArray(func, args);
}

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function findJsTupleKey(key: string, input: Record<string, any>) {
  const found = Object.keys(input).find((k) => {
    const camelEq = key === k;
    const kebabEq = key === toKebabCase(k);
    return camelEq || kebabEq;
  });
  if (!found) {
    throw new Error(`Error encoding JS tuple: ${key} not found in input.`);
  }
  return found;
}

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function expectOk<Ok>(response: Response<Ok, any>): Ok {
  if (response.isOk) {
    return response.value;
  }
  throw new Error(`Expected OK, received error: ${String(response.value)}`);
}

// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
export function expectErr<Err>(response: Response<any, Err>): Err {
  if (!response.isOk) {
    return response.value;
  }
  throw new Error(`Expected Err, received ok: ${String(response.value)}`);
}

export type AbiPrimitiveTo<T extends ClarityAbiTypePrimitive> =
  T extends ClarityAbiTypeInt128
    ? bigint
    : T extends ClarityAbiTypeUInt128
      ? bigint
      : T extends ClarityAbiTypeBool
        ? boolean
        : T extends ClarityAbiTypePrincipal
          ? string
          : T extends ClarityAbiTypeTraitReference
            ? string
            : T extends ClarityAbiTypeNone
              ? never
              : T;

export type ReadonlyTuple = {
  readonly tuple: Readonly<ClarityAbiTypeTuple['tuple']>;
};

type TupleTypeUnion<T> =
  T extends Readonly<ClarityAbiTypeTuple['tuple'][number]>
    ? { -readonly [Z in T['name']]: AbiTypeTo<T['type']> }
    : never;
// biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type Compact<T> = { [K in keyof T]: T[K] };

export type AbiTupleTo<T extends ReadonlyTuple> = Compact<
  UnionToIntersection<TupleTypeUnion<T['tuple'][number]>>
>;

export type AbiTypeTo<T extends ClarityAbiType | ReadonlyTuple> =
  T extends ClarityAbiTypePrimitive
    ? AbiPrimitiveTo<T>
    : T extends ClarityAbiTypeBuffer
      ? Uint8Array
      : T extends ClarityAbiTypeStringAscii
        ? string
        : T extends ClarityAbiTypeStringUtf8
          ? string
          : T extends ClarityAbiTypeList
            ? AbiTypeTo<T['list']['type']>[]
            : T extends ClarityAbiTypeOptional
              ? AbiTypeTo<T['optional']> | null
              : T extends ClarityAbiTypeResponse
                ? Response<
                    AbiTypeTo<T['response']['ok']>,
                    AbiTypeTo<T['response']['error']>
                  >
                : T extends ReadonlyTuple
                  ? AbiTupleTo<T>
                  : never;

// Helper type for inferring the return type of a function. Like `ReturnType`,
// but for Clarigen types
export type FunctionReturnType<T> =
  T extends TypedAbiFunction<TypedAbiArg<unknown, string>[], infer R>
    ? R
    : never;

export type Jsonize<T> = T extends bigint
  ? string
  : T extends Uint8Array
    ? string
    : T extends (infer V)[]
      ? Jsonize<V>[]
      : T extends Record<keyof T, unknown>
        ? {
            [K in keyof T as K]: Jsonize<T[K]>;
          }
        : T;

export function getTypeString(val: ClarityAbiType): string {
  if (isClarityAbiPrimitive(val)) {
    if (val === 'int128') {
      return 'int';
    }
    if (val === 'uint128') {
      return 'uint';
    }
    return val;
  }
  if (isClarityAbiBuffer(val)) {
    return `(buff ${val.buffer.length})`;
  }
  if (isClarityAbiStringAscii(val)) {
    return `(string-ascii ${val['string-ascii'].length})`;
  }
  if (isClarityAbiStringUtf8(val)) {
    return `(string-utf8 ${val['string-utf8'].length})`;
  }
  if (isClarityAbiResponse(val)) {
    return `(response ${getTypeString(val.response.ok)} ${getTypeString(val.response.error)})`;
  }
  if (isClarityAbiOptional(val)) {
    return `(optional ${getTypeString(val.optional)})`;
  }
  if (isClarityAbiTuple(val)) {
    return `{ ${val.tuple.map((t) => `${t.name}: ${getTypeString(t.type)}`).join(', ')} }`;
  }
  if (isClarityAbiList(val)) {
    return `(list ${val.list.length} ${getTypeString(val.list.type)})`;
  }
  throw new Error(
    `Type string unsupported for Clarity type: ${JSON.stringify(val)}`
  );
}
