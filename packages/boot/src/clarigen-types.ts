import type {
  TypedAbiArg,
  TypedAbiFunction,
  TypedAbiMap,
  TypedAbiVariable,
  Response,
} from '@clarigen/core';

export const contracts = {
  bns: {
    functions: {
      computeNamePrice: {
        name: 'compute-name-price',
        access: 'private',
        args: [
          { name: 'name', type: { buffer: { length: 48 } } },
          {
            name: 'price-function',
            type: {
              tuple: [
                { name: 'base', type: 'uint128' },
                { name: 'buckets', type: { list: { type: 'uint128', length: 16 } } },
                { name: 'coeff', type: 'uint128' },
                { name: 'no-vowel-discount', type: 'uint128' },
                { name: 'nonalpha-discount', type: 'uint128' },
              ],
            },
          },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          name: TypedAbiArg<Uint8Array, 'name'>,
          priceFunction: TypedAbiArg<
            {
              base: number | bigint;
              buckets: number | bigint[];
              coeff: number | bigint;
              noVowelDiscount: number | bigint;
              nonalphaDiscount: number | bigint;
            },
            'priceFunction'
          >
        ],
        bigint
      >,
      getExpAtIndex: {
        name: 'get-exp-at-index',
        access: 'private',
        args: [
          { name: 'buckets', type: { list: { type: 'uint128', length: 16 } } },
          { name: 'index', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          buckets: TypedAbiArg<number | bigint[], 'buckets'>,
          index: TypedAbiArg<number | bigint, 'index'>
        ],
        bigint
      >,
      hasInvalidChars: {
        name: 'has-invalid-chars',
        access: 'private',
        args: [{ name: 'name', type: { buffer: { length: 48 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[name: TypedAbiArg<Uint8Array, 'name'>], boolean>,
      hasNonalphaChars: {
        name: 'has-nonalpha-chars',
        access: 'private',
        args: [{ name: 'name', type: { buffer: { length: 48 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[name: TypedAbiArg<Uint8Array, 'name'>], boolean>,
      hasVowelsChars: {
        name: 'has-vowels-chars',
        access: 'private',
        args: [{ name: 'name', type: { buffer: { length: 48 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[name: TypedAbiArg<Uint8Array, 'name'>], boolean>,
      isCharValid: {
        name: 'is-char-valid',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      isDigit: {
        name: 'is-digit',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      isLowercaseAlpha: {
        name: 'is-lowercase-alpha',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      isNamespaceAvailable: {
        name: 'is-namespace-available',
        access: 'private',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[namespace: TypedAbiArg<Uint8Array, 'namespace'>], boolean>,
      isNonalpha: {
        name: 'is-nonalpha',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      isSpecialChar: {
        name: 'is-special-char',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      isVowel: {
        name: 'is-vowel',
        access: 'private',
        args: [{ name: 'char', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[char: TypedAbiArg<Uint8Array, 'char'>], boolean>,
      max: {
        name: 'max',
        access: 'private',
        args: [
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [a: TypedAbiArg<number | bigint, 'a'>, b: TypedAbiArg<number | bigint, 'b'>],
        bigint
      >,
      min: {
        name: 'min',
        access: 'private',
        args: [
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [a: TypedAbiArg<number | bigint, 'a'>, b: TypedAbiArg<number | bigint, 'b'>],
        bigint
      >,
      mintOrTransferName_q: {
        name: 'mint-or-transfer-name?',
        access: 'private',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'beneficiary', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          beneficiary: TypedAbiArg<string, 'beneficiary'>
        ],
        Response<boolean, bigint>
      >,
      nameLeaseStartedAt_q: {
        name: 'name-lease-started-at?',
        access: 'private',
        args: [
          { name: 'namespace-launched-at', type: { optional: 'uint128' } },
          { name: 'namespace-revealed-at', type: 'uint128' },
          {
            name: 'name-props',
            type: {
              tuple: [
                { name: 'imported-at', type: { optional: 'uint128' } },
                { name: 'registered-at', type: { optional: 'uint128' } },
                { name: 'revoked-at', type: { optional: 'uint128' } },
                { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespaceLaunchedAt: TypedAbiArg<number | bigint | null, 'namespaceLaunchedAt'>,
          namespaceRevealedAt: TypedAbiArg<number | bigint, 'namespaceRevealedAt'>,
          nameProps: TypedAbiArg<
            {
              importedAt: number | bigint | null;
              registeredAt: number | bigint | null;
              revokedAt: number | bigint | null;
              zonefileHash: Uint8Array;
            },
            'nameProps'
          >
        ],
        Response<bigint, bigint>
      >,
      updateNameOwnership_q: {
        name: 'update-name-ownership?',
        access: 'private',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'from', type: 'principal' },
          { name: 'to', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          from: TypedAbiArg<string, 'from'>,
          to: TypedAbiArg<string, 'to'>
        ],
        Response<boolean, bigint>
      >,
      updateZonefileAndProps: {
        name: 'update-zonefile-and-props',
        access: 'private',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'registered-at', type: { optional: 'uint128' } },
          { name: 'imported-at', type: { optional: 'uint128' } },
          { name: 'revoked-at', type: { optional: 'uint128' } },
          { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
          { name: 'op', type: { 'string-ascii': { length: 16 } } },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          registeredAt: TypedAbiArg<number | bigint | null, 'registeredAt'>,
          importedAt: TypedAbiArg<number | bigint | null, 'importedAt'>,
          revokedAt: TypedAbiArg<number | bigint | null, 'revokedAt'>,
          zonefileHash: TypedAbiArg<Uint8Array, 'zonefileHash'>,
          op: TypedAbiArg<string, 'op'>
        ],
        boolean
      >,
      nameImport: {
        name: 'name-import',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'beneficiary', type: 'principal' },
          { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          beneficiary: TypedAbiArg<string, 'beneficiary'>,
          zonefileHash: TypedAbiArg<Uint8Array, 'zonefileHash'>
        ],
        Response<boolean, bigint>
      >,
      namePreorder: {
        name: 'name-preorder',
        access: 'public',
        args: [
          { name: 'hashed-salted-fqn', type: { buffer: { length: 20 } } },
          { name: 'stx-to-burn', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          hashedSaltedFqn: TypedAbiArg<Uint8Array, 'hashedSaltedFqn'>,
          stxToBurn: TypedAbiArg<number | bigint, 'stxToBurn'>
        ],
        Response<bigint, bigint>
      >,
      nameRegister: {
        name: 'name-register',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'salt', type: { buffer: { length: 20 } } },
          { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          salt: TypedAbiArg<Uint8Array, 'salt'>,
          zonefileHash: TypedAbiArg<Uint8Array, 'zonefileHash'>
        ],
        Response<boolean, bigint>
      >,
      nameRenewal: {
        name: 'name-renewal',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'stx-to-burn', type: 'uint128' },
          { name: 'new-owner', type: { optional: 'principal' } },
          { name: 'zonefile-hash', type: { optional: { buffer: { length: 20 } } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          stxToBurn: TypedAbiArg<number | bigint, 'stxToBurn'>,
          newOwner: TypedAbiArg<string | null, 'newOwner'>,
          zonefileHash: TypedAbiArg<Uint8Array | null, 'zonefileHash'>
        ],
        Response<boolean, bigint>
      >,
      nameRevoke: {
        name: 'name-revoke',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<boolean, bigint>
      >,
      nameTransfer: {
        name: 'name-transfer',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'new-owner', type: 'principal' },
          { name: 'zonefile-hash', type: { optional: { buffer: { length: 20 } } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          newOwner: TypedAbiArg<string, 'newOwner'>,
          zonefileHash: TypedAbiArg<Uint8Array | null, 'zonefileHash'>
        ],
        Response<boolean, bigint>
      >,
      nameUpdate: {
        name: 'name-update',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
          { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          name: TypedAbiArg<Uint8Array, 'name'>,
          zonefileHash: TypedAbiArg<Uint8Array, 'zonefileHash'>
        ],
        Response<boolean, bigint>
      >,
      namespacePreorder: {
        name: 'namespace-preorder',
        access: 'public',
        args: [
          { name: 'hashed-salted-namespace', type: { buffer: { length: 20 } } },
          { name: 'stx-to-burn', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          hashedSaltedNamespace: TypedAbiArg<Uint8Array, 'hashedSaltedNamespace'>,
          stxToBurn: TypedAbiArg<number | bigint, 'stxToBurn'>
        ],
        Response<bigint, bigint>
      >,
      namespaceReady: {
        name: 'namespace-ready',
        access: 'public',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>],
        Response<boolean, bigint>
      >,
      namespaceReveal: {
        name: 'namespace-reveal',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'namespace-salt', type: { buffer: { length: 20 } } },
          { name: 'p-func-base', type: 'uint128' },
          { name: 'p-func-coeff', type: 'uint128' },
          { name: 'p-func-b1', type: 'uint128' },
          { name: 'p-func-b2', type: 'uint128' },
          { name: 'p-func-b3', type: 'uint128' },
          { name: 'p-func-b4', type: 'uint128' },
          { name: 'p-func-b5', type: 'uint128' },
          { name: 'p-func-b6', type: 'uint128' },
          { name: 'p-func-b7', type: 'uint128' },
          { name: 'p-func-b8', type: 'uint128' },
          { name: 'p-func-b9', type: 'uint128' },
          { name: 'p-func-b10', type: 'uint128' },
          { name: 'p-func-b11', type: 'uint128' },
          { name: 'p-func-b12', type: 'uint128' },
          { name: 'p-func-b13', type: 'uint128' },
          { name: 'p-func-b14', type: 'uint128' },
          { name: 'p-func-b15', type: 'uint128' },
          { name: 'p-func-b16', type: 'uint128' },
          { name: 'p-func-non-alpha-discount', type: 'uint128' },
          { name: 'p-func-no-vowel-discount', type: 'uint128' },
          { name: 'lifetime', type: 'uint128' },
          { name: 'namespace-import', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          namespaceSalt: TypedAbiArg<Uint8Array, 'namespaceSalt'>,
          pFuncBase: TypedAbiArg<number | bigint, 'pFuncBase'>,
          pFuncCoeff: TypedAbiArg<number | bigint, 'pFuncCoeff'>,
          pFuncB1: TypedAbiArg<number | bigint, 'pFuncB1'>,
          pFuncB2: TypedAbiArg<number | bigint, 'pFuncB2'>,
          pFuncB3: TypedAbiArg<number | bigint, 'pFuncB3'>,
          pFuncB4: TypedAbiArg<number | bigint, 'pFuncB4'>,
          pFuncB5: TypedAbiArg<number | bigint, 'pFuncB5'>,
          pFuncB6: TypedAbiArg<number | bigint, 'pFuncB6'>,
          pFuncB7: TypedAbiArg<number | bigint, 'pFuncB7'>,
          pFuncB8: TypedAbiArg<number | bigint, 'pFuncB8'>,
          pFuncB9: TypedAbiArg<number | bigint, 'pFuncB9'>,
          pFuncB10: TypedAbiArg<number | bigint, 'pFuncB10'>,
          pFuncB11: TypedAbiArg<number | bigint, 'pFuncB11'>,
          pFuncB12: TypedAbiArg<number | bigint, 'pFuncB12'>,
          pFuncB13: TypedAbiArg<number | bigint, 'pFuncB13'>,
          pFuncB14: TypedAbiArg<number | bigint, 'pFuncB14'>,
          pFuncB15: TypedAbiArg<number | bigint, 'pFuncB15'>,
          pFuncB16: TypedAbiArg<number | bigint, 'pFuncB16'>,
          pFuncNonAlphaDiscount: TypedAbiArg<number | bigint, 'pFuncNonAlphaDiscount'>,
          pFuncNoVowelDiscount: TypedAbiArg<number | bigint, 'pFuncNoVowelDiscount'>,
          lifetime: TypedAbiArg<number | bigint, 'lifetime'>,
          namespaceImport: TypedAbiArg<string, 'namespaceImport'>
        ],
        Response<boolean, bigint>
      >,
      namespaceRevokeFunctionPriceEdition: {
        name: 'namespace-revoke-function-price-edition',
        access: 'public',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>],
        Response<boolean, bigint>
      >,
      namespaceUpdateFunctionPrice: {
        name: 'namespace-update-function-price',
        access: 'public',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'p-func-base', type: 'uint128' },
          { name: 'p-func-coeff', type: 'uint128' },
          { name: 'p-func-b1', type: 'uint128' },
          { name: 'p-func-b2', type: 'uint128' },
          { name: 'p-func-b3', type: 'uint128' },
          { name: 'p-func-b4', type: 'uint128' },
          { name: 'p-func-b5', type: 'uint128' },
          { name: 'p-func-b6', type: 'uint128' },
          { name: 'p-func-b7', type: 'uint128' },
          { name: 'p-func-b8', type: 'uint128' },
          { name: 'p-func-b9', type: 'uint128' },
          { name: 'p-func-b10', type: 'uint128' },
          { name: 'p-func-b11', type: 'uint128' },
          { name: 'p-func-b12', type: 'uint128' },
          { name: 'p-func-b13', type: 'uint128' },
          { name: 'p-func-b14', type: 'uint128' },
          { name: 'p-func-b15', type: 'uint128' },
          { name: 'p-func-b16', type: 'uint128' },
          { name: 'p-func-non-alpha-discount', type: 'uint128' },
          { name: 'p-func-no-vowel-discount', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          namespace: TypedAbiArg<Uint8Array, 'namespace'>,
          pFuncBase: TypedAbiArg<number | bigint, 'pFuncBase'>,
          pFuncCoeff: TypedAbiArg<number | bigint, 'pFuncCoeff'>,
          pFuncB1: TypedAbiArg<number | bigint, 'pFuncB1'>,
          pFuncB2: TypedAbiArg<number | bigint, 'pFuncB2'>,
          pFuncB3: TypedAbiArg<number | bigint, 'pFuncB3'>,
          pFuncB4: TypedAbiArg<number | bigint, 'pFuncB4'>,
          pFuncB5: TypedAbiArg<number | bigint, 'pFuncB5'>,
          pFuncB6: TypedAbiArg<number | bigint, 'pFuncB6'>,
          pFuncB7: TypedAbiArg<number | bigint, 'pFuncB7'>,
          pFuncB8: TypedAbiArg<number | bigint, 'pFuncB8'>,
          pFuncB9: TypedAbiArg<number | bigint, 'pFuncB9'>,
          pFuncB10: TypedAbiArg<number | bigint, 'pFuncB10'>,
          pFuncB11: TypedAbiArg<number | bigint, 'pFuncB11'>,
          pFuncB12: TypedAbiArg<number | bigint, 'pFuncB12'>,
          pFuncB13: TypedAbiArg<number | bigint, 'pFuncB13'>,
          pFuncB14: TypedAbiArg<number | bigint, 'pFuncB14'>,
          pFuncB15: TypedAbiArg<number | bigint, 'pFuncB15'>,
          pFuncB16: TypedAbiArg<number | bigint, 'pFuncB16'>,
          pFuncNonAlphaDiscount: TypedAbiArg<number | bigint, 'pFuncNonAlphaDiscount'>,
          pFuncNoVowelDiscount: TypedAbiArg<number | bigint, 'pFuncNoVowelDiscount'>
        ],
        Response<boolean, bigint>
      >,
      canNameBeRegistered: {
        name: 'can-name-be-registered',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<boolean, bigint>
      >,
      canNamespaceBeRegistered: {
        name: 'can-namespace-be-registered',
        access: 'read_only',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>],
        Response<boolean, null>
      >,
      canReceiveName: {
        name: 'can-receive-name',
        access: 'read_only',
        args: [{ name: 'owner', type: 'principal' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[owner: TypedAbiArg<string, 'owner'>], Response<boolean, bigint>>,
      checkNameOpsPreconditions: {
        name: 'check-name-ops-preconditions',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: 'name-props',
                    type: {
                      tuple: [
                        { name: 'imported-at', type: { optional: 'uint128' } },
                        { name: 'registered-at', type: { optional: 'uint128' } },
                        { name: 'revoked-at', type: { optional: 'uint128' } },
                        { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
                      ],
                    },
                  },
                  {
                    name: 'namespace-props',
                    type: {
                      tuple: [
                        { name: 'can-update-price-function', type: 'bool' },
                        { name: 'launched-at', type: { optional: 'uint128' } },
                        { name: 'lifetime', type: 'uint128' },
                        { name: 'namespace-import', type: 'principal' },
                        {
                          name: 'price-function',
                          type: {
                            tuple: [
                              { name: 'base', type: 'uint128' },
                              { name: 'buckets', type: { list: { type: 'uint128', length: 16 } } },
                              { name: 'coeff', type: 'uint128' },
                              { name: 'no-vowel-discount', type: 'uint128' },
                              { name: 'nonalpha-discount', type: 'uint128' },
                            ],
                          },
                        },
                        { name: 'revealed-at', type: 'uint128' },
                      ],
                    },
                  },
                  { name: 'owner', type: 'principal' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<
          {
            nameProps: {
              importedAt: bigint | null;
              registeredAt: bigint | null;
              revokedAt: bigint | null;
              zonefileHash: Uint8Array;
            };
            namespaceProps: {
              canUpdatePriceFunction: boolean;
              launchedAt: bigint | null;
              lifetime: bigint;
              namespaceImport: string;
              priceFunction: {
                base: bigint;
                buckets: bigint[];
                coeff: bigint;
                noVowelDiscount: bigint;
                nonalphaDiscount: bigint;
              };
              revealedAt: bigint;
            };
            owner: string;
          },
          bigint
        >
      >,
      getNamePrice: {
        name: 'get-name-price',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<bigint, bigint>
      >,
      getNamespacePrice: {
        name: 'get-namespace-price',
        access: 'read_only',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>],
        Response<bigint, bigint>
      >,
      getNamespaceProperties: {
        name: 'get-namespace-properties',
        access: 'read_only',
        args: [{ name: 'namespace', type: { buffer: { length: 20 } } }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'namespace', type: { buffer: { length: 20 } } },
                  {
                    name: 'properties',
                    type: {
                      tuple: [
                        { name: 'can-update-price-function', type: 'bool' },
                        { name: 'launched-at', type: { optional: 'uint128' } },
                        { name: 'lifetime', type: 'uint128' },
                        { name: 'namespace-import', type: 'principal' },
                        {
                          name: 'price-function',
                          type: {
                            tuple: [
                              { name: 'base', type: 'uint128' },
                              { name: 'buckets', type: { list: { type: 'uint128', length: 16 } } },
                              { name: 'coeff', type: 'uint128' },
                              { name: 'no-vowel-discount', type: 'uint128' },
                              { name: 'nonalpha-discount', type: 'uint128' },
                            ],
                          },
                        },
                        { name: 'revealed-at', type: 'uint128' },
                      ],
                    },
                  },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>],
        Response<
          {
            namespace: Uint8Array;
            properties: {
              canUpdatePriceFunction: boolean;
              launchedAt: bigint | null;
              lifetime: bigint;
              namespaceImport: string;
              priceFunction: {
                base: bigint;
                buckets: bigint[];
                coeff: bigint;
                noVowelDiscount: bigint;
                nonalphaDiscount: bigint;
              };
              revealedAt: bigint;
            };
          },
          bigint
        >
      >,
      isNameInGracePeriod: {
        name: 'is-name-in-grace-period',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<boolean, bigint>
      >,
      isNameLeaseExpired: {
        name: 'is-name-lease-expired',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<boolean, bigint>
      >,
      nameResolve: {
        name: 'name-resolve',
        access: 'read_only',
        args: [
          { name: 'namespace', type: { buffer: { length: 20 } } },
          { name: 'name', type: { buffer: { length: 48 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lease-ending-at', type: { optional: 'uint128' } },
                  { name: 'lease-started-at', type: 'uint128' },
                  { name: 'owner', type: 'principal' },
                  { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [namespace: TypedAbiArg<Uint8Array, 'namespace'>, name: TypedAbiArg<Uint8Array, 'name'>],
        Response<
          {
            leaseEndingAt: bigint | null;
            leaseStartedAt: bigint;
            owner: string;
            zonefileHash: Uint8Array;
          },
          bigint
        >
      >,
      resolvePrincipal: {
        name: 'resolve-principal',
        access: 'read_only',
        args: [{ name: 'owner', type: 'principal' }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'name', type: { buffer: { length: 48 } } },
                  { name: 'namespace', type: { buffer: { length: 20 } } },
                ],
              },
              error: {
                tuple: [
                  { name: 'code', type: 'int128' },
                  {
                    name: 'name',
                    type: {
                      optional: {
                        tuple: [
                          { name: 'name', type: { buffer: { length: 48 } } },
                          { name: 'namespace', type: { buffer: { length: 20 } } },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      } as TypedAbiFunction<
        [owner: TypedAbiArg<string, 'owner'>],
        Response<
          {
            name: Uint8Array;
            namespace: Uint8Array;
          },
          {
            code: bigint;
            name: {
              name: Uint8Array;
              namespace: Uint8Array;
            } | null;
          }
        >
      >,
    },
    maps: {
      namePreorders: {
        name: 'name-preorders',
        key: {
          tuple: [
            { name: 'buyer', type: 'principal' },
            { name: 'hashed-salted-fqn', type: { buffer: { length: 20 } } },
          ],
        },
        value: {
          tuple: [
            { name: 'claimed', type: 'bool' },
            { name: 'created-at', type: 'uint128' },
            { name: 'stx-burned', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          buyer: string;
          hashedSaltedFqn: Uint8Array;
        },
        {
          claimed: boolean;
          createdAt: bigint;
          stxBurned: bigint;
        }
      >,
      nameProperties: {
        name: 'name-properties',
        key: {
          tuple: [
            { name: 'name', type: { buffer: { length: 48 } } },
            { name: 'namespace', type: { buffer: { length: 20 } } },
          ],
        },
        value: {
          tuple: [
            { name: 'imported-at', type: { optional: 'uint128' } },
            { name: 'registered-at', type: { optional: 'uint128' } },
            { name: 'revoked-at', type: { optional: 'uint128' } },
            { name: 'zonefile-hash', type: { buffer: { length: 20 } } },
          ],
        },
      } as TypedAbiMap<
        {
          name: Uint8Array;
          namespace: Uint8Array;
        },
        {
          importedAt: bigint | null;
          registeredAt: bigint | null;
          revokedAt: bigint | null;
          zonefileHash: Uint8Array;
        }
      >,
      namespacePreorders: {
        name: 'namespace-preorders',
        key: {
          tuple: [
            { name: 'buyer', type: 'principal' },
            { name: 'hashed-salted-namespace', type: { buffer: { length: 20 } } },
          ],
        },
        value: {
          tuple: [
            { name: 'claimed', type: 'bool' },
            { name: 'created-at', type: 'uint128' },
            { name: 'stx-burned', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          buyer: string;
          hashedSaltedNamespace: Uint8Array;
        },
        {
          claimed: boolean;
          createdAt: bigint;
          stxBurned: bigint;
        }
      >,
      namespaces: {
        name: 'namespaces',
        key: { buffer: { length: 20 } },
        value: {
          tuple: [
            { name: 'can-update-price-function', type: 'bool' },
            { name: 'launched-at', type: { optional: 'uint128' } },
            { name: 'lifetime', type: 'uint128' },
            { name: 'namespace-import', type: 'principal' },
            {
              name: 'price-function',
              type: {
                tuple: [
                  { name: 'base', type: 'uint128' },
                  { name: 'buckets', type: { list: { type: 'uint128', length: 16 } } },
                  { name: 'coeff', type: 'uint128' },
                  { name: 'no-vowel-discount', type: 'uint128' },
                  { name: 'nonalpha-discount', type: 'uint128' },
                ],
              },
            },
            { name: 'revealed-at', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        Uint8Array,
        {
          canUpdatePriceFunction: boolean;
          launchedAt: bigint | null;
          lifetime: bigint;
          namespaceImport: string;
          priceFunction: {
            base: bigint;
            buckets: bigint[];
            coeff: bigint;
            noVowelDiscount: bigint;
            nonalphaDiscount: bigint;
          };
          revealedAt: bigint;
        }
      >,
      ownerName: {
        name: 'owner-name',
        key: 'principal',
        value: {
          tuple: [
            { name: 'name', type: { buffer: { length: 48 } } },
            { name: 'namespace', type: { buffer: { length: 20 } } },
          ],
        },
      } as TypedAbiMap<
        string,
        {
          name: Uint8Array;
          namespace: Uint8Array;
        }
      >,
    },
    variables: {
      ERR_INSUFFICIENT_FUNDS: {
        name: 'ERR_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_ALREADY_EXISTS: {
        name: 'ERR_NAMESPACE_ALREADY_EXISTS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_ALREADY_LAUNCHED: {
        name: 'ERR_NAMESPACE_ALREADY_LAUNCHED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_BLANK: {
        name: 'ERR_NAMESPACE_BLANK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_CHARSET_INVALID: {
        name: 'ERR_NAMESPACE_CHARSET_INVALID',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_HASH_MALFORMED: {
        name: 'ERR_NAMESPACE_HASH_MALFORMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_NOT_FOUND: {
        name: 'ERR_NAMESPACE_NOT_FOUND',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_NOT_LAUNCHED: {
        name: 'ERR_NAMESPACE_NOT_LAUNCHED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_OPERATION_UNAUTHORIZED: {
        name: 'ERR_NAMESPACE_OPERATION_UNAUTHORIZED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PREORDER_ALREADY_EXISTS: {
        name: 'ERR_NAMESPACE_PREORDER_ALREADY_EXISTS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PREORDER_CLAIMABILITY_EXPIRED: {
        name: 'ERR_NAMESPACE_PREORDER_CLAIMABILITY_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PREORDER_EXPIRED: {
        name: 'ERR_NAMESPACE_PREORDER_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PREORDER_LAUNCHABILITY_EXPIRED: {
        name: 'ERR_NAMESPACE_PREORDER_LAUNCHABILITY_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PREORDER_NOT_FOUND: {
        name: 'ERR_NAMESPACE_PREORDER_NOT_FOUND',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_PRICE_FUNCTION_INVALID: {
        name: 'ERR_NAMESPACE_PRICE_FUNCTION_INVALID',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_STX_BURNT_INSUFFICIENT: {
        name: 'ERR_NAMESPACE_STX_BURNT_INSUFFICIENT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAMESPACE_UNAVAILABLE: {
        name: 'ERR_NAMESPACE_UNAVAILABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_ALREADY_CLAIMED: {
        name: 'ERR_NAME_ALREADY_CLAIMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_BLANK: {
        name: 'ERR_NAME_BLANK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_CHARSET_INVALID: {
        name: 'ERR_NAME_CHARSET_INVALID',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_CLAIMABILITY_EXPIRED: {
        name: 'ERR_NAME_CLAIMABILITY_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_COULD_NOT_BE_MINTED: {
        name: 'ERR_NAME_COULD_NOT_BE_MINTED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_COULD_NOT_BE_TRANSFERED: {
        name: 'ERR_NAME_COULD_NOT_BE_TRANSFERED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_EXPIRED: {
        name: 'ERR_NAME_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_GRACE_PERIOD: {
        name: 'ERR_NAME_GRACE_PERIOD',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_HASH_MALFORMED: {
        name: 'ERR_NAME_HASH_MALFORMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_NOT_FOUND: {
        name: 'ERR_NAME_NOT_FOUND',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_NOT_RESOLVABLE: {
        name: 'ERR_NAME_NOT_RESOLVABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_OPERATION_UNAUTHORIZED: {
        name: 'ERR_NAME_OPERATION_UNAUTHORIZED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_PREORDERED_BEFORE_NAMESPACE_LAUNCH: {
        name: 'ERR_NAME_PREORDERED_BEFORE_NAMESPACE_LAUNCH',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_PREORDER_ALREADY_EXISTS: {
        name: 'ERR_NAME_PREORDER_ALREADY_EXISTS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_PREORDER_EXPIRED: {
        name: 'ERR_NAME_PREORDER_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_PREORDER_FUNDS_INSUFFICIENT: {
        name: 'ERR_NAME_PREORDER_FUNDS_INSUFFICIENT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_PREORDER_NOT_FOUND: {
        name: 'ERR_NAME_PREORDER_NOT_FOUND',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_REVOKED: {
        name: 'ERR_NAME_REVOKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_STX_BURNT_INSUFFICIENT: {
        name: 'ERR_NAME_STX_BURNT_INSUFFICIENT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_TRANSFER_FAILED: {
        name: 'ERR_NAME_TRANSFER_FAILED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NAME_UNAVAILABLE: {
        name: 'ERR_NAME_UNAVAILABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_PANIC: {
        name: 'ERR_PANIC',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_PRINCIPAL_ALREADY_ASSOCIATED: {
        name: 'ERR_PRINCIPAL_ALREADY_ASSOCIATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      NAMESPACE_LAUNCHABILITY_TTL: {
        name: 'NAMESPACE_LAUNCHABILITY_TTL',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      NAMESPACE_PREORDER_CLAIMABILITY_TTL: {
        name: 'NAMESPACE_PREORDER_CLAIMABILITY_TTL',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      NAMESPACE_PRICE_TIERS: {
        name: 'NAMESPACE_PRICE_TIERS',
        type: {
          list: {
            type: 'uint128',
            length: 20,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<bigint[]>,
      NAME_GRACE_PERIOD_DURATION: {
        name: 'NAME_GRACE_PERIOD_DURATION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      NAME_PREORDER_CLAIMABILITY_TTL: {
        name: 'NAME_PREORDER_CLAIMABILITY_TTL',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      attachmentIndex: {
        name: 'attachment-index',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [
      {
        name: 'names',
        type: {
          tuple: [
            { name: 'name', type: { buffer: { length: 48 } } },
            { name: 'namespace', type: { buffer: { length: 20 } } },
          ],
        },
      },
    ],
    fungible_tokens: [],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'bns',
  },
  costVoting: {
    functions: {
      confirmMiners: {
        name: 'confirm-miners',
        access: 'public',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        Response<boolean, bigint>
      >,
      confirmVotes: {
        name: 'confirm-votes',
        access: 'public',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        Response<boolean, bigint>
      >,
      submitProposal: {
        name: 'submit-proposal',
        access: 'public',
        args: [
          { name: 'function-contract', type: 'principal' },
          { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
          { name: 'cost-function-contract', type: 'principal' },
          { name: 'cost-function-name', type: { 'string-ascii': { length: 128 } } },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<
        [
          functionContract: TypedAbiArg<string, 'functionContract'>,
          functionName: TypedAbiArg<string, 'functionName'>,
          costFunctionContract: TypedAbiArg<string, 'costFunctionContract'>,
          costFunctionName: TypedAbiArg<string, 'costFunctionName'>
        ],
        Response<bigint, null>
      >,
      veto: {
        name: 'veto',
        access: 'public',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        Response<boolean, bigint>
      >,
      voteProposal: {
        name: 'vote-proposal',
        access: 'public',
        args: [
          { name: 'proposal-id', type: 'uint128' },
          { name: 'amount', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          proposalId: TypedAbiArg<number | bigint, 'proposalId'>,
          amount: TypedAbiArg<number | bigint, 'amount'>
        ],
        Response<boolean, bigint>
      >,
      withdrawVotes: {
        name: 'withdraw-votes',
        access: 'public',
        args: [
          { name: 'proposal-id', type: 'uint128' },
          { name: 'amount', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          proposalId: TypedAbiArg<number | bigint, 'proposalId'>,
          amount: TypedAbiArg<number | bigint, 'amount'>
        ],
        Response<boolean, bigint>
      >,
      getConfirmedProposal: {
        name: 'get-confirmed-proposal',
        access: 'read_only',
        args: [{ name: 'confirmed-id', type: 'uint128' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'confirmed-height', type: 'uint128' },
                { name: 'cost-function-contract', type: 'principal' },
                { name: 'cost-function-name', type: { 'string-ascii': { length: 128 } } },
                { name: 'function-contract', type: 'principal' },
                { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [confirmedId: TypedAbiArg<number | bigint, 'confirmedId'>],
        {
          confirmedHeight: bigint;
          costFunctionContract: string;
          costFunctionName: string;
          functionContract: string;
          functionName: string;
        } | null
      >,
      getPrincipalVotes: {
        name: 'get-principal-votes',
        access: 'read_only',
        args: [
          { name: 'address', type: 'principal' },
          { name: 'proposal-id', type: 'uint128' },
        ],
        outputs: { type: { optional: 'uint128' } },
      } as TypedAbiFunction<
        [
          address: TypedAbiArg<string, 'address'>,
          proposalId: TypedAbiArg<number | bigint, 'proposalId'>
        ],
        bigint | null
      >,
      getProposal: {
        name: 'get-proposal',
        access: 'read_only',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'cost-function-contract', type: 'principal' },
                { name: 'cost-function-name', type: { 'string-ascii': { length: 128 } } },
                { name: 'expiration-block-height', type: 'uint128' },
                { name: 'function-contract', type: 'principal' },
                { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        {
          costFunctionContract: string;
          costFunctionName: string;
          expirationBlockHeight: bigint;
          functionContract: string;
          functionName: string;
        } | null
      >,
      getProposalVetos: {
        name: 'get-proposal-vetos',
        access: 'read_only',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: { type: { optional: 'uint128' } },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        bigint | null
      >,
      getProposalVotes: {
        name: 'get-proposal-votes',
        access: 'read_only',
        args: [{ name: 'proposal-id', type: 'uint128' }],
        outputs: { type: { optional: 'uint128' } },
      } as TypedAbiFunction<
        [proposalId: TypedAbiArg<number | bigint, 'proposalId'>],
        bigint | null
      >,
    },
    maps: {
      confirmedCountAtBlock: {
        name: 'confirmed-count-at-block',
        key: 'uint128',
        value: 'uint128',
      } as TypedAbiMap<number | bigint, bigint>,
      confirmedProposals: {
        name: 'confirmed-proposals',
        key: { tuple: [{ name: 'confirmed-id', type: 'uint128' }] },
        value: {
          tuple: [
            { name: 'confirmed-height', type: 'uint128' },
            { name: 'cost-function-contract', type: 'principal' },
            { name: 'cost-function-name', type: { 'string-ascii': { length: 128 } } },
            { name: 'function-contract', type: 'principal' },
            { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
          ],
        },
      } as TypedAbiMap<
        {
          confirmedId: number | bigint;
        },
        {
          confirmedHeight: bigint;
          costFunctionContract: string;
          costFunctionName: string;
          functionContract: string;
          functionName: string;
        }
      >,
      exercisedVeto: {
        name: 'exercised-veto',
        key: {
          tuple: [
            { name: 'proposal-id', type: 'uint128' },
            { name: 'veto-height', type: 'uint128' },
          ],
        },
        value: { tuple: [{ name: 'vetoed', type: 'bool' }] },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
          vetoHeight: number | bigint;
        },
        {
          vetoed: boolean;
        }
      >,
      functionsToConfirmedIds: {
        name: 'functions-to-confirmed-ids',
        key: {
          tuple: [
            { name: 'function-contract', type: 'principal' },
            { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
          ],
        },
        value: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          functionContract: string;
          functionName: string;
        },
        {
          proposalId: bigint;
        }
      >,
      principalProposalVotes: {
        name: 'principal-proposal-votes',
        key: {
          tuple: [
            { name: 'address', type: 'principal' },
            { name: 'proposal-id', type: 'uint128' },
          ],
        },
        value: { tuple: [{ name: 'votes', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          address: string;
          proposalId: number | bigint;
        },
        {
          votes: bigint;
        }
      >,
      proposalConfirmedId: {
        name: 'proposal-confirmed-id',
        key: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
        value: { tuple: [{ name: 'confirmed-id', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
        },
        {
          confirmedId: bigint;
        }
      >,
      proposalVetos: {
        name: 'proposal-vetos',
        key: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
        value: { tuple: [{ name: 'vetos', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
        },
        {
          vetos: bigint;
        }
      >,
      proposalVotes: {
        name: 'proposal-votes',
        key: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
        value: { tuple: [{ name: 'votes', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
        },
        {
          votes: bigint;
        }
      >,
      proposals: {
        name: 'proposals',
        key: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
        value: {
          tuple: [
            { name: 'cost-function-contract', type: 'principal' },
            { name: 'cost-function-name', type: { 'string-ascii': { length: 128 } } },
            { name: 'expiration-block-height', type: 'uint128' },
            { name: 'function-contract', type: 'principal' },
            { name: 'function-name', type: { 'string-ascii': { length: 128 } } },
          ],
        },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
        },
        {
          costFunctionContract: string;
          costFunctionName: string;
          expirationBlockHeight: bigint;
          functionContract: string;
          functionName: string;
        }
      >,
      voteConfirmedProposals: {
        name: 'vote-confirmed-proposals',
        key: { tuple: [{ name: 'proposal-id', type: 'uint128' }] },
        value: { tuple: [{ name: 'expiration-block-height', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          proposalId: number | bigint;
        },
        {
          expirationBlockHeight: bigint;
        }
      >,
    },
    variables: {
      ERR_ALREADY_VETOED: {
        name: 'ERR_ALREADY_VETOED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_AMOUNT_NOT_POSITIVE: {
        name: 'ERR_AMOUNT_NOT_POSITIVE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_FETCHING_BLOCK_INFO: {
        name: 'ERR_FETCHING_BLOCK_INFO',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_FT_TRANSFER: {
        name: 'ERR_FT_TRANSFER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INSUFFICIENT_FUNDS: {
        name: 'ERR_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INSUFFICIENT_VOTES: {
        name: 'ERR_INSUFFICIENT_VOTES',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_LAST_MINER: {
        name: 'ERR_NOT_LAST_MINER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NO_SUCH_PROPOSAL: {
        name: 'ERR_NO_SUCH_PROPOSAL',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_PROPOSAL_CONFIRMED: {
        name: 'ERR_PROPOSAL_CONFIRMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_PROPOSAL_EXPIRED: {
        name: 'ERR_PROPOSAL_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_PROPOSAL_VETOED: {
        name: 'ERR_PROPOSAL_VETOED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STX_TRANSFER: {
        name: 'ERR_STX_TRANSFER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_TOO_MANY_CONFIRMED: {
        name: 'ERR_TOO_MANY_CONFIRMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_UNREACHABLE: {
        name: 'ERR_UNREACHABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_VETO_PERIOD_NOT_OVER: {
        name: 'ERR_VETO_PERIOD_NOT_OVER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_VETO_PERIOD_OVER: {
        name: 'ERR_VETO_PERIOD_OVER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_VOTE_ENDED: {
        name: 'ERR_VOTE_ENDED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_VOTE_NOT_CONFIRMED: {
        name: 'ERR_VOTE_NOT_CONFIRMED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_CONFIRMED_PER_BLOCK: {
        name: 'MAX_CONFIRMED_PER_BLOCK',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REQUIRED_PERCENT_STX_VOTE: {
        name: 'REQUIRED_PERCENT_STX_VOTE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REQUIRED_VETOES: {
        name: 'REQUIRED_VETOES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      VETO_LENGTH: {
        name: 'VETO_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      VOTE_LENGTH: {
        name: 'VOTE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      confirmedProposalCount: {
        name: 'confirmed-proposal-count',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      proposalCount: {
        name: 'proposal-count',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [{ name: 'cost-vote-token' }],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'cost-voting',
  },
  costs: {
    functions: {
      linear: {
        name: 'linear',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      logn: {
        name: 'logn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      nlogn: {
        name: 'nlogn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      runtime: {
        name: 'runtime',
        access: 'private',
        args: [{ name: 'r', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [r: TypedAbiArg<number | bigint, 'r'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_add: {
        name: 'cost_add',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_bind_name: {
        name: 'cost_analysis_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_let: {
        name: 'cost_analysis_check_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_cons: {
        name: 'cost_analysis_check_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_get: {
        name: 'cost_analysis_check_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_merge: {
        name: 'cost_analysis_check_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_fetch_contract_entry: {
        name: 'cost_analysis_fetch_contract_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_get_function_entry: {
        name: 'cost_analysis_get_function_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_iterable_func: {
        name: 'cost_analysis_iterable_func',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_list_items_check: {
        name: 'cost_analysis_list_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function: {
        name: 'cost_analysis_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function_types: {
        name: 'cost_analysis_lookup_function_types',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_const: {
        name: 'cost_analysis_lookup_variable_const',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_depth: {
        name: 'cost_analysis_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_check: {
        name: 'cost_analysis_option_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_cons: {
        name: 'cost_analysis_option_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_storage: {
        name: 'cost_analysis_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_tuple_items_check: {
        name: 'cost_analysis_tuple_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_annotate: {
        name: 'cost_analysis_type_annotate',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_check: {
        name: 'cost_analysis_type_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_lookup: {
        name: 'cost_analysis_type_lookup',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_use_trait_entry: {
        name: 'cost_analysis_use_trait_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_visit: {
        name: 'cost_analysis_visit',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_and: {
        name: 'cost_and',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_append: {
        name: 'cost_append',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_as_max_len: {
        name: 'cost_as_max_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_asserts: {
        name: 'cost_asserts',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_cycle_detection: {
        name: 'cost_ast_cycle_detection',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_parse: {
        name: 'cost_ast_parse',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_at_block: {
        name: 'cost_at_block',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_begin: {
        name: 'cost_begin',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bind_name: {
        name: 'cost_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_block_info: {
        name: 'cost_block_info',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_concat: {
        name: 'cost_concat',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_call: {
        name: 'cost_contract_call',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_of: {
        name: 'cost_contract_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_storage: {
        name: 'cost_contract_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_ft: {
        name: 'cost_create_ft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_map: {
        name: 'cost_create_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_nft: {
        name: 'cost_create_nft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_var: {
        name: 'cost_create_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_data_hash_cost: {
        name: 'cost_data_hash_cost',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_default_to: {
        name: 'cost_default_to',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_div: {
        name: 'cost_div',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_element_at: {
        name: 'cost_element_at',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_eq: {
        name: 'cost_eq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_err_cons: {
        name: 'cost_err_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_entry: {
        name: 'cost_fetch_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_var: {
        name: 'cost_fetch_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_filter: {
        name: 'cost_filter',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fold: {
        name: 'cost_fold',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_balance: {
        name: 'cost_ft_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_burn: {
        name: 'cost_ft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_get_supply: {
        name: 'cost_ft_get_supply',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_mint: {
        name: 'cost_ft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_transfer: {
        name: 'cost_ft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ge: {
        name: 'cost_ge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_geq: {
        name: 'cost_geq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_hash160: {
        name: 'cost_hash160',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_if: {
        name: 'cost_if',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_index_of: {
        name: 'cost_index_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_inner_type_check_cost: {
        name: 'cost_inner_type_check_cost',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_int_cast: {
        name: 'cost_int_cast',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_err: {
        name: 'cost_is_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_none: {
        name: 'cost_is_none',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_okay: {
        name: 'cost_is_okay',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_some: {
        name: 'cost_is_some',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_keccak256: {
        name: 'cost_keccak256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_le: {
        name: 'cost_le',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_len: {
        name: 'cost_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_leq: {
        name: 'cost_leq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_let: {
        name: 'cost_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_list_cons: {
        name: 'cost_list_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_load_contract: {
        name: 'cost_load_contract',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_log2: {
        name: 'cost_log2',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_function: {
        name: 'cost_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_depth: {
        name: 'cost_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_size: {
        name: 'cost_lookup_variable_size',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_map: {
        name: 'cost_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_match: {
        name: 'cost_match',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mod: {
        name: 'cost_mod',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mul: {
        name: 'cost_mul',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_burn: {
        name: 'cost_nft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_mint: {
        name: 'cost_nft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_owner: {
        name: 'cost_nft_owner',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_transfer: {
        name: 'cost_nft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_not: {
        name: 'cost_not',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ok_cons: {
        name: 'cost_ok_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_or: {
        name: 'cost_or',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_pow: {
        name: 'cost_pow',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_principal_of: {
        name: 'cost_principal_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_print: {
        name: 'cost_print',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1recover: {
        name: 'cost_secp256k1recover',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1verify: {
        name: 'cost_secp256k1verify',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_entry: {
        name: 'cost_set_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_var: {
        name: 'cost_set_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha256: {
        name: 'cost_sha256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512: {
        name: 'cost_sha512',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512t256: {
        name: 'cost_sha512t256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_some_cons: {
        name: 'cost_some_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sqrti: {
        name: 'cost_sqrti',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_balance: {
        name: 'cost_stx_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_transfer: {
        name: 'cost_stx_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sub: {
        name: 'cost_sub',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_try_ret: {
        name: 'cost_try_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_cons: {
        name: 'cost_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_get: {
        name: 'cost_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_merge: {
        name: 'cost_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_type_parse_step: {
        name: 'cost_type_parse_step',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap: {
        name: 'cost_unwrap',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err: {
        name: 'cost_unwrap_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err_or_ret: {
        name: 'cost_unwrap_err_or_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_ret: {
        name: 'cost_unwrap_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_user_function_application: {
        name: 'cost_user_function_application',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_xor: {
        name: 'cost_xor',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      poison_microblock: {
        name: 'poison_microblock',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'costs',
  },
  costs2: {
    functions: {
      linear: {
        name: 'linear',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      logn: {
        name: 'logn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      nlogn: {
        name: 'nlogn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      runtime: {
        name: 'runtime',
        access: 'private',
        args: [{ name: 'r', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [r: TypedAbiArg<number | bigint, 'r'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_add: {
        name: 'cost_add',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_bind_name: {
        name: 'cost_analysis_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_let: {
        name: 'cost_analysis_check_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_cons: {
        name: 'cost_analysis_check_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_get: {
        name: 'cost_analysis_check_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_merge: {
        name: 'cost_analysis_check_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_fetch_contract_entry: {
        name: 'cost_analysis_fetch_contract_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_get_function_entry: {
        name: 'cost_analysis_get_function_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_iterable_func: {
        name: 'cost_analysis_iterable_func',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_list_items_check: {
        name: 'cost_analysis_list_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function: {
        name: 'cost_analysis_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function_types: {
        name: 'cost_analysis_lookup_function_types',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_const: {
        name: 'cost_analysis_lookup_variable_const',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_depth: {
        name: 'cost_analysis_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_check: {
        name: 'cost_analysis_option_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_cons: {
        name: 'cost_analysis_option_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_storage: {
        name: 'cost_analysis_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_tuple_items_check: {
        name: 'cost_analysis_tuple_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_annotate: {
        name: 'cost_analysis_type_annotate',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_check: {
        name: 'cost_analysis_type_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_lookup: {
        name: 'cost_analysis_type_lookup',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_use_trait_entry: {
        name: 'cost_analysis_use_trait_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_visit: {
        name: 'cost_analysis_visit',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_and: {
        name: 'cost_and',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_append: {
        name: 'cost_append',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_as_max_len: {
        name: 'cost_as_max_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_asserts: {
        name: 'cost_asserts',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_cycle_detection: {
        name: 'cost_ast_cycle_detection',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_parse: {
        name: 'cost_ast_parse',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_at_block: {
        name: 'cost_at_block',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_begin: {
        name: 'cost_begin',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bind_name: {
        name: 'cost_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_block_info: {
        name: 'cost_block_info',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_concat: {
        name: 'cost_concat',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_call: {
        name: 'cost_contract_call',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_of: {
        name: 'cost_contract_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_storage: {
        name: 'cost_contract_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_ft: {
        name: 'cost_create_ft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_map: {
        name: 'cost_create_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_nft: {
        name: 'cost_create_nft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_var: {
        name: 'cost_create_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_default_to: {
        name: 'cost_default_to',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_div: {
        name: 'cost_div',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_element_at: {
        name: 'cost_element_at',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_eq: {
        name: 'cost_eq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_err_cons: {
        name: 'cost_err_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_entry: {
        name: 'cost_fetch_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_var: {
        name: 'cost_fetch_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_filter: {
        name: 'cost_filter',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fold: {
        name: 'cost_fold',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_balance: {
        name: 'cost_ft_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_burn: {
        name: 'cost_ft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_get_supply: {
        name: 'cost_ft_get_supply',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_mint: {
        name: 'cost_ft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_transfer: {
        name: 'cost_ft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ge: {
        name: 'cost_ge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_geq: {
        name: 'cost_geq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_hash160: {
        name: 'cost_hash160',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_if: {
        name: 'cost_if',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_index_of: {
        name: 'cost_index_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_inner_type_check_cost: {
        name: 'cost_inner_type_check_cost',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_int_cast: {
        name: 'cost_int_cast',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_err: {
        name: 'cost_is_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_none: {
        name: 'cost_is_none',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_okay: {
        name: 'cost_is_okay',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_some: {
        name: 'cost_is_some',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_keccak256: {
        name: 'cost_keccak256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_le: {
        name: 'cost_le',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_len: {
        name: 'cost_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_leq: {
        name: 'cost_leq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_let: {
        name: 'cost_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_list_cons: {
        name: 'cost_list_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_load_contract: {
        name: 'cost_load_contract',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_log2: {
        name: 'cost_log2',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_function: {
        name: 'cost_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_depth: {
        name: 'cost_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_size: {
        name: 'cost_lookup_variable_size',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_map: {
        name: 'cost_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_match: {
        name: 'cost_match',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mod: {
        name: 'cost_mod',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mul: {
        name: 'cost_mul',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_burn: {
        name: 'cost_nft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_mint: {
        name: 'cost_nft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_owner: {
        name: 'cost_nft_owner',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_transfer: {
        name: 'cost_nft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_not: {
        name: 'cost_not',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ok_cons: {
        name: 'cost_ok_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_or: {
        name: 'cost_or',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_pow: {
        name: 'cost_pow',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_principal_of: {
        name: 'cost_principal_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_print: {
        name: 'cost_print',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1recover: {
        name: 'cost_secp256k1recover',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1verify: {
        name: 'cost_secp256k1verify',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_entry: {
        name: 'cost_set_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_var: {
        name: 'cost_set_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha256: {
        name: 'cost_sha256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512: {
        name: 'cost_sha512',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512t256: {
        name: 'cost_sha512t256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_some_cons: {
        name: 'cost_some_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sqrti: {
        name: 'cost_sqrti',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_balance: {
        name: 'cost_stx_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_transfer: {
        name: 'cost_stx_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sub: {
        name: 'cost_sub',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_try_ret: {
        name: 'cost_try_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_cons: {
        name: 'cost_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_get: {
        name: 'cost_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_merge: {
        name: 'cost_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_type_parse_step: {
        name: 'cost_type_parse_step',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap: {
        name: 'cost_unwrap',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err: {
        name: 'cost_unwrap_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err_or_ret: {
        name: 'cost_unwrap_err_or_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_ret: {
        name: 'cost_unwrap_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_user_function_application: {
        name: 'cost_user_function_application',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_xor: {
        name: 'cost_xor',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      poison_microblock: {
        name: 'poison_microblock',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'costs-2',
  },
  costs3: {
    functions: {
      linear: {
        name: 'linear',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      logn: {
        name: 'logn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      nlogn: {
        name: 'nlogn',
        access: 'private',
        args: [
          { name: 'n', type: 'uint128' },
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          n: TypedAbiArg<number | bigint, 'n'>,
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>
        ],
        bigint
      >,
      runtime: {
        name: 'runtime',
        access: 'private',
        args: [{ name: 'r', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [r: TypedAbiArg<number | bigint, 'r'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_add: {
        name: 'cost_add',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_bind_name: {
        name: 'cost_analysis_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_let: {
        name: 'cost_analysis_check_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_cons: {
        name: 'cost_analysis_check_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_get: {
        name: 'cost_analysis_check_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_check_tuple_merge: {
        name: 'cost_analysis_check_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_fetch_contract_entry: {
        name: 'cost_analysis_fetch_contract_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_get_function_entry: {
        name: 'cost_analysis_get_function_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_iterable_func: {
        name: 'cost_analysis_iterable_func',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_list_items_check: {
        name: 'cost_analysis_list_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function: {
        name: 'cost_analysis_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_function_types: {
        name: 'cost_analysis_lookup_function_types',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_const: {
        name: 'cost_analysis_lookup_variable_const',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_lookup_variable_depth: {
        name: 'cost_analysis_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_check: {
        name: 'cost_analysis_option_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_option_cons: {
        name: 'cost_analysis_option_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_storage: {
        name: 'cost_analysis_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_tuple_items_check: {
        name: 'cost_analysis_tuple_items_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_annotate: {
        name: 'cost_analysis_type_annotate',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_check: {
        name: 'cost_analysis_type_check',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_type_lookup: {
        name: 'cost_analysis_type_lookup',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_use_trait_entry: {
        name: 'cost_analysis_use_trait_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_analysis_visit: {
        name: 'cost_analysis_visit',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_and: {
        name: 'cost_and',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_append: {
        name: 'cost_append',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_as_contract: {
        name: 'cost_as_contract',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_as_max_len: {
        name: 'cost_as_max_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_asserts: {
        name: 'cost_asserts',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_cycle_detection: {
        name: 'cost_ast_cycle_detection',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ast_parse: {
        name: 'cost_ast_parse',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_at_block: {
        name: 'cost_at_block',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_begin: {
        name: 'cost_begin',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bind_name: {
        name: 'cost_bind_name',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bitwise_and: {
        name: 'cost_bitwise_and',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bitwise_left_shift: {
        name: 'cost_bitwise_left_shift',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bitwise_not: {
        name: 'cost_bitwise_not',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bitwise_or: {
        name: 'cost_bitwise_or',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_bitwise_right_shift: {
        name: 'cost_bitwise_right_shift',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_block_info: {
        name: 'cost_block_info',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_buff_to_int_be: {
        name: 'cost_buff_to_int_be',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_buff_to_int_le: {
        name: 'cost_buff_to_int_le',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_buff_to_uint_be: {
        name: 'cost_buff_to_uint_be',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_buff_to_uint_le: {
        name: 'cost_buff_to_uint_le',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_burn_block_info: {
        name: 'cost_burn_block_info',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_concat: {
        name: 'cost_concat',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_call: {
        name: 'cost_contract_call',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_of: {
        name: 'cost_contract_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_contract_storage: {
        name: 'cost_contract_storage',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_ft: {
        name: 'cost_create_ft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_map: {
        name: 'cost_create_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_nft: {
        name: 'cost_create_nft',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_create_var: {
        name: 'cost_create_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_default_to: {
        name: 'cost_default_to',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_div: {
        name: 'cost_div',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_element_at: {
        name: 'cost_element_at',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_eq: {
        name: 'cost_eq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_err_cons: {
        name: 'cost_err_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_entry: {
        name: 'cost_fetch_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fetch_var: {
        name: 'cost_fetch_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_filter: {
        name: 'cost_filter',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_fold: {
        name: 'cost_fold',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_from_consensus_buff: {
        name: 'cost_from_consensus_buff',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_balance: {
        name: 'cost_ft_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_burn: {
        name: 'cost_ft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_get_supply: {
        name: 'cost_ft_get_supply',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_mint: {
        name: 'cost_ft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ft_transfer: {
        name: 'cost_ft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ge: {
        name: 'cost_ge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_geq: {
        name: 'cost_geq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_hash160: {
        name: 'cost_hash160',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_if: {
        name: 'cost_if',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_index_of: {
        name: 'cost_index_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_inner_type_check_cost: {
        name: 'cost_inner_type_check_cost',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_int_cast: {
        name: 'cost_int_cast',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_int_to_ascii: {
        name: 'cost_int_to_ascii',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_int_to_utf8: {
        name: 'cost_int_to_utf8',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_err: {
        name: 'cost_is_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_none: {
        name: 'cost_is_none',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_okay: {
        name: 'cost_is_okay',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_some: {
        name: 'cost_is_some',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_is_standard: {
        name: 'cost_is_standard',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_keccak256: {
        name: 'cost_keccak256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_le: {
        name: 'cost_le',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_len: {
        name: 'cost_len',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_leq: {
        name: 'cost_leq',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_let: {
        name: 'cost_let',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_list_cons: {
        name: 'cost_list_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_load_contract: {
        name: 'cost_load_contract',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_log2: {
        name: 'cost_log2',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_function: {
        name: 'cost_lookup_function',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_depth: {
        name: 'cost_lookup_variable_depth',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_lookup_variable_size: {
        name: 'cost_lookup_variable_size',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_map: {
        name: 'cost_map',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_match: {
        name: 'cost_match',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mod: {
        name: 'cost_mod',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_mul: {
        name: 'cost_mul',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_burn: {
        name: 'cost_nft_burn',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_mint: {
        name: 'cost_nft_mint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_owner: {
        name: 'cost_nft_owner',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_nft_transfer: {
        name: 'cost_nft_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_not: {
        name: 'cost_not',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_ok_cons: {
        name: 'cost_ok_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_or: {
        name: 'cost_or',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_pow: {
        name: 'cost_pow',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_principal_construct: {
        name: 'cost_principal_construct',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_principal_destruct: {
        name: 'cost_principal_destruct',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_principal_of: {
        name: 'cost_principal_of',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_print: {
        name: 'cost_print',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_replace_at: {
        name: 'cost_replace_at',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1recover: {
        name: 'cost_secp256k1recover',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_secp256k1verify: {
        name: 'cost_secp256k1verify',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_entry: {
        name: 'cost_set_entry',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_set_var: {
        name: 'cost_set_var',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha256: {
        name: 'cost_sha256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512: {
        name: 'cost_sha512',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sha512t256: {
        name: 'cost_sha512t256',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_slice: {
        name: 'cost_slice',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_some_cons: {
        name: 'cost_some_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sqrti: {
        name: 'cost_sqrti',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_string_to_int: {
        name: 'cost_string_to_int',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_string_to_uint: {
        name: 'cost_string_to_uint',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_account: {
        name: 'cost_stx_account',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_balance: {
        name: 'cost_stx_balance',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_transfer: {
        name: 'cost_stx_transfer',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_stx_transfer_memo: {
        name: 'cost_stx_transfer_memo',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_sub: {
        name: 'cost_sub',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_to_consensus_buff: {
        name: 'cost_to_consensus_buff',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_try_ret: {
        name: 'cost_try_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_cons: {
        name: 'cost_tuple_cons',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_get: {
        name: 'cost_tuple_get',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_tuple_merge: {
        name: 'cost_tuple_merge',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_type_parse_step: {
        name: 'cost_type_parse_step',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap: {
        name: 'cost_unwrap',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err: {
        name: 'cost_unwrap_err',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_err_or_ret: {
        name: 'cost_unwrap_err_or_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_unwrap_ret: {
        name: 'cost_unwrap_ret',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_user_function_application: {
        name: 'cost_user_function_application',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      cost_xor: {
        name: 'cost_xor',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
      poison_microblock: {
        name: 'poison_microblock',
        access: 'read_only',
        args: [{ name: 'n', type: 'uint128' }],
        outputs: {
          type: {
            tuple: [
              { name: 'read_count', type: 'uint128' },
              { name: 'read_length', type: 'uint128' },
              { name: 'runtime', type: 'uint128' },
              { name: 'write_count', type: 'uint128' },
              { name: 'write_length', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, 'n'>],
        {
          read_count: bigint;
          read_length: bigint;
          runtime: bigint;
          write_count: bigint;
          write_length: bigint;
        }
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch21',
    clarity_version: 'Clarity2',
    contractName: 'costs-3',
  },
  lockup: {
    functions: {
      getLockups: {
        name: 'get-lockups',
        access: 'read_only',
        args: [{ name: 'stx-block-height-opt', type: { optional: 'uint128' } }],
        outputs: {
          type: {
            response: {
              ok: {
                list: {
                  type: {
                    tuple: [
                      { name: 'amount', type: 'uint128' },
                      { name: 'recipient', type: 'principal' },
                    ],
                  },
                  length: 4430,
                },
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [stxBlockHeightOpt: TypedAbiArg<number | bigint | null, 'stxBlockHeightOpt'>],
        Response<
          {
            amount: bigint;
            recipient: string;
          }[],
          null
        >
      >,
    },
    maps: {
      lockups: {
        name: 'lockups',
        key: 'uint128',
        value: {
          list: {
            type: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipient', type: 'principal' },
              ],
            },
            length: 4430,
          },
        },
      } as TypedAbiMap<
        number | bigint,
        {
          amount: bigint;
          recipient: string;
        }[]
      >,
    },
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'lockup',
  },
  pox: {
    functions: {
      addPoxAddrToIthRewardCycle: {
        name: 'add-pox-addr-to-ith-reward-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'i', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 20 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'first-reward-cycle', type: 'uint128' },
              { name: 'i', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 20 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              firstRewardCycle: number | bigint;
              i: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          i: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
        }
      >,
      addPoxAddrToRewardCycles: {
        name: 'add-pox-addr-to-reward-cycles',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        Response<boolean, bigint>
      >,
      addPoxPartialStacked: {
        name: 'add-pox-partial-stacked',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        boolean
      >,
      addPoxPartialStackedToIthCycle: {
        name: 'add-pox-partial-stacked-to-ith-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 20 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-cycle', type: 'uint128' },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 20 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-cycle', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardCycle: number | bigint;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: bigint;
        }
      >,
      appendRewardCyclePoxAddr: {
        name: 'append-reward-cycle-pox-addr',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        bigint
      >,
      burnHeightToRewardCycle: {
        name: 'burn-height-to-reward-cycle',
        access: 'private',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], bigint>,
      checkCallerAllowed: {
        name: 'check-caller-allowed',
        access: 'private',
        args: [],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[], boolean>,
      checkPoxAddrVersion: {
        name: 'check-pox-addr-version',
        access: 'private',
        args: [{ name: 'version', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[version: TypedAbiArg<Uint8Array, 'version'>], boolean>,
      checkPoxLockPeriod: {
        name: 'check-pox-lock-period',
        access: 'private',
        args: [{ name: 'lock-period', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>], boolean>,
      currentPoxRewardCycle: {
        name: 'current-pox-reward-cycle',
        access: 'private',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getCheckDelegation: {
        name: 'get-check-delegation',
        access: 'private',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 20 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      nextCycleRejectionVotes: {
        name: 'next-cycle-rejection-votes',
        access: 'private',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      rewardCycleToBurnHeight: {
        name: 'reward-cycle-to-burn-height',
        access: 'private',
        args: [{ name: 'cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[cycle: TypedAbiArg<number | bigint, 'cycle'>], bigint>,
      allowContractCaller: {
        name: 'allow-contract-caller',
        access: 'public',
        args: [
          { name: 'caller', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          caller: TypedAbiArg<string, 'caller'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>
        ],
        Response<boolean, bigint>
      >,
      delegateStackStx: {
        name: 'delegate-stack-stx',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStx: {
        name: 'delegate-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'delegate-to', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
          {
            name: 'pox-addr',
            type: {
              optional: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 20 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          delegateTo: TypedAbiArg<string, 'delegateTo'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            } | null,
            'poxAddr'
          >
        ],
        Response<boolean, bigint>
      >,
      disallowContractCaller: {
        name: 'disallow-contract-caller',
        access: 'public',
        args: [{ name: 'caller', type: 'principal' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[caller: TypedAbiArg<string, 'caller'>], Response<boolean, bigint>>,
      rejectPox: {
        name: 'reject-pox',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      revokeDelegateStx: {
        name: 'revoke-delegate-stx',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setBurnchainParameters: {
        name: 'set-burnchain-parameters',
        access: 'public',
        args: [
          { name: 'first-burn-height', type: 'uint128' },
          { name: 'prepare-cycle-length', type: 'uint128' },
          { name: 'reward-cycle-length', type: 'uint128' },
          { name: 'rejection-fraction', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          firstBurnHeight: TypedAbiArg<number | bigint, 'firstBurnHeight'>,
          prepareCycleLength: TypedAbiArg<number | bigint, 'prepareCycleLength'>,
          rewardCycleLength: TypedAbiArg<number | bigint, 'rewardCycleLength'>,
          rejectionFraction: TypedAbiArg<number | bigint, 'rejectionFraction'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommit: {
        name: 'stack-aggregation-commit',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      stackStx: {
        name: 'stack-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      canStackStx: {
        name: 'can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      getPoxInfo: {
        name: 'get-pox-info',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'current-rejection-votes', type: 'uint128' },
                  { name: 'first-burnchain-block-height', type: 'uint128' },
                  { name: 'min-amount-ustx', type: 'uint128' },
                  { name: 'prepare-cycle-length', type: 'uint128' },
                  { name: 'rejection-fraction', type: 'uint128' },
                  { name: 'reward-cycle-id', type: 'uint128' },
                  { name: 'reward-cycle-length', type: 'uint128' },
                  { name: 'total-liquid-supply-ustx', type: 'uint128' },
                ],
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            currentRejectionVotes: bigint;
            firstBurnchainBlockHeight: bigint;
            minAmountUstx: bigint;
            prepareCycleLength: bigint;
            rejectionFraction: bigint;
            rewardCycleId: bigint;
            rewardCycleLength: bigint;
            totalLiquidSupplyUstx: bigint;
          },
          null
        >
      >,
      getPoxRejection: {
        name: 'get-pox-rejection',
        access: 'read_only',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        {
          amount: bigint;
        } | null
      >,
      getRewardSetPoxAddress: {
        name: 'get-reward-set-pox-address',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'index', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 20 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'total-ustx', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          index: TypedAbiArg<number | bigint, 'index'>
        ],
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          totalUstx: bigint;
        } | null
      >,
      getRewardSetSize: {
        name: 'get-reward-set-size',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getStackerInfo: {
        name: 'get-stacker-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'lock-period', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 20 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
        } | null
      >,
      getStackingMinimum: {
        name: 'get-stacking-minimum',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getTotalUstxStacked: {
        name: 'get-total-ustx-stacked',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      isPoxActive: {
        name: 'is-pox-active',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], boolean>,
      minimalCanStackStx: {
        name: 'minimal-can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 20 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {
      allowanceContractCallers: {
        name: 'allowance-contract-callers',
        key: {
          tuple: [
            { name: 'contract-caller', type: 'principal' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] },
      } as TypedAbiMap<
        {
          contractCaller: string;
          sender: string;
        },
        {
          untilBurnHt: bigint | null;
        }
      >,
      delegationState: {
        name: 'delegation-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'amount-ustx', type: 'uint128' },
            { name: 'delegated-to', type: 'principal' },
            {
              name: 'pox-addr',
              type: {
                optional: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 20 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
            },
            { name: 'until-burn-ht', type: { optional: 'uint128' } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        }
      >,
      partialStackedByCycle: {
        name: 'partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 20 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      rewardCyclePoxAddressList: {
        name: 'reward-cycle-pox-address-list',
        key: {
          tuple: [
            { name: 'index', type: 'uint128' },
            { name: 'reward-cycle', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 20 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'total-ustx', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          index: number | bigint;
          rewardCycle: number | bigint;
        },
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          totalUstx: bigint;
        }
      >,
      rewardCyclePoxAddressListLen: {
        name: 'reward-cycle-pox-address-list-len',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'len', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          len: bigint;
        }
      >,
      rewardCycleTotalStacked: {
        name: 'reward-cycle-total-stacked',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'total-ustx', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          totalUstx: bigint;
        }
      >,
      stackingRejection: {
        name: 'stacking-rejection',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          amount: bigint;
        }
      >,
      stackingRejectors: {
        name: 'stacking-rejectors',
        key: {
          tuple: [
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'stacker', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
          stacker: string;
        },
        {
          amount: bigint;
        }
      >,
      stackingState: {
        name: 'stacking-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'amount-ustx', type: 'uint128' },
            { name: 'first-reward-cycle', type: 'uint128' },
            { name: 'lock-period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 20 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
        }
      >,
    },
    variables: {
      aDDRESS_VERSION_P2PKH: {
        name: 'ADDRESS_VERSION_P2PKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2SH: {
        name: 'ADDRESS_VERSION_P2SH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WPKH: {
        name: 'ADDRESS_VERSION_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WSH: {
        name: 'ADDRESS_VERSION_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      ERR_DELEGATION_EXPIRES_DURING_LOCK: {
        name: 'ERR_DELEGATION_EXPIRES_DURING_LOCK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_POX_ADDR_REQUIRED: {
        name: 'ERR_DELEGATION_POX_ADDR_REQUIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_TOO_MUCH_LOCKED: {
        name: 'ERR_DELEGATION_TOO_MUCH_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_START_BURN_HEIGHT: {
        name: 'ERR_INVALID_START_BURN_HEIGHT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_ALLOWED: {
        name: 'ERR_NOT_ALLOWED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_DELEGATED: {
        name: 'ERR_STACKING_ALREADY_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_REJECTED: {
        name: 'ERR_STACKING_ALREADY_REJECTED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_STACKED: {
        name: 'ERR_STACKING_ALREADY_STACKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_EXPIRED: {
        name: 'ERR_STACKING_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INSUFFICIENT_FUNDS: {
        name: 'ERR_STACKING_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_AMOUNT: {
        name: 'ERR_STACKING_INVALID_AMOUNT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_LOCK_PERIOD: {
        name: 'ERR_STACKING_INVALID_LOCK_PERIOD',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_POX_ADDRESS: {
        name: 'ERR_STACKING_INVALID_POX_ADDRESS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NO_SUCH_PRINCIPAL: {
        name: 'ERR_STACKING_NO_SUCH_PRINCIPAL',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_PERMISSION_DENIED: {
        name: 'ERR_STACKING_PERMISSION_DENIED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_POX_ADDRESS_IN_USE: {
        name: 'ERR_STACKING_POX_ADDRESS_IN_USE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_STX_LOCKED: {
        name: 'ERR_STACKING_STX_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_THRESHOLD_NOT_MET: {
        name: 'ERR_STACKING_THRESHOLD_NOT_MET',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_UNREACHABLE: {
        name: 'ERR_STACKING_UNREACHABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_POX_REWARD_CYCLES: {
        name: 'MAX_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MIN_POX_REWARD_CYCLES: {
        name: 'MIN_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      POX_REJECTION_FRACTION: {
        name: 'POX_REJECTION_FRACTION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      PREPARE_CYCLE_LENGTH: {
        name: 'PREPARE_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REWARD_CYCLE_LENGTH: {
        name: 'REWARD_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_100: {
        name: 'STACKING_THRESHOLD_100',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_25: {
        name: 'STACKING_THRESHOLD_25',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      configured: {
        name: 'configured',
        type: 'bool',
        access: 'variable',
      } as TypedAbiVariable<boolean>,
      firstBurnchainBlockHeight: {
        name: 'first-burnchain-block-height',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxPrepareCycleLength: {
        name: 'pox-prepare-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRejectionFraction: {
        name: 'pox-rejection-fraction',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRewardCycleLength: {
        name: 'pox-reward-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch20',
    clarity_version: 'Clarity1',
    contractName: 'pox',
  },
  pox2: {
    functions: {
      addPoxAddrToIthRewardCycle: {
        name: 'add-pox-addr-to-ith-reward-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'i', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
                { name: 'stacker', type: { optional: 'principal' } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'first-reward-cycle', type: 'uint128' },
              { name: 'i', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              { name: 'stacker', type: { optional: 'principal' } },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              firstRewardCycle: number | bigint;
              i: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardSetIndexes: number | bigint[];
              stacker: string | null;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          i: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
          stacker: string | null;
        }
      >,
      addPoxAddrToRewardCycles: {
        name: 'add-pox-addr-to-reward-cycles',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: 'principal' },
        ],
        outputs: {
          type: { response: { ok: { list: { type: 'uint128', length: 12 } }, error: 'int128' } },
        },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string, 'stacker'>
        ],
        Response<bigint[], bigint>
      >,
      addPoxPartialStacked: {
        name: 'add-pox-partial-stacked',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        boolean
      >,
      addPoxPartialStackedToIthCycle: {
        name: 'add-pox-partial-stacked-to-ith-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-cycle', type: 'uint128' },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-cycle', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardCycle: number | bigint;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: bigint;
        }
      >,
      appendRewardCyclePoxAddr: {
        name: 'append-reward-cycle-pox-addr',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: { optional: 'principal' } },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string | null, 'stacker'>
        ],
        bigint
      >,
      foldUnlockRewardCycle: {
        name: 'fold-unlock-reward-cycle',
        access: 'private',
        args: [
          { name: 'set-index', type: 'uint128' },
          {
            name: 'data-res',
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: 'cycle', type: 'uint128' },
                    { name: 'first-unlocked-cycle', type: 'uint128' },
                    { name: 'stacker', type: 'principal' },
                  ],
                },
                error: 'int128',
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'cycle', type: 'uint128' },
                  { name: 'first-unlocked-cycle', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          setIndex: TypedAbiArg<number | bigint, 'setIndex'>,
          dataRes: TypedAbiArg<
            Response<
              {
                cycle: number | bigint;
                firstUnlockedCycle: number | bigint;
                stacker: string;
              },
              number | bigint
            >,
            'dataRes'
          >
        ],
        Response<
          {
            cycle: bigint;
            firstUnlockedCycle: bigint;
            stacker: string;
          },
          bigint
        >
      >,
      handleUnlock: {
        name: 'handle-unlock',
        access: 'private',
        args: [
          { name: 'user', type: 'principal' },
          { name: 'amount-locked', type: 'uint128' },
          { name: 'cycle-to-unlock', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          user: TypedAbiArg<string, 'user'>,
          amountLocked: TypedAbiArg<number | bigint, 'amountLocked'>,
          cycleToUnlock: TypedAbiArg<number | bigint, 'cycleToUnlock'>
        ],
        Response<boolean, bigint>
      >,
      increaseRewardCycleEntry: {
        name: 'increase-reward-cycle-entry',
        access: 'private',
        args: [
          { name: 'reward-cycle-index', type: 'uint128' },
          {
            name: 'updates',
            type: {
              optional: {
                tuple: [
                  { name: 'add-amount', type: 'uint128' },
                  { name: 'first-cycle', type: 'uint128' },
                  { name: 'reward-cycle', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                ],
              },
            },
          },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'add-amount', type: 'uint128' },
                { name: 'first-cycle', type: 'uint128' },
                { name: 'reward-cycle', type: 'uint128' },
                { name: 'stacker', type: 'principal' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>,
          updates: TypedAbiArg<
            {
              addAmount: number | bigint;
              firstCycle: number | bigint;
              rewardCycle: number | bigint;
              stacker: string;
            } | null,
            'updates'
          >
        ],
        {
          addAmount: bigint;
          firstCycle: bigint;
          rewardCycle: bigint;
          stacker: string;
        } | null
      >,
      innerStackAggregationCommit: {
        name: 'inner-stack-aggregation-commit',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<bigint, bigint>
      >,
      allowContractCaller: {
        name: 'allow-contract-caller',
        access: 'public',
        args: [
          { name: 'caller', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          caller: TypedAbiArg<string, 'caller'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>
        ],
        Response<boolean, bigint>
      >,
      delegateStackExtend: {
        name: 'delegate-stack-extend',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'extend-count', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStackIncrease: {
        name: 'delegate-stack-increase',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'increase-by', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>
        ],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      delegateStackStx: {
        name: 'delegate-stack-stx',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStx: {
        name: 'delegate-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'delegate-to', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
          {
            name: 'pox-addr',
            type: {
              optional: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          delegateTo: TypedAbiArg<string, 'delegateTo'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            } | null,
            'poxAddr'
          >
        ],
        Response<boolean, bigint>
      >,
      disallowContractCaller: {
        name: 'disallow-contract-caller',
        access: 'public',
        args: [{ name: 'caller', type: 'principal' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[caller: TypedAbiArg<string, 'caller'>], Response<boolean, bigint>>,
      rejectPox: {
        name: 'reject-pox',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      revokeDelegateStx: {
        name: 'revoke-delegate-stx',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setBurnchainParameters: {
        name: 'set-burnchain-parameters',
        access: 'public',
        args: [
          { name: 'first-burn-height', type: 'uint128' },
          { name: 'prepare-cycle-length', type: 'uint128' },
          { name: 'reward-cycle-length', type: 'uint128' },
          { name: 'rejection-fraction', type: 'uint128' },
          { name: 'begin-2-1-reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          firstBurnHeight: TypedAbiArg<number | bigint, 'firstBurnHeight'>,
          prepareCycleLength: TypedAbiArg<number | bigint, 'prepareCycleLength'>,
          rewardCycleLength: TypedAbiArg<number | bigint, 'rewardCycleLength'>,
          rejectionFraction: TypedAbiArg<number | bigint, 'rejectionFraction'>,
          begin21RewardCycle: TypedAbiArg<number | bigint, 'begin21RewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommit: {
        name: 'stack-aggregation-commit',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommitIndexed: {
        name: 'stack-aggregation-commit-indexed',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<bigint, bigint>
      >,
      stackAggregationIncrease: {
        name: 'stack-aggregation-increase',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'reward-cycle-index', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>
        ],
        Response<boolean, bigint>
      >,
      stackExtend: {
        name: 'stack-extend',
        access: 'public',
        args: [
          { name: 'extend-count', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      stackIncrease: {
        name: 'stack-increase',
        access: 'public',
        args: [{ name: 'increase-by', type: 'uint128' }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      stackStx: {
        name: 'stack-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      burnHeightToRewardCycle: {
        name: 'burn-height-to-reward-cycle',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], bigint>,
      canStackStx: {
        name: 'can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      checkCallerAllowed: {
        name: 'check-caller-allowed',
        access: 'read_only',
        args: [],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[], boolean>,
      checkPoxAddrHashbytes: {
        name: 'check-pox-addr-hashbytes',
        access: 'read_only',
        args: [
          { name: 'version', type: { buffer: { length: 1 } } },
          { name: 'hashbytes', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          version: TypedAbiArg<Uint8Array, 'version'>,
          hashbytes: TypedAbiArg<Uint8Array, 'hashbytes'>
        ],
        boolean
      >,
      checkPoxAddrVersion: {
        name: 'check-pox-addr-version',
        access: 'read_only',
        args: [{ name: 'version', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[version: TypedAbiArg<Uint8Array, 'version'>], boolean>,
      checkPoxLockPeriod: {
        name: 'check-pox-lock-period',
        access: 'read_only',
        args: [{ name: 'lock-period', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>], boolean>,
      currentPoxRewardCycle: {
        name: 'current-pox-reward-cycle',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getAllowanceContractCallers: {
        name: 'get-allowance-contract-callers',
        access: 'read_only',
        args: [
          { name: 'sender', type: 'principal' },
          { name: 'calling-contract', type: 'principal' },
        ],
        outputs: {
          type: { optional: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] } },
        },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, 'sender'>,
          callingContract: TypedAbiArg<string, 'callingContract'>
        ],
        {
          untilBurnHt: bigint | null;
        } | null
      >,
      getCheckDelegation: {
        name: 'get-check-delegation',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getDelegationInfo: {
        name: 'get-delegation-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getNumRewardSetPoxAddresses: {
        name: 'get-num-reward-set-pox-addresses',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getPartialStackedByCycle: {
        name: 'get-partial-stacked-by-cycle',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'sender', type: 'principal' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          sender: TypedAbiArg<string, 'sender'>
        ],
        {
          stackedAmount: bigint;
        } | null
      >,
      getPoxInfo: {
        name: 'get-pox-info',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'current-rejection-votes', type: 'uint128' },
                  { name: 'first-burnchain-block-height', type: 'uint128' },
                  { name: 'min-amount-ustx', type: 'uint128' },
                  { name: 'prepare-cycle-length', type: 'uint128' },
                  { name: 'rejection-fraction', type: 'uint128' },
                  { name: 'reward-cycle-id', type: 'uint128' },
                  { name: 'reward-cycle-length', type: 'uint128' },
                  { name: 'total-liquid-supply-ustx', type: 'uint128' },
                ],
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            currentRejectionVotes: bigint;
            firstBurnchainBlockHeight: bigint;
            minAmountUstx: bigint;
            prepareCycleLength: bigint;
            rejectionFraction: bigint;
            rewardCycleId: bigint;
            rewardCycleLength: bigint;
            totalLiquidSupplyUstx: bigint;
          },
          null
        >
      >,
      getPoxRejection: {
        name: 'get-pox-rejection',
        access: 'read_only',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        {
          amount: bigint;
        } | null
      >,
      getRewardSetPoxAddress: {
        name: 'get-reward-set-pox-address',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'index', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'stacker', type: { optional: 'principal' } },
                { name: 'total-ustx', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          index: TypedAbiArg<number | bigint, 'index'>
        ],
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          stacker: string | null;
          totalUstx: bigint;
        } | null
      >,
      getRewardSetSize: {
        name: 'get-reward-set-size',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getStackerInfo: {
        name: 'get-stacker-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'lock-period', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        } | null
      >,
      getStackingMinimum: {
        name: 'get-stacking-minimum',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getTotalPoxRejection: {
        name: 'get-total-pox-rejection',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getTotalUstxStacked: {
        name: 'get-total-ustx-stacked',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      isPoxActive: {
        name: 'is-pox-active',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], boolean>,
      minimalCanStackStx: {
        name: 'minimal-can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      nextCycleRejectionVotes: {
        name: 'next-cycle-rejection-votes',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      rewardCycleToBurnHeight: {
        name: 'reward-cycle-to-burn-height',
        access: 'read_only',
        args: [{ name: 'cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[cycle: TypedAbiArg<number | bigint, 'cycle'>], bigint>,
    },
    maps: {
      allowanceContractCallers: {
        name: 'allowance-contract-callers',
        key: {
          tuple: [
            { name: 'contract-caller', type: 'principal' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] },
      } as TypedAbiMap<
        {
          contractCaller: string;
          sender: string;
        },
        {
          untilBurnHt: bigint | null;
        }
      >,
      delegationState: {
        name: 'delegation-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'amount-ustx', type: 'uint128' },
            { name: 'delegated-to', type: 'principal' },
            {
              name: 'pox-addr',
              type: {
                optional: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
            },
            { name: 'until-burn-ht', type: { optional: 'uint128' } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        }
      >,
      loggedPartialStackedByCycle: {
        name: 'logged-partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      partialStackedByCycle: {
        name: 'partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      rewardCyclePoxAddressList: {
        name: 'reward-cycle-pox-address-list',
        key: {
          tuple: [
            { name: 'index', type: 'uint128' },
            { name: 'reward-cycle', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'stacker', type: { optional: 'principal' } },
            { name: 'total-ustx', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          index: number | bigint;
          rewardCycle: number | bigint;
        },
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          stacker: string | null;
          totalUstx: bigint;
        }
      >,
      rewardCyclePoxAddressListLen: {
        name: 'reward-cycle-pox-address-list-len',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'len', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          len: bigint;
        }
      >,
      rewardCycleTotalStacked: {
        name: 'reward-cycle-total-stacked',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'total-ustx', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          totalUstx: bigint;
        }
      >,
      stackingRejection: {
        name: 'stacking-rejection',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          amount: bigint;
        }
      >,
      stackingRejectors: {
        name: 'stacking-rejectors',
        key: {
          tuple: [
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'stacker', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
          stacker: string;
        },
        {
          amount: bigint;
        }
      >,
      stackingState: {
        name: 'stacking-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'first-reward-cycle', type: 'uint128' },
            { name: 'lock-period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        }
      >,
    },
    variables: {
      aDDRESS_VERSION_NATIVE_P2TR: {
        name: 'ADDRESS_VERSION_NATIVE_P2TR',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WPKH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WSH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2PKH: {
        name: 'ADDRESS_VERSION_P2PKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2SH: {
        name: 'ADDRESS_VERSION_P2SH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WPKH: {
        name: 'ADDRESS_VERSION_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WSH: {
        name: 'ADDRESS_VERSION_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      ERR_DELEGATION_EXPIRES_DURING_LOCK: {
        name: 'ERR_DELEGATION_EXPIRES_DURING_LOCK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_NO_REWARD_SLOT: {
        name: 'ERR_DELEGATION_NO_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_POX_ADDR_REQUIRED: {
        name: 'ERR_DELEGATION_POX_ADDR_REQUIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_TOO_MUCH_LOCKED: {
        name: 'ERR_DELEGATION_TOO_MUCH_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_WRONG_REWARD_SLOT: {
        name: 'ERR_DELEGATION_WRONG_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_START_BURN_HEIGHT: {
        name: 'ERR_INVALID_START_BURN_HEIGHT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_ALLOWED: {
        name: 'ERR_NOT_ALLOWED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_CURRENT_STACKER: {
        name: 'ERR_NOT_CURRENT_STACKER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_DELEGATED: {
        name: 'ERR_STACKING_ALREADY_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_REJECTED: {
        name: 'ERR_STACKING_ALREADY_REJECTED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_STACKED: {
        name: 'ERR_STACKING_ALREADY_STACKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_CORRUPTED_STATE: {
        name: 'ERR_STACKING_CORRUPTED_STATE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_EXPIRED: {
        name: 'ERR_STACKING_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INSUFFICIENT_FUNDS: {
        name: 'ERR_STACKING_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_AMOUNT: {
        name: 'ERR_STACKING_INVALID_AMOUNT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_LOCK_PERIOD: {
        name: 'ERR_STACKING_INVALID_LOCK_PERIOD',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_POX_ADDRESS: {
        name: 'ERR_STACKING_INVALID_POX_ADDRESS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NO_SUCH_PRINCIPAL: {
        name: 'ERR_STACKING_NO_SUCH_PRINCIPAL',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_PERMISSION_DENIED: {
        name: 'ERR_STACKING_PERMISSION_DENIED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_POX_ADDRESS_IN_USE: {
        name: 'ERR_STACKING_POX_ADDRESS_IN_USE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_STX_LOCKED: {
        name: 'ERR_STACKING_STX_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_THRESHOLD_NOT_MET: {
        name: 'ERR_STACKING_THRESHOLD_NOT_MET',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_UNREACHABLE: {
        name: 'ERR_STACKING_UNREACHABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_EXTEND_NOT_LOCKED: {
        name: 'ERR_STACK_EXTEND_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_INCREASE_NOT_LOCKED: {
        name: 'ERR_STACK_INCREASE_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_ADDRESS_VERSION: {
        name: 'MAX_ADDRESS_VERSION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_20: {
        name: 'MAX_ADDRESS_VERSION_BUFF_20',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_32: {
        name: 'MAX_ADDRESS_VERSION_BUFF_32',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_POX_REWARD_CYCLES: {
        name: 'MAX_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MIN_POX_REWARD_CYCLES: {
        name: 'MIN_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      POX_REJECTION_FRACTION: {
        name: 'POX_REJECTION_FRACTION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      PREPARE_CYCLE_LENGTH: {
        name: 'PREPARE_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REWARD_CYCLE_LENGTH: {
        name: 'REWARD_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_100: {
        name: 'STACKING_THRESHOLD_100',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_25: {
        name: 'STACKING_THRESHOLD_25',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      configured: {
        name: 'configured',
        type: 'bool',
        access: 'variable',
      } as TypedAbiVariable<boolean>,
      first21RewardCycle: {
        name: 'first-2-1-reward-cycle',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      firstBurnchainBlockHeight: {
        name: 'first-burnchain-block-height',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxPrepareCycleLength: {
        name: 'pox-prepare-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRejectionFraction: {
        name: 'pox-rejection-fraction',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRewardCycleLength: {
        name: 'pox-reward-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch21',
    clarity_version: 'Clarity2',
    contractName: 'pox-2',
  },
  pox3: {
    functions: {
      addPoxAddrToIthRewardCycle: {
        name: 'add-pox-addr-to-ith-reward-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'i', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
                { name: 'stacker', type: { optional: 'principal' } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'first-reward-cycle', type: 'uint128' },
              { name: 'i', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              { name: 'stacker', type: { optional: 'principal' } },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              firstRewardCycle: number | bigint;
              i: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardSetIndexes: number | bigint[];
              stacker: string | null;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          i: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
          stacker: string | null;
        }
      >,
      addPoxAddrToRewardCycles: {
        name: 'add-pox-addr-to-reward-cycles',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: 'principal' },
        ],
        outputs: {
          type: { response: { ok: { list: { type: 'uint128', length: 12 } }, error: 'int128' } },
        },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string, 'stacker'>
        ],
        Response<bigint[], bigint>
      >,
      addPoxPartialStacked: {
        name: 'add-pox-partial-stacked',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        boolean
      >,
      addPoxPartialStackedToIthCycle: {
        name: 'add-pox-partial-stacked-to-ith-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-cycle', type: 'uint128' },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-cycle', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardCycle: number | bigint;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: bigint;
        }
      >,
      appendRewardCyclePoxAddr: {
        name: 'append-reward-cycle-pox-addr',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: { optional: 'principal' } },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string | null, 'stacker'>
        ],
        bigint
      >,
      foldUnlockRewardCycle: {
        name: 'fold-unlock-reward-cycle',
        access: 'private',
        args: [
          { name: 'set-index', type: 'uint128' },
          {
            name: 'data-res',
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: 'cycle', type: 'uint128' },
                    { name: 'first-unlocked-cycle', type: 'uint128' },
                    { name: 'stacker', type: 'principal' },
                  ],
                },
                error: 'int128',
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'cycle', type: 'uint128' },
                  { name: 'first-unlocked-cycle', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          setIndex: TypedAbiArg<number | bigint, 'setIndex'>,
          dataRes: TypedAbiArg<
            Response<
              {
                cycle: number | bigint;
                firstUnlockedCycle: number | bigint;
                stacker: string;
              },
              number | bigint
            >,
            'dataRes'
          >
        ],
        Response<
          {
            cycle: bigint;
            firstUnlockedCycle: bigint;
            stacker: string;
          },
          bigint
        >
      >,
      handleUnlock: {
        name: 'handle-unlock',
        access: 'private',
        args: [
          { name: 'user', type: 'principal' },
          { name: 'amount-locked', type: 'uint128' },
          { name: 'cycle-to-unlock', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          user: TypedAbiArg<string, 'user'>,
          amountLocked: TypedAbiArg<number | bigint, 'amountLocked'>,
          cycleToUnlock: TypedAbiArg<number | bigint, 'cycleToUnlock'>
        ],
        Response<boolean, bigint>
      >,
      increaseRewardCycleEntry: {
        name: 'increase-reward-cycle-entry',
        access: 'private',
        args: [
          { name: 'reward-cycle-index', type: 'uint128' },
          {
            name: 'updates',
            type: {
              optional: {
                tuple: [
                  { name: 'add-amount', type: 'uint128' },
                  { name: 'first-cycle', type: 'uint128' },
                  { name: 'reward-cycle', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                ],
              },
            },
          },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'add-amount', type: 'uint128' },
                { name: 'first-cycle', type: 'uint128' },
                { name: 'reward-cycle', type: 'uint128' },
                { name: 'stacker', type: 'principal' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>,
          updates: TypedAbiArg<
            {
              addAmount: number | bigint;
              firstCycle: number | bigint;
              rewardCycle: number | bigint;
              stacker: string;
            } | null,
            'updates'
          >
        ],
        {
          addAmount: bigint;
          firstCycle: bigint;
          rewardCycle: bigint;
          stacker: string;
        } | null
      >,
      innerStackAggregationCommit: {
        name: 'inner-stack-aggregation-commit',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<bigint, bigint>
      >,
      allowContractCaller: {
        name: 'allow-contract-caller',
        access: 'public',
        args: [
          { name: 'caller', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          caller: TypedAbiArg<string, 'caller'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>
        ],
        Response<boolean, bigint>
      >,
      delegateStackExtend: {
        name: 'delegate-stack-extend',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'extend-count', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStackIncrease: {
        name: 'delegate-stack-increase',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'increase-by', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>
        ],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      delegateStackStx: {
        name: 'delegate-stack-stx',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStx: {
        name: 'delegate-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'delegate-to', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
          {
            name: 'pox-addr',
            type: {
              optional: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          delegateTo: TypedAbiArg<string, 'delegateTo'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            } | null,
            'poxAddr'
          >
        ],
        Response<boolean, bigint>
      >,
      disallowContractCaller: {
        name: 'disallow-contract-caller',
        access: 'public',
        args: [{ name: 'caller', type: 'principal' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[caller: TypedAbiArg<string, 'caller'>], Response<boolean, bigint>>,
      rejectPox: {
        name: 'reject-pox',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      revokeDelegateStx: {
        name: 'revoke-delegate-stx',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setBurnchainParameters: {
        name: 'set-burnchain-parameters',
        access: 'public',
        args: [
          { name: 'first-burn-height', type: 'uint128' },
          { name: 'prepare-cycle-length', type: 'uint128' },
          { name: 'reward-cycle-length', type: 'uint128' },
          { name: 'rejection-fraction', type: 'uint128' },
          { name: 'begin-2-1-reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          firstBurnHeight: TypedAbiArg<number | bigint, 'firstBurnHeight'>,
          prepareCycleLength: TypedAbiArg<number | bigint, 'prepareCycleLength'>,
          rewardCycleLength: TypedAbiArg<number | bigint, 'rewardCycleLength'>,
          rejectionFraction: TypedAbiArg<number | bigint, 'rejectionFraction'>,
          begin21RewardCycle: TypedAbiArg<number | bigint, 'begin21RewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommit: {
        name: 'stack-aggregation-commit',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommitIndexed: {
        name: 'stack-aggregation-commit-indexed',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<bigint, bigint>
      >,
      stackAggregationIncrease: {
        name: 'stack-aggregation-increase',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'reward-cycle-index', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>
        ],
        Response<boolean, bigint>
      >,
      stackExtend: {
        name: 'stack-extend',
        access: 'public',
        args: [
          { name: 'extend-count', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      stackIncrease: {
        name: 'stack-increase',
        access: 'public',
        args: [{ name: 'increase-by', type: 'uint128' }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      stackStx: {
        name: 'stack-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      burnHeightToRewardCycle: {
        name: 'burn-height-to-reward-cycle',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], bigint>,
      canStackStx: {
        name: 'can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      checkCallerAllowed: {
        name: 'check-caller-allowed',
        access: 'read_only',
        args: [],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[], boolean>,
      checkPoxAddrHashbytes: {
        name: 'check-pox-addr-hashbytes',
        access: 'read_only',
        args: [
          { name: 'version', type: { buffer: { length: 1 } } },
          { name: 'hashbytes', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          version: TypedAbiArg<Uint8Array, 'version'>,
          hashbytes: TypedAbiArg<Uint8Array, 'hashbytes'>
        ],
        boolean
      >,
      checkPoxAddrVersion: {
        name: 'check-pox-addr-version',
        access: 'read_only',
        args: [{ name: 'version', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[version: TypedAbiArg<Uint8Array, 'version'>], boolean>,
      checkPoxLockPeriod: {
        name: 'check-pox-lock-period',
        access: 'read_only',
        args: [{ name: 'lock-period', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>], boolean>,
      currentPoxRewardCycle: {
        name: 'current-pox-reward-cycle',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getAllowanceContractCallers: {
        name: 'get-allowance-contract-callers',
        access: 'read_only',
        args: [
          { name: 'sender', type: 'principal' },
          { name: 'calling-contract', type: 'principal' },
        ],
        outputs: {
          type: { optional: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] } },
        },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, 'sender'>,
          callingContract: TypedAbiArg<string, 'callingContract'>
        ],
        {
          untilBurnHt: bigint | null;
        } | null
      >,
      getCheckDelegation: {
        name: 'get-check-delegation',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getDelegationInfo: {
        name: 'get-delegation-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getNumRewardSetPoxAddresses: {
        name: 'get-num-reward-set-pox-addresses',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getPartialStackedByCycle: {
        name: 'get-partial-stacked-by-cycle',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'sender', type: 'principal' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          sender: TypedAbiArg<string, 'sender'>
        ],
        {
          stackedAmount: bigint;
        } | null
      >,
      getPoxInfo: {
        name: 'get-pox-info',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'current-rejection-votes', type: 'uint128' },
                  { name: 'first-burnchain-block-height', type: 'uint128' },
                  { name: 'min-amount-ustx', type: 'uint128' },
                  { name: 'prepare-cycle-length', type: 'uint128' },
                  { name: 'rejection-fraction', type: 'uint128' },
                  { name: 'reward-cycle-id', type: 'uint128' },
                  { name: 'reward-cycle-length', type: 'uint128' },
                  { name: 'total-liquid-supply-ustx', type: 'uint128' },
                ],
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            currentRejectionVotes: bigint;
            firstBurnchainBlockHeight: bigint;
            minAmountUstx: bigint;
            prepareCycleLength: bigint;
            rejectionFraction: bigint;
            rewardCycleId: bigint;
            rewardCycleLength: bigint;
            totalLiquidSupplyUstx: bigint;
          },
          null
        >
      >,
      getPoxRejection: {
        name: 'get-pox-rejection',
        access: 'read_only',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        {
          amount: bigint;
        } | null
      >,
      getRewardSetPoxAddress: {
        name: 'get-reward-set-pox-address',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'index', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'stacker', type: { optional: 'principal' } },
                { name: 'total-ustx', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          index: TypedAbiArg<number | bigint, 'index'>
        ],
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          stacker: string | null;
          totalUstx: bigint;
        } | null
      >,
      getRewardSetSize: {
        name: 'get-reward-set-size',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getStackerInfo: {
        name: 'get-stacker-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'delegated-to', type: { optional: 'principal' } },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'lock-period', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          delegatedTo: string | null;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        } | null
      >,
      getStackingMinimum: {
        name: 'get-stacking-minimum',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getTotalPoxRejection: {
        name: 'get-total-pox-rejection',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getTotalUstxStacked: {
        name: 'get-total-ustx-stacked',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      isPoxActive: {
        name: 'is-pox-active',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], boolean>,
      minimalCanStackStx: {
        name: 'minimal-can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      nextCycleRejectionVotes: {
        name: 'next-cycle-rejection-votes',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      rewardCycleToBurnHeight: {
        name: 'reward-cycle-to-burn-height',
        access: 'read_only',
        args: [{ name: 'cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[cycle: TypedAbiArg<number | bigint, 'cycle'>], bigint>,
    },
    maps: {
      allowanceContractCallers: {
        name: 'allowance-contract-callers',
        key: {
          tuple: [
            { name: 'contract-caller', type: 'principal' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] },
      } as TypedAbiMap<
        {
          contractCaller: string;
          sender: string;
        },
        {
          untilBurnHt: bigint | null;
        }
      >,
      delegationState: {
        name: 'delegation-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'amount-ustx', type: 'uint128' },
            { name: 'delegated-to', type: 'principal' },
            {
              name: 'pox-addr',
              type: {
                optional: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
            },
            { name: 'until-burn-ht', type: { optional: 'uint128' } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        }
      >,
      loggedPartialStackedByCycle: {
        name: 'logged-partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      partialStackedByCycle: {
        name: 'partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      rewardCyclePoxAddressList: {
        name: 'reward-cycle-pox-address-list',
        key: {
          tuple: [
            { name: 'index', type: 'uint128' },
            { name: 'reward-cycle', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'stacker', type: { optional: 'principal' } },
            { name: 'total-ustx', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          index: number | bigint;
          rewardCycle: number | bigint;
        },
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          stacker: string | null;
          totalUstx: bigint;
        }
      >,
      rewardCyclePoxAddressListLen: {
        name: 'reward-cycle-pox-address-list-len',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'len', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          len: bigint;
        }
      >,
      rewardCycleTotalStacked: {
        name: 'reward-cycle-total-stacked',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'total-ustx', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          totalUstx: bigint;
        }
      >,
      stackingRejection: {
        name: 'stacking-rejection',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          amount: bigint;
        }
      >,
      stackingRejectors: {
        name: 'stacking-rejectors',
        key: {
          tuple: [
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'stacker', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
          stacker: string;
        },
        {
          amount: bigint;
        }
      >,
      stackingState: {
        name: 'stacking-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'delegated-to', type: { optional: 'principal' } },
            { name: 'first-reward-cycle', type: 'uint128' },
            { name: 'lock-period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          delegatedTo: string | null;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        }
      >,
    },
    variables: {
      aDDRESS_VERSION_NATIVE_P2TR: {
        name: 'ADDRESS_VERSION_NATIVE_P2TR',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WPKH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WSH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2PKH: {
        name: 'ADDRESS_VERSION_P2PKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2SH: {
        name: 'ADDRESS_VERSION_P2SH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WPKH: {
        name: 'ADDRESS_VERSION_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WSH: {
        name: 'ADDRESS_VERSION_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      ERR_DELEGATION_EXPIRES_DURING_LOCK: {
        name: 'ERR_DELEGATION_EXPIRES_DURING_LOCK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_NO_REWARD_SLOT: {
        name: 'ERR_DELEGATION_NO_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_POX_ADDR_REQUIRED: {
        name: 'ERR_DELEGATION_POX_ADDR_REQUIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_TOO_MUCH_LOCKED: {
        name: 'ERR_DELEGATION_TOO_MUCH_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_WRONG_REWARD_SLOT: {
        name: 'ERR_DELEGATION_WRONG_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_START_BURN_HEIGHT: {
        name: 'ERR_INVALID_START_BURN_HEIGHT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_ALLOWED: {
        name: 'ERR_NOT_ALLOWED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_CURRENT_STACKER: {
        name: 'ERR_NOT_CURRENT_STACKER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_DELEGATED: {
        name: 'ERR_STACKING_ALREADY_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_REJECTED: {
        name: 'ERR_STACKING_ALREADY_REJECTED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_STACKED: {
        name: 'ERR_STACKING_ALREADY_STACKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_CORRUPTED_STATE: {
        name: 'ERR_STACKING_CORRUPTED_STATE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_EXPIRED: {
        name: 'ERR_STACKING_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INSUFFICIENT_FUNDS: {
        name: 'ERR_STACKING_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_AMOUNT: {
        name: 'ERR_STACKING_INVALID_AMOUNT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_LOCK_PERIOD: {
        name: 'ERR_STACKING_INVALID_LOCK_PERIOD',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_POX_ADDRESS: {
        name: 'ERR_STACKING_INVALID_POX_ADDRESS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_IS_DELEGATED: {
        name: 'ERR_STACKING_IS_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NOT_DELEGATED: {
        name: 'ERR_STACKING_NOT_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NO_SUCH_PRINCIPAL: {
        name: 'ERR_STACKING_NO_SUCH_PRINCIPAL',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_PERMISSION_DENIED: {
        name: 'ERR_STACKING_PERMISSION_DENIED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_POX_ADDRESS_IN_USE: {
        name: 'ERR_STACKING_POX_ADDRESS_IN_USE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_STX_LOCKED: {
        name: 'ERR_STACKING_STX_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_THRESHOLD_NOT_MET: {
        name: 'ERR_STACKING_THRESHOLD_NOT_MET',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_UNREACHABLE: {
        name: 'ERR_STACKING_UNREACHABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_EXTEND_NOT_LOCKED: {
        name: 'ERR_STACK_EXTEND_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_INCREASE_NOT_LOCKED: {
        name: 'ERR_STACK_INCREASE_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_ADDRESS_VERSION: {
        name: 'MAX_ADDRESS_VERSION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_20: {
        name: 'MAX_ADDRESS_VERSION_BUFF_20',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_32: {
        name: 'MAX_ADDRESS_VERSION_BUFF_32',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_POX_REWARD_CYCLES: {
        name: 'MAX_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MIN_POX_REWARD_CYCLES: {
        name: 'MIN_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      POX_REJECTION_FRACTION: {
        name: 'POX_REJECTION_FRACTION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      PREPARE_CYCLE_LENGTH: {
        name: 'PREPARE_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REWARD_CYCLE_LENGTH: {
        name: 'REWARD_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_100: {
        name: 'STACKING_THRESHOLD_100',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sTACKING_THRESHOLD_25: {
        name: 'STACKING_THRESHOLD_25',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      configured: {
        name: 'configured',
        type: 'bool',
        access: 'variable',
      } as TypedAbiVariable<boolean>,
      first21RewardCycle: {
        name: 'first-2-1-reward-cycle',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      firstBurnchainBlockHeight: {
        name: 'first-burnchain-block-height',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxPrepareCycleLength: {
        name: 'pox-prepare-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRejectionFraction: {
        name: 'pox-rejection-fraction',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRewardCycleLength: {
        name: 'pox-reward-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch24',
    clarity_version: 'Clarity2',
    contractName: 'pox-3',
  },
  pox4: {
    functions: {
      addPoxAddrToIthRewardCycle: {
        name: 'add-pox-addr-to-ith-reward-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'i', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
                { name: 'signer', type: { buffer: { length: 33 } } },
                { name: 'stacker', type: { optional: 'principal' } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'first-reward-cycle', type: 'uint128' },
              { name: 'i', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              { name: 'signer', type: { buffer: { length: 33 } } },
              { name: 'stacker', type: { optional: 'principal' } },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              firstRewardCycle: number | bigint;
              i: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardSetIndexes: number | bigint[];
              signer: Uint8Array;
              stacker: string | null;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          i: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
          signer: Uint8Array;
          stacker: string | null;
        }
      >,
      addPoxAddrToRewardCycles: {
        name: 'add-pox-addr-to-reward-cycles',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: 'principal' },
          { name: 'signer', type: { buffer: { length: 33 } } },
        ],
        outputs: {
          type: { response: { ok: { list: { type: 'uint128', length: 12 } }, error: 'int128' } },
        },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string, 'stacker'>,
          signer: TypedAbiArg<Uint8Array, 'signer'>
        ],
        Response<bigint[], bigint>
      >,
      addPoxPartialStacked: {
        name: 'add-pox-partial-stacked',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>
        ],
        boolean
      >,
      addPoxPartialStackedToIthCycle: {
        name: 'add-pox-partial-stacked-to-ith-cycle',
        access: 'private',
        args: [
          { name: 'cycle-index', type: 'uint128' },
          {
            name: 'params',
            type: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'num-cycles', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-cycle', type: 'uint128' },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'amount-ustx', type: 'uint128' },
              { name: 'num-cycles', type: 'uint128' },
              {
                name: 'pox-addr',
                type: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
              { name: 'reward-cycle', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, 'cycleIndex'>,
          params: TypedAbiArg<
            {
              amountUstx: number | bigint;
              numCycles: number | bigint;
              poxAddr: {
                hashbytes: Uint8Array;
                version: Uint8Array;
              };
              rewardCycle: number | bigint;
            },
            'params'
          >
        ],
        {
          amountUstx: bigint;
          numCycles: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: bigint;
        }
      >,
      appendRewardCyclePoxAddr: {
        name: 'append-reward-cycle-pox-addr',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'stacker', type: { optional: 'principal' } },
          { name: 'signer', type: { buffer: { length: 33 } } },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          stacker: TypedAbiArg<string | null, 'stacker'>,
          signer: TypedAbiArg<Uint8Array, 'signer'>
        ],
        bigint
      >,
      consumeSignerKeyAuthorization: {
        name: 'consume-signer-key-authorization',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          { name: 'period', type: 'uint128' },
          { name: 'signer-sig-opt', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'amount', type: 'uint128' },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          topic: TypedAbiArg<string, 'topic'>,
          period: TypedAbiArg<number | bigint, 'period'>,
          signerSigOpt: TypedAbiArg<Uint8Array | null, 'signerSigOpt'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          amount: TypedAbiArg<number | bigint, 'amount'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<boolean, bigint>
      >,
      increaseRewardCycleEntry: {
        name: 'increase-reward-cycle-entry',
        access: 'private',
        args: [
          { name: 'reward-cycle-index', type: 'uint128' },
          {
            name: 'updates',
            type: {
              optional: {
                tuple: [
                  { name: 'add-amount', type: 'uint128' },
                  { name: 'first-cycle', type: 'uint128' },
                  { name: 'reward-cycle', type: 'uint128' },
                  { name: 'signer-key', type: { buffer: { length: 33 } } },
                  { name: 'stacker', type: 'principal' },
                ],
              },
            },
          },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'add-amount', type: 'uint128' },
                { name: 'first-cycle', type: 'uint128' },
                { name: 'reward-cycle', type: 'uint128' },
                { name: 'signer-key', type: { buffer: { length: 33 } } },
                { name: 'stacker', type: 'principal' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>,
          updates: TypedAbiArg<
            {
              addAmount: number | bigint;
              firstCycle: number | bigint;
              rewardCycle: number | bigint;
              signerKey: Uint8Array;
              stacker: string;
            } | null,
            'updates'
          >
        ],
        {
          addAmount: bigint;
          firstCycle: bigint;
          rewardCycle: bigint;
          signerKey: Uint8Array;
          stacker: string;
        } | null
      >,
      innerStackAggregationCommit: {
        name: 'inner-stack-aggregation-commit',
        access: 'private',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<bigint, bigint>
      >,
      allowContractCaller: {
        name: 'allow-contract-caller',
        access: 'public',
        args: [
          { name: 'caller', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          caller: TypedAbiArg<string, 'caller'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>
        ],
        Response<boolean, bigint>
      >,
      delegateStackExtend: {
        name: 'delegate-stack-extend',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'extend-count', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStackIncrease: {
        name: 'delegate-stack-increase',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'increase-by', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>
        ],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      delegateStackStx: {
        name: 'delegate-stack-stx',
        access: 'public',
        args: [
          { name: 'stacker', type: 'principal' },
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          stacker: TypedAbiArg<string, 'stacker'>,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>
        ],
        Response<
          {
            lockAmount: bigint;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      delegateStx: {
        name: 'delegate-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'delegate-to', type: 'principal' },
          { name: 'until-burn-ht', type: { optional: 'uint128' } },
          {
            name: 'pox-addr',
            type: {
              optional: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          delegateTo: TypedAbiArg<string, 'delegateTo'>,
          untilBurnHt: TypedAbiArg<number | bigint | null, 'untilBurnHt'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            } | null,
            'poxAddr'
          >
        ],
        Response<boolean, bigint>
      >,
      disallowContractCaller: {
        name: 'disallow-contract-caller',
        access: 'public',
        args: [{ name: 'caller', type: 'principal' }],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<[caller: TypedAbiArg<string, 'caller'>], Response<boolean, bigint>>,
      revokeDelegateStx: {
        name: 'revoke-delegate-stx',
        access: 'public',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                optional: {
                  tuple: [
                    { name: 'amount-ustx', type: 'uint128' },
                    { name: 'delegated-to', type: 'principal' },
                    {
                      name: 'pox-addr',
                      type: {
                        optional: {
                          tuple: [
                            { name: 'hashbytes', type: { buffer: { length: 32 } } },
                            { name: 'version', type: { buffer: { length: 1 } } },
                          ],
                        },
                      },
                    },
                    { name: 'until-burn-ht', type: { optional: 'uint128' } },
                  ],
                },
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            amountUstx: bigint;
            delegatedTo: string;
            poxAddr: {
              hashbytes: Uint8Array;
              version: Uint8Array;
            } | null;
            untilBurnHt: bigint | null;
          } | null,
          bigint
        >
      >,
      setBurnchainParameters: {
        name: 'set-burnchain-parameters',
        access: 'public',
        args: [
          { name: 'first-burn-height', type: 'uint128' },
          { name: 'prepare-cycle-length', type: 'uint128' },
          { name: 'reward-cycle-length', type: 'uint128' },
          { name: 'begin-pox-4-reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          firstBurnHeight: TypedAbiArg<number | bigint, 'firstBurnHeight'>,
          prepareCycleLength: TypedAbiArg<number | bigint, 'prepareCycleLength'>,
          rewardCycleLength: TypedAbiArg<number | bigint, 'rewardCycleLength'>,
          beginPox4RewardCycle: TypedAbiArg<number | bigint, 'beginPox4RewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      setSignerKeyAuthorization: {
        name: 'set-signer-key-authorization',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'period', type: 'uint128' },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'allowed', type: 'bool' },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          period: TypedAbiArg<number | bigint, 'period'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          topic: TypedAbiArg<string, 'topic'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          allowed: TypedAbiArg<boolean, 'allowed'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommit: {
        name: 'stack-aggregation-commit',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<boolean, bigint>
      >,
      stackAggregationCommitIndexed: {
        name: 'stack-aggregation-commit-indexed',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<bigint, bigint>
      >,
      stackAggregationIncrease: {
        name: 'stack-aggregation-increase',
        access: 'public',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'reward-cycle-index', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          rewardCycleIndex: TypedAbiArg<number | bigint, 'rewardCycleIndex'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<boolean, bigint>
      >,
      stackExtend: {
        name: 'stack-extend',
        access: 'public',
        args: [
          { name: 'extend-count', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          extendCount: TypedAbiArg<number | bigint, 'extendCount'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<
          {
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      stackIncrease: {
        name: 'stack-increase',
        access: 'public',
        args: [
          { name: 'increase-by', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'stacker', type: 'principal' },
                  { name: 'total-locked', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          increaseBy: TypedAbiArg<number | bigint, 'increaseBy'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<
          {
            stacker: string;
            totalLocked: bigint;
          },
          bigint
        >
      >,
      stackStx: {
        name: 'stack-stx',
        access: 'public',
        args: [
          { name: 'amount-ustx', type: 'uint128' },
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'start-burn-ht', type: 'uint128' },
          { name: 'lock-period', type: 'uint128' },
          { name: 'signer-sig', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'lock-amount', type: 'uint128' },
                  { name: 'signer-key', type: { buffer: { length: 33 } } },
                  { name: 'stacker', type: 'principal' },
                  { name: 'unlock-burn-height', type: 'uint128' },
                ],
              },
              error: 'int128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          startBurnHt: TypedAbiArg<number | bigint, 'startBurnHt'>,
          lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>,
          signerSig: TypedAbiArg<Uint8Array | null, 'signerSig'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<
          {
            lockAmount: bigint;
            signerKey: Uint8Array;
            stacker: string;
            unlockBurnHeight: bigint;
          },
          bigint
        >
      >,
      burnHeightToRewardCycle: {
        name: 'burn-height-to-reward-cycle',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], bigint>,
      canStackStx: {
        name: 'can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      checkCallerAllowed: {
        name: 'check-caller-allowed',
        access: 'read_only',
        args: [],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[], boolean>,
      checkPoxAddrHashbytes: {
        name: 'check-pox-addr-hashbytes',
        access: 'read_only',
        args: [
          { name: 'version', type: { buffer: { length: 1 } } },
          { name: 'hashbytes', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          version: TypedAbiArg<Uint8Array, 'version'>,
          hashbytes: TypedAbiArg<Uint8Array, 'hashbytes'>
        ],
        boolean
      >,
      checkPoxAddrVersion: {
        name: 'check-pox-addr-version',
        access: 'read_only',
        args: [{ name: 'version', type: { buffer: { length: 1 } } }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[version: TypedAbiArg<Uint8Array, 'version'>], boolean>,
      checkPoxLockPeriod: {
        name: 'check-pox-lock-period',
        access: 'read_only',
        args: [{ name: 'lock-period', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[lockPeriod: TypedAbiArg<number | bigint, 'lockPeriod'>], boolean>,
      currentPoxRewardCycle: {
        name: 'current-pox-reward-cycle',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getAllowanceContractCallers: {
        name: 'get-allowance-contract-callers',
        access: 'read_only',
        args: [
          { name: 'sender', type: 'principal' },
          { name: 'calling-contract', type: 'principal' },
        ],
        outputs: {
          type: { optional: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] } },
        },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, 'sender'>,
          callingContract: TypedAbiArg<string, 'callingContract'>
        ],
        {
          untilBurnHt: bigint | null;
        } | null
      >,
      getCheckDelegation: {
        name: 'get-check-delegation',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getDelegationInfo: {
        name: 'get-delegation-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount-ustx', type: 'uint128' },
                { name: 'delegated-to', type: 'principal' },
                {
                  name: 'pox-addr',
                  type: {
                    optional: {
                      tuple: [
                        { name: 'hashbytes', type: { buffer: { length: 32 } } },
                        { name: 'version', type: { buffer: { length: 1 } } },
                      ],
                    },
                  },
                },
                { name: 'until-burn-ht', type: { optional: 'uint128' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        } | null
      >,
      getNumRewardSetPoxAddresses: {
        name: 'get-num-reward-set-pox-addresses',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getPartialStackedByCycle: {
        name: 'get-partial-stacked-by-cycle',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'sender', type: 'principal' },
        ],
        outputs: { type: { optional: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          sender: TypedAbiArg<string, 'sender'>
        ],
        {
          stackedAmount: bigint;
        } | null
      >,
      getPoxInfo: {
        name: 'get-pox-info',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'first-burnchain-block-height', type: 'uint128' },
                  { name: 'min-amount-ustx', type: 'uint128' },
                  { name: 'prepare-cycle-length', type: 'uint128' },
                  { name: 'reward-cycle-id', type: 'uint128' },
                  { name: 'reward-cycle-length', type: 'uint128' },
                  { name: 'total-liquid-supply-ustx', type: 'uint128' },
                ],
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            firstBurnchainBlockHeight: bigint;
            minAmountUstx: bigint;
            prepareCycleLength: bigint;
            rewardCycleId: bigint;
            rewardCycleLength: bigint;
            totalLiquidSupplyUstx: bigint;
          },
          null
        >
      >,
      getRewardSetPoxAddress: {
        name: 'get-reward-set-pox-address',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'index', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'signer', type: { buffer: { length: 33 } } },
                { name: 'stacker', type: { optional: 'principal' } },
                { name: 'total-ustx', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          index: TypedAbiArg<number | bigint, 'index'>
        ],
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          signer: Uint8Array;
          stacker: string | null;
          totalUstx: bigint;
        } | null
      >,
      getRewardSetSize: {
        name: 'get-reward-set-size',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getSignerKeyMessageHash: {
        name: 'get-signer-key-message-hash',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          { name: 'period', type: 'uint128' },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { buffer: { length: 32 } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          topic: TypedAbiArg<string, 'topic'>,
          period: TypedAbiArg<number | bigint, 'period'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Uint8Array
      >,
      getStackerInfo: {
        name: 'get-stacker-info',
        access: 'read_only',
        args: [{ name: 'stacker', type: 'principal' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'delegated-to', type: { optional: 'principal' } },
                { name: 'first-reward-cycle', type: 'uint128' },
                { name: 'lock-period', type: 'uint128' },
                {
                  name: 'pox-addr',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [stacker: TypedAbiArg<string, 'stacker'>],
        {
          delegatedTo: string | null;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        } | null
      >,
      getStackingMinimum: {
        name: 'get-stacking-minimum',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getTotalUstxStacked: {
        name: 'get-total-ustx-stacked',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      minimalCanStackStx: {
        name: 'minimal-can-stack-stx',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'amount-ustx', type: 'uint128' },
          { name: 'first-reward-cycle', type: 'uint128' },
          { name: 'num-cycles', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          amountUstx: TypedAbiArg<number | bigint, 'amountUstx'>,
          firstRewardCycle: TypedAbiArg<number | bigint, 'firstRewardCycle'>,
          numCycles: TypedAbiArg<number | bigint, 'numCycles'>
        ],
        Response<boolean, bigint>
      >,
      rewardCycleToBurnHeight: {
        name: 'reward-cycle-to-burn-height',
        access: 'read_only',
        args: [{ name: 'cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[cycle: TypedAbiArg<number | bigint, 'cycle'>], bigint>,
      verifySignerKeySig: {
        name: 'verify-signer-key-sig',
        access: 'read_only',
        args: [
          {
            name: 'pox-addr',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          { name: 'period', type: 'uint128' },
          { name: 'signer-sig-opt', type: { optional: { buffer: { length: 65 } } } },
          { name: 'signer-key', type: { buffer: { length: 33 } } },
          { name: 'amount', type: 'uint128' },
          { name: 'max-amount', type: 'uint128' },
          { name: 'auth-id', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'int128' } } },
      } as TypedAbiFunction<
        [
          poxAddr: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'poxAddr'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          topic: TypedAbiArg<string, 'topic'>,
          period: TypedAbiArg<number | bigint, 'period'>,
          signerSigOpt: TypedAbiArg<Uint8Array | null, 'signerSigOpt'>,
          signerKey: TypedAbiArg<Uint8Array, 'signerKey'>,
          amount: TypedAbiArg<number | bigint, 'amount'>,
          maxAmount: TypedAbiArg<number | bigint, 'maxAmount'>,
          authId: TypedAbiArg<number | bigint, 'authId'>
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {
      allowanceContractCallers: {
        name: 'allowance-contract-callers',
        key: {
          tuple: [
            { name: 'contract-caller', type: 'principal' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'until-burn-ht', type: { optional: 'uint128' } }] },
      } as TypedAbiMap<
        {
          contractCaller: string;
          sender: string;
        },
        {
          untilBurnHt: bigint | null;
        }
      >,
      delegationState: {
        name: 'delegation-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'amount-ustx', type: 'uint128' },
            { name: 'delegated-to', type: 'principal' },
            {
              name: 'pox-addr',
              type: {
                optional: {
                  tuple: [
                    { name: 'hashbytes', type: { buffer: { length: 32 } } },
                    { name: 'version', type: { buffer: { length: 1 } } },
                  ],
                },
              },
            },
            { name: 'until-burn-ht', type: { optional: 'uint128' } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          amountUstx: bigint;
          delegatedTo: string;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          } | null;
          untilBurnHt: bigint | null;
        }
      >,
      loggedPartialStackedByCycle: {
        name: 'logged-partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      partialStackedByCycle: {
        name: 'partial-stacked-by-cycle',
        key: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'sender', type: 'principal' },
          ],
        },
        value: { tuple: [{ name: 'stacked-amount', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          sender: string;
        },
        {
          stackedAmount: bigint;
        }
      >,
      rewardCyclePoxAddressList: {
        name: 'reward-cycle-pox-address-list',
        key: {
          tuple: [
            { name: 'index', type: 'uint128' },
            { name: 'reward-cycle', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'signer', type: { buffer: { length: 33 } } },
            { name: 'stacker', type: { optional: 'principal' } },
            { name: 'total-ustx', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          index: number | bigint;
          rewardCycle: number | bigint;
        },
        {
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          signer: Uint8Array;
          stacker: string | null;
          totalUstx: bigint;
        }
      >,
      rewardCyclePoxAddressListLen: {
        name: 'reward-cycle-pox-address-list-len',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'len', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          len: bigint;
        }
      >,
      rewardCycleTotalStacked: {
        name: 'reward-cycle-total-stacked',
        key: { tuple: [{ name: 'reward-cycle', type: 'uint128' }] },
        value: { tuple: [{ name: 'total-ustx', type: 'uint128' }] },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
        },
        {
          totalUstx: bigint;
        }
      >,
      signerKeyAuthorizations: {
        name: 'signer-key-authorizations',
        key: {
          tuple: [
            { name: 'auth-id', type: 'uint128' },
            { name: 'max-amount', type: 'uint128' },
            { name: 'period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'signer-key', type: { buffer: { length: 33 } } },
            { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          ],
        },
        value: 'bool',
      } as TypedAbiMap<
        {
          authId: number | bigint;
          maxAmount: number | bigint;
          period: number | bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          signerKey: Uint8Array;
          topic: string;
        },
        boolean
      >,
      stackingState: {
        name: 'stacking-state',
        key: { tuple: [{ name: 'stacker', type: 'principal' }] },
        value: {
          tuple: [
            { name: 'delegated-to', type: { optional: 'principal' } },
            { name: 'first-reward-cycle', type: 'uint128' },
            { name: 'lock-period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-set-indexes', type: { list: { type: 'uint128', length: 12 } } },
          ],
        },
      } as TypedAbiMap<
        {
          stacker: string;
        },
        {
          delegatedTo: string | null;
          firstRewardCycle: bigint;
          lockPeriod: bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardSetIndexes: bigint[];
        }
      >,
      usedSignerKeyAuthorizations: {
        name: 'used-signer-key-authorizations',
        key: {
          tuple: [
            { name: 'auth-id', type: 'uint128' },
            { name: 'max-amount', type: 'uint128' },
            { name: 'period', type: 'uint128' },
            {
              name: 'pox-addr',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'signer-key', type: { buffer: { length: 33 } } },
            { name: 'topic', type: { 'string-ascii': { length: 14 } } },
          ],
        },
        value: 'bool',
      } as TypedAbiMap<
        {
          authId: number | bigint;
          maxAmount: number | bigint;
          period: number | bigint;
          poxAddr: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          rewardCycle: number | bigint;
          signerKey: Uint8Array;
          topic: string;
        },
        boolean
      >,
    },
    variables: {
      aDDRESS_VERSION_NATIVE_P2TR: {
        name: 'ADDRESS_VERSION_NATIVE_P2TR',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WPKH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_NATIVE_P2WSH: {
        name: 'ADDRESS_VERSION_NATIVE_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2PKH: {
        name: 'ADDRESS_VERSION_P2PKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2SH: {
        name: 'ADDRESS_VERSION_P2SH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WPKH: {
        name: 'ADDRESS_VERSION_P2WPKH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      aDDRESS_VERSION_P2WSH: {
        name: 'ADDRESS_VERSION_P2WSH',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      ERR_DELEGATION_ALREADY_REVOKED: {
        name: 'ERR_DELEGATION_ALREADY_REVOKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_EXPIRES_DURING_LOCK: {
        name: 'ERR_DELEGATION_EXPIRES_DURING_LOCK',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_NO_REWARD_SLOT: {
        name: 'ERR_DELEGATION_NO_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_POX_ADDR_REQUIRED: {
        name: 'ERR_DELEGATION_POX_ADDR_REQUIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_TOO_MUCH_LOCKED: {
        name: 'ERR_DELEGATION_TOO_MUCH_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DELEGATION_WRONG_REWARD_SLOT: {
        name: 'ERR_DELEGATION_WRONG_REWARD_SLOT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_INCREASE: {
        name: 'ERR_INVALID_INCREASE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_REWARD_CYCLE: {
        name: 'ERR_INVALID_REWARD_CYCLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_SIGNATURE_PUBKEY: {
        name: 'ERR_INVALID_SIGNATURE_PUBKEY',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_SIGNATURE_RECOVER: {
        name: 'ERR_INVALID_SIGNATURE_RECOVER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_SIGNER_KEY: {
        name: 'ERR_INVALID_SIGNER_KEY',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_START_BURN_HEIGHT: {
        name: 'ERR_INVALID_START_BURN_HEIGHT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_ALLOWED: {
        name: 'ERR_NOT_ALLOWED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NOT_CURRENT_STACKER: {
        name: 'ERR_NOT_CURRENT_STACKER',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_REUSED_SIGNER_KEY: {
        name: 'ERR_REUSED_SIGNER_KEY',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_SIGNER_AUTH_AMOUNT_TOO_HIGH: {
        name: 'ERR_SIGNER_AUTH_AMOUNT_TOO_HIGH',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_SIGNER_AUTH_USED: {
        name: 'ERR_SIGNER_AUTH_USED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_DELEGATED: {
        name: 'ERR_STACKING_ALREADY_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_ALREADY_STACKED: {
        name: 'ERR_STACKING_ALREADY_STACKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_CORRUPTED_STATE: {
        name: 'ERR_STACKING_CORRUPTED_STATE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_EXPIRED: {
        name: 'ERR_STACKING_EXPIRED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INSUFFICIENT_FUNDS: {
        name: 'ERR_STACKING_INSUFFICIENT_FUNDS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_AMOUNT: {
        name: 'ERR_STACKING_INVALID_AMOUNT',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_LOCK_PERIOD: {
        name: 'ERR_STACKING_INVALID_LOCK_PERIOD',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_INVALID_POX_ADDRESS: {
        name: 'ERR_STACKING_INVALID_POX_ADDRESS',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_IS_DELEGATED: {
        name: 'ERR_STACKING_IS_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NOT_DELEGATED: {
        name: 'ERR_STACKING_NOT_DELEGATED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_NO_SUCH_PRINCIPAL: {
        name: 'ERR_STACKING_NO_SUCH_PRINCIPAL',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_PERMISSION_DENIED: {
        name: 'ERR_STACKING_PERMISSION_DENIED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_POX_ADDRESS_IN_USE: {
        name: 'ERR_STACKING_POX_ADDRESS_IN_USE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_STX_LOCKED: {
        name: 'ERR_STACKING_STX_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_THRESHOLD_NOT_MET: {
        name: 'ERR_STACKING_THRESHOLD_NOT_MET',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACKING_UNREACHABLE: {
        name: 'ERR_STACKING_UNREACHABLE',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_EXTEND_NOT_LOCKED: {
        name: 'ERR_STACK_EXTEND_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_STACK_INCREASE_NOT_LOCKED: {
        name: 'ERR_STACK_INCREASE_NOT_LOCKED',
        type: 'int128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_ADDRESS_VERSION: {
        name: 'MAX_ADDRESS_VERSION',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_20: {
        name: 'MAX_ADDRESS_VERSION_BUFF_20',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_32: {
        name: 'MAX_ADDRESS_VERSION_BUFF_32',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_POX_REWARD_CYCLES: {
        name: 'MAX_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MIN_POX_REWARD_CYCLES: {
        name: 'MIN_POX_REWARD_CYCLES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      PREPARE_CYCLE_LENGTH: {
        name: 'PREPARE_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REWARD_CYCLE_LENGTH: {
        name: 'REWARD_CYCLE_LENGTH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      sIP018_MSG_PREFIX: {
        name: 'SIP018_MSG_PREFIX',
        type: {
          buffer: {
            length: 6,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      sTACKING_THRESHOLD_25: {
        name: 'STACKING_THRESHOLD_25',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      STACKS_ADDR_VERSION_MAINNET: {
        name: 'STACKS_ADDR_VERSION_MAINNET',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      STACKS_ADDR_VERSION_TESTNET: {
        name: 'STACKS_ADDR_VERSION_TESTNET',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      configured: {
        name: 'configured',
        type: 'bool',
        access: 'variable',
      } as TypedAbiVariable<boolean>,
      firstBurnchainBlockHeight: {
        name: 'first-burnchain-block-height',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      firstPox4RewardCycle: {
        name: 'first-pox-4-reward-cycle',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxPrepareCycleLength: {
        name: 'pox-prepare-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      poxRewardCycleLength: {
        name: 'pox-reward-cycle-length',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch25',
    clarity_version: 'Clarity2',
    contractName: 'pox-4',
  },
  signers: {
    functions: {
      setSigners: {
        name: 'set-signers',
        access: 'private',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          {
            name: 'signers',
            type: {
              list: {
                type: {
                  tuple: [
                    { name: 'signer', type: 'principal' },
                    { name: 'weight', type: 'uint128' },
                  ],
                },
                length: 4000,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          signers: TypedAbiArg<
            {
              signer: string;
              weight: number | bigint;
            }[],
            'signers'
          >
        ],
        Response<boolean, bigint>
      >,
      stackerdbSetSignerSlots: {
        name: 'stackerdb-set-signer-slots',
        access: 'private',
        args: [
          {
            name: 'signer-slots',
            type: {
              list: {
                type: {
                  tuple: [
                    { name: 'num-slots', type: 'uint128' },
                    { name: 'signer', type: 'principal' },
                  ],
                },
                length: 4000,
              },
            },
          },
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'set-at-height', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<
        [
          signerSlots: TypedAbiArg<
            {
              numSlots: number | bigint;
              signer: string;
            }[],
            'signerSlots'
          >,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          setAtHeight: TypedAbiArg<number | bigint, 'setAtHeight'>
        ],
        Response<boolean, null>
      >,
      getLastSetCycle: {
        name: 'get-last-set-cycle',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getSignerByIndex: {
        name: 'get-signer-by-index',
        access: 'read_only',
        args: [
          { name: 'cycle', type: 'uint128' },
          { name: 'signer-index', type: 'uint128' },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                optional: {
                  tuple: [
                    { name: 'signer', type: 'principal' },
                    { name: 'weight', type: 'uint128' },
                  ],
                },
              },
              error: 'uint128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycle: TypedAbiArg<number | bigint, 'cycle'>,
          signerIndex: TypedAbiArg<number | bigint, 'signerIndex'>
        ],
        Response<
          {
            signer: string;
            weight: bigint;
          } | null,
          bigint
        >
      >,
      getSigners: {
        name: 'get-signers',
        access: 'read_only',
        args: [{ name: 'cycle', type: 'uint128' }],
        outputs: {
          type: {
            optional: {
              list: {
                type: {
                  tuple: [
                    { name: 'signer', type: 'principal' },
                    { name: 'weight', type: 'uint128' },
                  ],
                },
                length: 4000,
              },
            },
          },
        },
      } as TypedAbiFunction<
        [cycle: TypedAbiArg<number | bigint, 'cycle'>],
        | {
            signer: string;
            weight: bigint;
          }[]
        | null
      >,
      stackerdbGetConfig: {
        name: 'stackerdb-get-config',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: 'chunk-size', type: 'uint128' },
                  { name: 'hint-replicas', type: { list: { type: 'none', length: 0 } } },
                  { name: 'max-neighbors', type: 'uint128' },
                  { name: 'max-writes', type: 'uint128' },
                  { name: 'write-freq', type: 'uint128' },
                ],
              },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            chunkSize: bigint;
            hintReplicas: null[];
            maxNeighbors: bigint;
            maxWrites: bigint;
            writeFreq: bigint;
          },
          null
        >
      >,
      stackerdbGetSignerSlotsPage: {
        name: 'stackerdb-get-signer-slots-page',
        access: 'read_only',
        args: [{ name: 'page', type: 'uint128' }],
        outputs: {
          type: {
            response: {
              ok: {
                list: {
                  type: {
                    tuple: [
                      { name: 'num-slots', type: 'uint128' },
                      { name: 'signer', type: 'principal' },
                    ],
                  },
                  length: 4000,
                },
              },
              error: 'uint128',
            },
          },
        },
      } as TypedAbiFunction<
        [page: TypedAbiArg<number | bigint, 'page'>],
        Response<
          {
            numSlots: bigint;
            signer: string;
          }[],
          bigint
        >
      >,
    },
    maps: {
      cycleSetHeight: { name: 'cycle-set-height', key: 'uint128', value: 'uint128' } as TypedAbiMap<
        number | bigint,
        bigint
      >,
      cycleSignerSet: {
        name: 'cycle-signer-set',
        key: 'uint128',
        value: {
          list: {
            type: {
              tuple: [
                { name: 'signer', type: 'principal' },
                { name: 'weight', type: 'uint128' },
              ],
            },
            length: 4000,
          },
        },
      } as TypedAbiMap<
        number | bigint,
        {
          signer: string;
          weight: bigint;
        }[]
      >,
    },
    variables: {
      CHUNK_SIZE: {
        name: 'CHUNK_SIZE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_CYCLE_NOT_SET: {
        name: 'ERR_CYCLE_NOT_SET',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_NO_SUCH_PAGE: {
        name: 'ERR_NO_SUCH_PAGE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MAX_WRITES: {
        name: 'MAX_WRITES',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      lastSetCycle: {
        name: 'last-set-cycle',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      stackerdbSignerSlots0: {
        name: 'stackerdb-signer-slots-0',
        type: {
          list: {
            type: {
              tuple: [
                {
                  name: 'num-slots',
                  type: 'uint128',
                },
                {
                  name: 'signer',
                  type: 'principal',
                },
              ],
            },
            length: 4_000,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<
        {
          numSlots: bigint;
          signer: string;
        }[]
      >,
      stackerdbSignerSlots1: {
        name: 'stackerdb-signer-slots-1',
        type: {
          list: {
            type: {
              tuple: [
                {
                  name: 'num-slots',
                  type: 'uint128',
                },
                {
                  name: 'signer',
                  type: 'principal',
                },
              ],
            },
            length: 4_000,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<
        {
          numSlots: bigint;
          signer: string;
        }[]
      >,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch25',
    clarity_version: 'Clarity2',
    contractName: 'signers',
  },
  signersVoting: {
    functions: {
      getAndCacheTotalWeight: {
        name: 'get-and-cache-total-weight',
        access: 'private',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>],
        Response<bigint, bigint>
      >,
      isInVotingWindow: {
        name: 'is-in-voting-window',
        access: 'private',
        args: [
          { name: 'height', type: 'uint128' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          height: TypedAbiArg<number | bigint, 'height'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        boolean
      >,
      sumWeights: {
        name: 'sum-weights',
        access: 'private',
        args: [
          {
            name: 'signer',
            type: {
              tuple: [
                { name: 'signer', type: 'principal' },
                { name: 'weight', type: 'uint128' },
              ],
            },
          },
          { name: 'acc', type: 'uint128' },
        ],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<
            {
              signer: string;
              weight: number | bigint;
            },
            'signer'
          >,
          acc: TypedAbiArg<number | bigint, 'acc'>
        ],
        bigint
      >,
      updateLastRound: {
        name: 'update-last-round',
        access: 'private',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'round', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          round: TypedAbiArg<number | bigint, 'round'>
        ],
        Response<boolean, bigint>
      >,
      voteForAggregatePublicKey: {
        name: 'vote-for-aggregate-public-key',
        access: 'public',
        args: [
          { name: 'signer-index', type: 'uint128' },
          { name: 'key', type: { buffer: { length: 33 } } },
          { name: 'round', type: 'uint128' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          signerIndex: TypedAbiArg<number | bigint, 'signerIndex'>,
          key: TypedAbiArg<Uint8Array, 'key'>,
          round: TypedAbiArg<number | bigint, 'round'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<boolean, bigint>
      >,
      burnHeightToRewardCycle: {
        name: 'burn-height-to-reward-cycle',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], bigint>,
      currentRewardCycle: {
        name: 'current-reward-cycle',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      getApprovedAggregateKey: {
        name: 'get-approved-aggregate-key',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: { optional: { buffer: { length: 33 } } } },
      } as TypedAbiFunction<
        [rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>],
        Uint8Array | null
      >,
      getCandidateInfo: {
        name: 'get-candidate-info',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'round', type: 'uint128' },
          { name: 'candidate', type: { buffer: { length: 33 } } },
        ],
        outputs: {
          type: {
            tuple: [
              { name: 'candidate-weight', type: 'uint128' },
              { name: 'total-weight', type: { optional: 'uint128' } },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          round: TypedAbiArg<number | bigint, 'round'>,
          candidate: TypedAbiArg<Uint8Array, 'candidate'>
        ],
        {
          candidateWeight: bigint;
          totalWeight: bigint | null;
        }
      >,
      getLastRound: {
        name: 'get-last-round',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: { optional: 'uint128' } },
      } as TypedAbiFunction<
        [rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>],
        bigint | null
      >,
      getRoundInfo: {
        name: 'get-round-info',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'round', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'votes-count', type: 'uint128' },
                { name: 'votes-weight', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          round: TypedAbiArg<number | bigint, 'round'>
        ],
        {
          votesCount: bigint;
          votesWeight: bigint;
        } | null
      >,
      getSignerWeight: {
        name: 'get-signer-weight',
        access: 'read_only',
        args: [
          { name: 'signer-index', type: 'uint128' },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          signerIndex: TypedAbiArg<number | bigint, 'signerIndex'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        Response<bigint, bigint>
      >,
      getTally: {
        name: 'get-tally',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'round', type: 'uint128' },
          { name: 'aggregate-public-key', type: { buffer: { length: 33 } } },
        ],
        outputs: { type: { optional: 'uint128' } },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          round: TypedAbiArg<number | bigint, 'round'>,
          aggregatePublicKey: TypedAbiArg<Uint8Array, 'aggregatePublicKey'>
        ],
        bigint | null
      >,
      getThresholdWeight: {
        name: 'get-threshold-weight',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
      getVote: {
        name: 'get-vote',
        access: 'read_only',
        args: [
          { name: 'reward-cycle', type: 'uint128' },
          { name: 'round', type: 'uint128' },
          { name: 'signer', type: 'principal' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'aggregate-public-key', type: { buffer: { length: 33 } } },
                { name: 'signer-weight', type: 'uint128' },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>,
          round: TypedAbiArg<number | bigint, 'round'>,
          signer: TypedAbiArg<string, 'signer'>
        ],
        {
          aggregatePublicKey: Uint8Array;
          signerWeight: bigint;
        } | null
      >,
      isInPreparePhase: {
        name: 'is-in-prepare-phase',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], boolean>,
      isNovelAggregatePublicKey: {
        name: 'is-novel-aggregate-public-key',
        access: 'read_only',
        args: [
          { name: 'key', type: { buffer: { length: 33 } } },
          { name: 'reward-cycle', type: 'uint128' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          key: TypedAbiArg<Uint8Array, 'key'>,
          rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>
        ],
        boolean
      >,
      rewardCycleToBurnHeight: {
        name: 'reward-cycle-to-burn-height',
        access: 'read_only',
        args: [{ name: 'reward-cycle', type: 'uint128' }],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[rewardCycle: TypedAbiArg<number | bigint, 'rewardCycle'>], bigint>,
    },
    maps: {
      aggregatePublicKeys: {
        name: 'aggregate-public-keys',
        key: 'uint128',
        value: { buffer: { length: 33 } },
      } as TypedAbiMap<number | bigint, Uint8Array>,
      cycleTotalWeight: {
        name: 'cycle-total-weight',
        key: 'uint128',
        value: 'uint128',
      } as TypedAbiMap<number | bigint, bigint>,
      roundData: {
        name: 'round-data',
        key: {
          tuple: [
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'round', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            { name: 'votes-count', type: 'uint128' },
            { name: 'votes-weight', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
          round: number | bigint;
        },
        {
          votesCount: bigint;
          votesWeight: bigint;
        }
      >,
      rounds: { name: 'rounds', key: 'uint128', value: 'uint128' } as TypedAbiMap<
        number | bigint,
        bigint
      >,
      tally: {
        name: 'tally',
        key: {
          tuple: [
            { name: 'aggregate-public-key', type: { buffer: { length: 33 } } },
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'round', type: 'uint128' },
          ],
        },
        value: 'uint128',
      } as TypedAbiMap<
        {
          aggregatePublicKey: Uint8Array;
          rewardCycle: number | bigint;
          round: number | bigint;
        },
        bigint
      >,
      usedAggregatePublicKeys: {
        name: 'used-aggregate-public-keys',
        key: { buffer: { length: 33 } },
        value: 'uint128',
      } as TypedAbiMap<Uint8Array, bigint>,
      votes: {
        name: 'votes',
        key: {
          tuple: [
            { name: 'reward-cycle', type: 'uint128' },
            { name: 'round', type: 'uint128' },
            { name: 'signer', type: 'principal' },
          ],
        },
        value: {
          tuple: [
            { name: 'aggregate-public-key', type: { buffer: { length: 33 } } },
            { name: 'signer-weight', type: 'uint128' },
          ],
        },
      } as TypedAbiMap<
        {
          rewardCycle: number | bigint;
          round: number | bigint;
          signer: string;
        },
        {
          aggregatePublicKey: Uint8Array;
          signerWeight: bigint;
        }
      >,
    },
    variables: {
      ERR_DUPLICATE_AGGREGATE_PUBLIC_KEY: {
        name: 'ERR_DUPLICATE_AGGREGATE_PUBLIC_KEY',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DUPLICATE_VOTE: {
        name: 'ERR_DUPLICATE_VOTE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_FAILED_TO_RETRIEVE_SIGNERS: {
        name: 'ERR_FAILED_TO_RETRIEVE_SIGNERS',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_ILL_FORMED_AGGREGATE_PUBLIC_KEY: {
        name: 'ERR_ILL_FORMED_AGGREGATE_PUBLIC_KEY',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_ROUND: {
        name: 'ERR_INVALID_ROUND',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_SIGNER_INDEX: {
        name: 'ERR_INVALID_SIGNER_INDEX',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_OUT_OF_VOTING_WINDOW: {
        name: 'ERR_OUT_OF_VOTING_WINDOW',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_SIGNER_INDEX_MISMATCH: {
        name: 'ERR_SIGNER_INDEX_MISMATCH',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      poxInfo: {
        name: 'pox-info',
        type: {
          tuple: [
            {
              name: 'first-burnchain-block-height',
              type: 'uint128',
            },
            {
              name: 'min-amount-ustx',
              type: 'uint128',
            },
            {
              name: 'prepare-cycle-length',
              type: 'uint128',
            },
            {
              name: 'reward-cycle-id',
              type: 'uint128',
            },
            {
              name: 'reward-cycle-length',
              type: 'uint128',
            },
            {
              name: 'total-liquid-supply-ustx',
              type: 'uint128',
            },
          ],
        },
        access: 'constant',
      } as TypedAbiVariable<{
        firstBurnchainBlockHeight: bigint;
        minAmountUstx: bigint;
        prepareCycleLength: bigint;
        rewardCycleId: bigint;
        rewardCycleLength: bigint;
        totalLiquidSupplyUstx: bigint;
      }>,
      thresholdConsensus: {
        name: 'threshold-consensus',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch25',
    clarity_version: 'Clarity2',
    contractName: 'signers-voting',
  },
} as const;

export const accounts = {
  deployer: { address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', balance: '100000000000000' },
  faucet: { address: 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6', balance: '100000000000000' },
  wallet_1: { address: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5', balance: '100000000000000' },
  wallet_2: { address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG', balance: '100000000000000' },
  wallet_3: { address: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC', balance: '100000000000000' },
  wallet_4: { address: 'ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND', balance: '100000000000000' },
  wallet_5: { address: 'ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB', balance: '100000000000000' },
  wallet_6: { address: 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0', balance: '100000000000000' },
  wallet_7: { address: 'ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ', balance: '100000000000000' },
  wallet_8: { address: 'ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP', balance: '100000000000000' },
} as const;

export const identifiers = {
  bns: 'SP000000000000000000002Q6VF78.bns',
  costVoting: 'SP000000000000000000002Q6VF78.cost-voting',
  costs: 'SP000000000000000000002Q6VF78.costs',
  costs2: 'SP000000000000000000002Q6VF78.costs-2',
  costs3: 'SP000000000000000000002Q6VF78.costs-3',
  lockup: 'SP000000000000000000002Q6VF78.lockup',
  pox: 'SP000000000000000000002Q6VF78.pox',
  pox2: 'SP000000000000000000002Q6VF78.pox-2',
  pox3: 'SP000000000000000000002Q6VF78.pox-3',
  pox4: 'SP000000000000000000002Q6VF78.pox-4',
  signers: 'SP000000000000000000002Q6VF78.signers',
  signersVoting: 'SP000000000000000000002Q6VF78.signers-voting',
} as const;

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;

export const deployments = {
  bns: {
    devnet: 'SP000000000000000000002Q6VF78.bns',
    simnet: 'SP000000000000000000002Q6VF78.bns',
    testnet: null,
    mainnet: null,
  },
  costVoting: {
    devnet: 'SP000000000000000000002Q6VF78.cost-voting',
    simnet: 'SP000000000000000000002Q6VF78.cost-voting',
    testnet: null,
    mainnet: null,
  },
  costs: {
    devnet: 'SP000000000000000000002Q6VF78.costs',
    simnet: 'SP000000000000000000002Q6VF78.costs',
    testnet: null,
    mainnet: null,
  },
  costs2: {
    devnet: 'SP000000000000000000002Q6VF78.costs-2',
    simnet: 'SP000000000000000000002Q6VF78.costs-2',
    testnet: null,
    mainnet: null,
  },
  costs3: {
    devnet: 'SP000000000000000000002Q6VF78.costs-3',
    simnet: 'SP000000000000000000002Q6VF78.costs-3',
    testnet: null,
    mainnet: null,
  },
  lockup: {
    devnet: 'SP000000000000000000002Q6VF78.lockup',
    simnet: 'SP000000000000000000002Q6VF78.lockup',
    testnet: null,
    mainnet: null,
  },
  pox: {
    devnet: 'SP000000000000000000002Q6VF78.pox',
    simnet: 'SP000000000000000000002Q6VF78.pox',
    testnet: null,
    mainnet: null,
  },
  pox2: {
    devnet: 'SP000000000000000000002Q6VF78.pox-2',
    simnet: 'SP000000000000000000002Q6VF78.pox-2',
    testnet: null,
    mainnet: null,
  },
  pox3: {
    devnet: 'SP000000000000000000002Q6VF78.pox-3',
    simnet: 'SP000000000000000000002Q6VF78.pox-3',
    testnet: null,
    mainnet: null,
  },
  pox4: {
    devnet: 'SP000000000000000000002Q6VF78.pox-4',
    simnet: 'SP000000000000000000002Q6VF78.pox-4',
    testnet: null,
    mainnet: null,
  },
  signers: {
    devnet: 'SP000000000000000000002Q6VF78.signers',
    simnet: 'SP000000000000000000002Q6VF78.signers',
    testnet: null,
    mainnet: null,
  },
  signersVoting: {
    devnet: 'SP000000000000000000002Q6VF78.signers-voting',
    simnet: 'SP000000000000000000002Q6VF78.signers-voting',
    testnet: null,
    mainnet: null,
  },
} as const;

export const project = {
  contracts,
  deployments,
} as const;
