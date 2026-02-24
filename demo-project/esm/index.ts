import type {
  TypedAbiArg,
  TypedAbiFunction,
  TypedAbiMap,
  TypedAbiVariable,
  Response,
} from '@clarigen/core';

export const contracts = {
  wrappedBitcoin: {
    functions: {
      addPrincipalToRole: {
        name: 'add-principal-to-role',
        access: 'public',
        args: [
          { name: 'role-to-add', type: 'uint128' },
          { name: 'principal-to-add', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          roleToAdd: TypedAbiArg<number | bigint, 'roleToAdd'>,
          principalToAdd: TypedAbiArg<string, 'principalToAdd'>
        ],
        Response<boolean, bigint>
      >,
      burnTokens: {
        name: 'burn-tokens',
        access: 'public',
        args: [
          { name: 'burn-amount', type: 'uint128' },
          { name: 'burn-from', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          burnAmount: TypedAbiArg<number | bigint, 'burnAmount'>,
          burnFrom: TypedAbiArg<string, 'burnFrom'>
        ],
        Response<boolean, bigint>
      >,
      initialize: {
        name: 'initialize',
        access: 'public',
        args: [
          { name: 'name-to-set', type: { 'string-ascii': { length: 32 } } },
          { name: 'symbol-to-set', type: { 'string-ascii': { length: 32 } } },
          { name: 'decimals-to-set', type: 'uint128' },
          { name: 'initial-owner', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          nameToSet: TypedAbiArg<string, 'nameToSet'>,
          symbolToSet: TypedAbiArg<string, 'symbolToSet'>,
          decimalsToSet: TypedAbiArg<number | bigint, 'decimalsToSet'>,
          initialOwner: TypedAbiArg<string, 'initialOwner'>
        ],
        Response<boolean, bigint>
      >,
      mintTokens: {
        name: 'mint-tokens',
        access: 'public',
        args: [
          { name: 'mint-amount', type: 'uint128' },
          { name: 'mint-to', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          mintAmount: TypedAbiArg<number | bigint, 'mintAmount'>,
          mintTo: TypedAbiArg<string, 'mintTo'>
        ],
        Response<boolean, bigint>
      >,
      removePrincipalFromRole: {
        name: 'remove-principal-from-role',
        access: 'public',
        args: [
          { name: 'role-to-remove', type: 'uint128' },
          { name: 'principal-to-remove', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          roleToRemove: TypedAbiArg<number | bigint, 'roleToRemove'>,
          principalToRemove: TypedAbiArg<string, 'principalToRemove'>
        ],
        Response<boolean, bigint>
      >,
      revokeTokens: {
        name: 'revoke-tokens',
        access: 'public',
        args: [
          { name: 'revoke-amount', type: 'uint128' },
          { name: 'revoke-from', type: 'principal' },
          { name: 'revoke-to', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          revokeAmount: TypedAbiArg<number | bigint, 'revokeAmount'>,
          revokeFrom: TypedAbiArg<string, 'revokeFrom'>,
          revokeTo: TypedAbiArg<string, 'revokeTo'>
        ],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: 'set-token-uri',
        access: 'public',
        args: [{ name: 'updated-uri', type: { 'string-utf8': { length: 256 } } }],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [updatedUri: TypedAbiArg<string, 'updatedUri'>],
        Response<boolean, bigint>
      >,
      transfer: {
        name: 'transfer',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'sender', type: 'principal' },
          { name: 'recipient', type: 'principal' },
          { name: 'memo', type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          sender: TypedAbiArg<string, 'sender'>,
          recipient: TypedAbiArg<string, 'recipient'>,
          memo: TypedAbiArg<Uint8Array | null, 'memo'>
        ],
        Response<boolean, bigint>
      >,
      updateBlacklisted: {
        name: 'update-blacklisted',
        access: 'public',
        args: [
          { name: 'principal-to-update', type: 'principal' },
          { name: 'set-blacklisted', type: 'bool' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          principalToUpdate: TypedAbiArg<string, 'principalToUpdate'>,
          setBlacklisted: TypedAbiArg<boolean, 'setBlacklisted'>
        ],
        Response<boolean, bigint>
      >,
      detectTransferRestriction: {
        name: 'detect-transfer-restriction',
        access: 'read_only',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'sender', type: 'principal' },
          { name: 'recipient', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          sender: TypedAbiArg<string, 'sender'>,
          recipient: TypedAbiArg<string, 'recipient'>
        ],
        Response<bigint, bigint>
      >,
      getBalance: {
        name: 'get-balance',
        access: 'read_only',
        args: [{ name: 'owner', type: 'principal' }],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[owner: TypedAbiArg<string, 'owner'>], Response<bigint, null>>,
      getDecimals: {
        name: 'get-decimals',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: 'get-name',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: { 'string-ascii': { length: 32 } }, error: 'none' } } },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: 'get-symbol',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: { 'string-ascii': { length: 32 } }, error: 'none' } } },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: 'get-token-uri',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: { ok: { optional: { 'string-utf8': { length: 256 } } }, error: 'none' },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: 'get-total-supply',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      hasRole: {
        name: 'has-role',
        access: 'read_only',
        args: [
          { name: 'role-to-check', type: 'uint128' },
          { name: 'principal-to-check', type: 'principal' },
        ],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<
        [
          roleToCheck: TypedAbiArg<number | bigint, 'roleToCheck'>,
          principalToCheck: TypedAbiArg<string, 'principalToCheck'>
        ],
        boolean
      >,
      isBlacklisted: {
        name: 'is-blacklisted',
        access: 'read_only',
        args: [{ name: 'principal-to-check', type: 'principal' }],
        outputs: { type: 'bool' },
      } as TypedAbiFunction<[principalToCheck: TypedAbiArg<string, 'principalToCheck'>], boolean>,
      messageForRestriction: {
        name: 'message-for-restriction',
        access: 'read_only',
        args: [{ name: 'restriction-code', type: 'uint128' }],
        outputs: { type: { response: { ok: { 'string-ascii': { length: 70 } }, error: 'none' } } },
      } as TypedAbiFunction<
        [restrictionCode: TypedAbiArg<number | bigint, 'restrictionCode'>],
        Response<string, null>
      >,
    },
    maps: {
      blacklist: {
        name: 'blacklist',
        key: { tuple: [{ name: 'account', type: 'principal' }] },
        value: { tuple: [{ name: 'blacklisted', type: 'bool' }] },
      } as TypedAbiMap<
        {
          account: string;
        },
        {
          blacklisted: boolean;
        }
      >,
      roles: {
        name: 'roles',
        key: {
          tuple: [
            { name: 'account', type: 'principal' },
            { name: 'role', type: 'uint128' },
          ],
        },
        value: { tuple: [{ name: 'allowed', type: 'bool' }] },
      } as TypedAbiMap<
        {
          account: string;
          role: number | bigint;
        },
        {
          allowed: boolean;
        }
      >,
    },
    variables: {
      BLACKLISTER_ROLE: {
        name: 'BLACKLISTER_ROLE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      BURNER_ROLE: {
        name: 'BURNER_ROLE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      MINTER_ROLE: {
        name: 'MINTER_ROLE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      OWNER_ROLE: {
        name: 'OWNER_ROLE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      PERMISSION_DENIED_ERROR: {
        name: 'PERMISSION_DENIED_ERROR',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      RESTRICTION_BLACKLIST: {
        name: 'RESTRICTION_BLACKLIST',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      RESTRICTION_NONE: {
        name: 'RESTRICTION_NONE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      REVOKER_ROLE: {
        name: 'REVOKER_ROLE',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      deployerPrincipal: {
        name: 'deployer-principal',
        type: 'principal',
        access: 'variable',
      } as TypedAbiVariable<string>,
      isInitialized: {
        name: 'is-initialized',
        type: 'bool',
        access: 'variable',
      } as TypedAbiVariable<boolean>,
      tokenDecimals: {
        name: 'token-decimals',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      tokenName: {
        name: 'token-name',
        type: {
          'string-ascii': {
            length: 32,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string>,
      tokenSymbol: {
        name: 'token-symbol',
        type: {
          'string-ascii': {
            length: 32,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string>,
      uri: {
        name: 'uri',
        type: {
          'string-utf8': {
            length: 256,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [{ name: 'wrapped-bitcoin' }],
    epoch: 'Epoch21',
    clarity_version: 'Clarity1',
    contractName: 'Wrapped-Bitcoin',
  },
  counter: {
    functions: {
      decrement: {
        name: 'decrement',
        access: 'public',
        args: [{ name: 'step', type: 'uint128' }],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[step: TypedAbiArg<number | bigint, 'step'>], Response<bigint, null>>,
      increment: {
        name: 'increment',
        access: 'public',
        args: [{ name: 'step', type: 'uint128' }],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<[step: TypedAbiArg<number | bigint, 'step'>], Response<bigint, bigint>>,
      getCounter: {
        name: 'get-counter',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {
      lastIncrement: { name: 'last-increment', key: 'principal', value: 'uint128' } as TypedAbiMap<
        string,
        bigint
      >,
    },
    variables: {
      counter: {
        name: 'counter',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      counter: 1n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch30',
    clarity_version: 'Clarity3',
    contractName: 'counter',
  },
  ftTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch21',
    clarity_version: 'Clarity1',
    contractName: 'ft-trait',
  },
  restrictedTokenTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch21',
    clarity_version: 'Clarity1',
    contractName: 'restricted-token-trait',
  },
  sbtcDeposit: {
    functions: {
      completeIndividualDepositsHelper: {
        name: 'complete-individual-deposits-helper',
        access: 'private',
        args: [
          {
            name: 'deposit',
            type: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'burn-hash', type: { buffer: { length: 32 } } },
                { name: 'burn-height', type: 'uint128' },
                { name: 'recipient', type: 'principal' },
                { name: 'sweep-txid', type: { buffer: { length: 32 } } },
                { name: 'txid', type: { buffer: { length: 32 } } },
                { name: 'vout-index', type: 'uint128' },
              ],
            },
          },
          { name: 'helper-response', type: { response: { ok: 'uint128', error: 'uint128' } } },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          deposit: TypedAbiArg<
            {
              amount: number | bigint;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              recipient: string;
              sweepTxid: Uint8Array;
              txid: Uint8Array;
              voutIndex: number | bigint;
            },
            'deposit'
          >,
          helperResponse: TypedAbiArg<Response<number | bigint, number | bigint>, 'helperResponse'>
        ],
        Response<bigint, bigint>
      >,
      completeDepositWrapper: {
        name: 'complete-deposit-wrapper',
        access: 'public',
        args: [
          { name: 'txid', type: { buffer: { length: 32 } } },
          { name: 'vout-index', type: 'uint128' },
          { name: 'amount', type: 'uint128' },
          { name: 'recipient', type: 'principal' },
          { name: 'burn-hash', type: { buffer: { length: 32 } } },
          { name: 'burn-height', type: 'uint128' },
          { name: 'sweep-txid', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, 'txid'>,
          voutIndex: TypedAbiArg<number | bigint, 'voutIndex'>,
          amount: TypedAbiArg<number | bigint, 'amount'>,
          recipient: TypedAbiArg<string, 'recipient'>,
          burnHash: TypedAbiArg<Uint8Array, 'burnHash'>,
          burnHeight: TypedAbiArg<number | bigint, 'burnHeight'>,
          sweepTxid: TypedAbiArg<Uint8Array, 'sweepTxid'>
        ],
        Response<boolean, bigint>
      >,
      completeDepositsWrapper: {
        name: 'complete-deposits-wrapper',
        access: 'public',
        args: [
          {
            name: 'deposits',
            type: {
              list: {
                type: {
                  tuple: [
                    { name: 'amount', type: 'uint128' },
                    { name: 'burn-hash', type: { buffer: { length: 32 } } },
                    { name: 'burn-height', type: 'uint128' },
                    { name: 'recipient', type: 'principal' },
                    { name: 'sweep-txid', type: { buffer: { length: 32 } } },
                    { name: 'txid', type: { buffer: { length: 32 } } },
                    { name: 'vout-index', type: 'uint128' },
                  ],
                },
                length: 500,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          deposits: TypedAbiArg<
            {
              amount: number | bigint;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              recipient: string;
              sweepTxid: Uint8Array;
              txid: Uint8Array;
              voutIndex: number | bigint;
            }[],
            'deposits'
          >
        ],
        Response<bigint, bigint>
      >,
      getBurnHeader: {
        name: 'get-burn-header',
        access: 'read_only',
        args: [{ name: 'height', type: 'uint128' }],
        outputs: { type: { optional: { buffer: { length: 32 } } } },
      } as TypedAbiFunction<[height: TypedAbiArg<number | bigint, 'height'>], Uint8Array | null>,
    },
    maps: {},
    variables: {
      ERR_DEPOSIT: {
        name: 'ERR_DEPOSIT',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_DEPOSIT_INDEX_PREFIX: {
        name: 'ERR_DEPOSIT_INDEX_PREFIX',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      ERR_DEPOSIT_REPLAY: {
        name: 'ERR_DEPOSIT_REPLAY',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_BURN_HASH: {
        name: 'ERR_INVALID_BURN_HASH',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_CALLER: {
        name: 'ERR_INVALID_CALLER',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_LOWER_THAN_DUST: {
        name: 'ERR_LOWER_THAN_DUST',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TXID_LEN: {
        name: 'ERR_TXID_LEN',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      depositRole: {
        name: 'deposit-role',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      dustLimit: {
        name: 'dust-limit',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      txidLength: {
        name: 'txid-length',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch30',
    clarity_version: 'Clarity3',
    contractName: 'sbtc-deposit',
  },
  sbtcRegistry: {
    functions: {
      incrementLastWithdrawalRequestId: {
        name: 'increment-last-withdrawal-request-id',
        access: 'private',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      completeDeposit: {
        name: 'complete-deposit',
        access: 'public',
        args: [
          { name: 'txid', type: { buffer: { length: 32 } } },
          { name: 'vout-index', type: 'uint128' },
          { name: 'amount', type: 'uint128' },
          { name: 'recipient', type: 'principal' },
          { name: 'burn-hash', type: { buffer: { length: 32 } } },
          { name: 'burn-height', type: 'uint128' },
          { name: 'sweep-txid', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, 'txid'>,
          voutIndex: TypedAbiArg<number | bigint, 'voutIndex'>,
          amount: TypedAbiArg<number | bigint, 'amount'>,
          recipient: TypedAbiArg<string, 'recipient'>,
          burnHash: TypedAbiArg<Uint8Array, 'burnHash'>,
          burnHeight: TypedAbiArg<number | bigint, 'burnHeight'>,
          sweepTxid: TypedAbiArg<Uint8Array, 'sweepTxid'>
        ],
        Response<boolean, bigint>
      >,
      completeWithdrawalAccept: {
        name: 'complete-withdrawal-accept',
        access: 'public',
        args: [
          { name: 'request-id', type: 'uint128' },
          { name: 'bitcoin-txid', type: { buffer: { length: 32 } } },
          { name: 'output-index', type: 'uint128' },
          { name: 'signer-bitmap', type: 'uint128' },
          { name: 'fee', type: 'uint128' },
          { name: 'burn-hash', type: { buffer: { length: 32 } } },
          { name: 'burn-height', type: 'uint128' },
          { name: 'sweep-txid', type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, 'requestId'>,
          bitcoinTxid: TypedAbiArg<Uint8Array, 'bitcoinTxid'>,
          outputIndex: TypedAbiArg<number | bigint, 'outputIndex'>,
          signerBitmap: TypedAbiArg<number | bigint, 'signerBitmap'>,
          fee: TypedAbiArg<number | bigint, 'fee'>,
          burnHash: TypedAbiArg<Uint8Array, 'burnHash'>,
          burnHeight: TypedAbiArg<number | bigint, 'burnHeight'>,
          sweepTxid: TypedAbiArg<Uint8Array, 'sweepTxid'>
        ],
        Response<boolean, bigint>
      >,
      completeWithdrawalReject: {
        name: 'complete-withdrawal-reject',
        access: 'public',
        args: [
          { name: 'request-id', type: 'uint128' },
          { name: 'signer-bitmap', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, 'requestId'>,
          signerBitmap: TypedAbiArg<number | bigint, 'signerBitmap'>
        ],
        Response<boolean, bigint>
      >,
      createWithdrawalRequest: {
        name: 'create-withdrawal-request',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'max-fee', type: 'uint128' },
          { name: 'sender', type: 'principal' },
          {
            name: 'recipient',
            type: {
              tuple: [
                { name: 'hashbytes', type: { buffer: { length: 32 } } },
                { name: 'version', type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: 'height', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          maxFee: TypedAbiArg<number | bigint, 'maxFee'>,
          sender: TypedAbiArg<string, 'sender'>,
          recipient: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            'recipient'
          >,
          height: TypedAbiArg<number | bigint, 'height'>
        ],
        Response<bigint, bigint>
      >,
      rotateKeys: {
        name: 'rotate-keys',
        access: 'public',
        args: [
          { name: 'new-keys', type: { list: { type: { buffer: { length: 33 } }, length: 128 } } },
          { name: 'new-address', type: 'principal' },
          { name: 'new-aggregate-pubkey', type: { buffer: { length: 33 } } },
          { name: 'new-signature-threshold', type: 'uint128' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          newKeys: TypedAbiArg<Uint8Array[], 'newKeys'>,
          newAddress: TypedAbiArg<string, 'newAddress'>,
          newAggregatePubkey: TypedAbiArg<Uint8Array, 'newAggregatePubkey'>,
          newSignatureThreshold: TypedAbiArg<number | bigint, 'newSignatureThreshold'>
        ],
        Response<boolean, bigint>
      >,
      updateProtocolContract: {
        name: 'update-protocol-contract',
        access: 'public',
        args: [
          { name: 'contract-type', type: { buffer: { length: 1 } } },
          { name: 'new-contract', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          contractType: TypedAbiArg<Uint8Array, 'contractType'>,
          newContract: TypedAbiArg<string, 'newContract'>
        ],
        Response<boolean, bigint>
      >,
      getActiveProtocol: {
        name: 'get-active-protocol',
        access: 'read_only',
        args: [{ name: 'contract-flag', type: { buffer: { length: 1 } } }],
        outputs: { type: { optional: 'principal' } },
      } as TypedAbiFunction<[contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>], string | null>,
      getCompletedDeposit: {
        name: 'get-completed-deposit',
        access: 'read_only',
        args: [
          { name: 'txid', type: { buffer: { length: 32 } } },
          { name: 'vout-index', type: 'uint128' },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipient', type: 'principal' },
                { name: 'sweep-burn-hash', type: { buffer: { length: 32 } } },
                { name: 'sweep-burn-height', type: 'uint128' },
                { name: 'sweep-txid', type: { buffer: { length: 32 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, 'txid'>,
          voutIndex: TypedAbiArg<number | bigint, 'voutIndex'>
        ],
        {
          amount: bigint;
          recipient: string;
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        } | null
      >,
      getCompletedWithdrawalSweepData: {
        name: 'get-completed-withdrawal-sweep-data',
        access: 'read_only',
        args: [{ name: 'id', type: 'uint128' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'sweep-burn-hash', type: { buffer: { length: 32 } } },
                { name: 'sweep-burn-height', type: 'uint128' },
                { name: 'sweep-txid', type: { buffer: { length: 32 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [id: TypedAbiArg<number | bigint, 'id'>],
        {
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        } | null
      >,
      getCurrentAggregatePubkey: {
        name: 'get-current-aggregate-pubkey',
        access: 'read_only',
        args: [],
        outputs: { type: { buffer: { length: 33 } } },
      } as TypedAbiFunction<[], Uint8Array>,
      getCurrentSignerData: {
        name: 'get-current-signer-data',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            tuple: [
              { name: 'current-aggregate-pubkey', type: { buffer: { length: 33 } } },
              { name: 'current-signature-threshold', type: 'uint128' },
              { name: 'current-signer-principal', type: 'principal' },
              {
                name: 'current-signer-set',
                type: { list: { type: { buffer: { length: 33 } }, length: 128 } },
              },
            ],
          },
        },
      } as TypedAbiFunction<
        [],
        {
          currentAggregatePubkey: Uint8Array;
          currentSignatureThreshold: bigint;
          currentSignerPrincipal: string;
          currentSignerSet: Uint8Array[];
        }
      >,
      getCurrentSignerPrincipal: {
        name: 'get-current-signer-principal',
        access: 'read_only',
        args: [],
        outputs: { type: 'principal' },
      } as TypedAbiFunction<[], string>,
      getCurrentSignerSet: {
        name: 'get-current-signer-set',
        access: 'read_only',
        args: [],
        outputs: { type: { list: { type: { buffer: { length: 33 } }, length: 128 } } },
      } as TypedAbiFunction<[], Uint8Array[]>,
      getDepositStatus: {
        name: 'get-deposit-status',
        access: 'read_only',
        args: [
          { name: 'txid', type: { buffer: { length: 32 } } },
          { name: 'vout-index', type: 'uint128' },
        ],
        outputs: { type: { optional: 'bool' } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, 'txid'>,
          voutIndex: TypedAbiArg<number | bigint, 'voutIndex'>
        ],
        boolean | null
      >,
      getWithdrawalRequest: {
        name: 'get-withdrawal-request',
        access: 'read_only',
        args: [{ name: 'id', type: 'uint128' }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'block-height', type: 'uint128' },
                { name: 'max-fee', type: 'uint128' },
                {
                  name: 'recipient',
                  type: {
                    tuple: [
                      { name: 'hashbytes', type: { buffer: { length: 32 } } },
                      { name: 'version', type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: 'sender', type: 'principal' },
                { name: 'status', type: { optional: 'bool' } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [id: TypedAbiArg<number | bigint, 'id'>],
        {
          amount: bigint;
          blockHeight: bigint;
          maxFee: bigint;
          recipient: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          sender: string;
          status: boolean | null;
        } | null
      >,
      isProtocolCaller: {
        name: 'is-protocol-caller',
        access: 'read_only',
        args: [
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
          { name: 'contract', type: 'principal' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>,
          contract: TypedAbiArg<string, 'contract'>
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {
      activeProtocolContracts: {
        name: 'active-protocol-contracts',
        key: { buffer: { length: 1 } },
        value: 'principal',
      } as TypedAbiMap<Uint8Array, string>,
      activeProtocolRoles: {
        name: 'active-protocol-roles',
        key: 'principal',
        value: { buffer: { length: 1 } },
      } as TypedAbiMap<string, Uint8Array>,
      aggregatePubkeys: {
        name: 'aggregate-pubkeys',
        key: { buffer: { length: 33 } },
        value: 'bool',
      } as TypedAbiMap<Uint8Array, boolean>,
      completedDeposits: {
        name: 'completed-deposits',
        key: {
          tuple: [
            { name: 'txid', type: { buffer: { length: 32 } } },
            { name: 'vout-index', type: 'uint128' },
          ],
        },
        value: {
          tuple: [
            { name: 'amount', type: 'uint128' },
            { name: 'recipient', type: 'principal' },
            { name: 'sweep-burn-hash', type: { buffer: { length: 32 } } },
            { name: 'sweep-burn-height', type: 'uint128' },
            { name: 'sweep-txid', type: { buffer: { length: 32 } } },
          ],
        },
      } as TypedAbiMap<
        {
          txid: Uint8Array;
          voutIndex: number | bigint;
        },
        {
          amount: bigint;
          recipient: string;
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        }
      >,
      completedWithdrawalSweep: {
        name: 'completed-withdrawal-sweep',
        key: 'uint128',
        value: {
          tuple: [
            { name: 'sweep-burn-hash', type: { buffer: { length: 32 } } },
            { name: 'sweep-burn-height', type: 'uint128' },
            { name: 'sweep-txid', type: { buffer: { length: 32 } } },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        }
      >,
      depositStatus: {
        name: 'deposit-status',
        key: {
          tuple: [
            { name: 'txid', type: { buffer: { length: 32 } } },
            { name: 'vout-index', type: 'uint128' },
          ],
        },
        value: 'bool',
      } as TypedAbiMap<
        {
          txid: Uint8Array;
          voutIndex: number | bigint;
        },
        boolean
      >,
      withdrawalRequests: {
        name: 'withdrawal-requests',
        key: 'uint128',
        value: {
          tuple: [
            { name: 'amount', type: 'uint128' },
            { name: 'block-height', type: 'uint128' },
            { name: 'max-fee', type: 'uint128' },
            {
              name: 'recipient',
              type: {
                tuple: [
                  { name: 'hashbytes', type: { buffer: { length: 32 } } },
                  { name: 'version', type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: 'sender', type: 'principal' },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          amount: bigint;
          blockHeight: bigint;
          maxFee: bigint;
          recipient: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          sender: string;
        }
      >,
      withdrawalStatus: { name: 'withdrawal-status', key: 'uint128', value: 'bool' } as TypedAbiMap<
        number | bigint,
        boolean
      >,
    },
    variables: {
      ERR_AGG_PUBKEY_REPLAY: {
        name: 'ERR_AGG_PUBKEY_REPLAY',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_REQUEST_ID: {
        name: 'ERR_INVALID_REQUEST_ID',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED: {
        name: 'ERR_UNAUTHORIZED',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      depositRole: {
        name: 'deposit-role',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      governanceRole: {
        name: 'governance-role',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      withdrawalRole: {
        name: 'withdrawal-role',
        type: {
          buffer: {
            length: 1,
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Uint8Array>,
      currentAggregatePubkey: {
        name: 'current-aggregate-pubkey',
        type: {
          buffer: {
            length: 33,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<Uint8Array>,
      currentSignatureThreshold: {
        name: 'current-signature-threshold',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
      currentSignerPrincipal: {
        name: 'current-signer-principal',
        type: 'principal',
        access: 'variable',
      } as TypedAbiVariable<string>,
      currentSignerSet: {
        name: 'current-signer-set',
        type: {
          list: {
            type: {
              buffer: {
                length: 33,
              },
            },
            length: 128,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<Uint8Array[]>,
      lastWithdrawalRequestId: {
        name: 'last-withdrawal-request-id',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: 'Epoch30',
    clarity_version: 'Clarity3',
    contractName: 'sbtc-registry',
  },
  sbtcToken: {
    functions: {
      protocolMintManyIter: {
        name: 'protocol-mint-many-iter',
        access: 'private',
        args: [
          {
            name: 'item',
            type: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipient', type: 'principal' },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            },
            'item'
          >
        ],
        Response<boolean, bigint>
      >,
      transferManyIter: {
        name: 'transfer-many-iter',
        access: 'private',
        args: [
          {
            name: 'individual-transfer',
            type: {
              tuple: [
                { name: 'amount', type: 'uint128' },
                { name: 'memo', type: { optional: { buffer: { length: 34 } } } },
                { name: 'sender', type: 'principal' },
                { name: 'to', type: 'principal' },
              ],
            },
          },
          { name: 'result', type: { response: { ok: 'uint128', error: 'uint128' } } },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          individualTransfer: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              sender: string;
              to: string;
            },
            'individualTransfer'
          >,
          result: TypedAbiArg<Response<number | bigint, number | bigint>, 'result'>
        ],
        Response<bigint, bigint>
      >,
      protocolBurn: {
        name: 'protocol-burn',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'owner', type: 'principal' },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          owner: TypedAbiArg<string, 'owner'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolBurnLocked: {
        name: 'protocol-burn-locked',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'owner', type: 'principal' },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          owner: TypedAbiArg<string, 'owner'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolLock: {
        name: 'protocol-lock',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'owner', type: 'principal' },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          owner: TypedAbiArg<string, 'owner'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolMint: {
        name: 'protocol-mint',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'recipient', type: 'principal' },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          recipient: TypedAbiArg<string, 'recipient'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolMintMany: {
        name: 'protocol-mint-many',
        access: 'public',
        args: [
          {
            name: 'recipients',
            type: {
              list: {
                type: {
                  tuple: [
                    { name: 'amount', type: 'uint128' },
                    { name: 'recipient', type: 'principal' },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: { list: { type: { response: { ok: 'bool', error: 'uint128' } }, length: 200 } },
              error: 'uint128',
            },
          },
        },
      } as TypedAbiFunction<
        [
          recipients: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            }[],
            'recipients'
          >,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<Response<boolean, bigint>[], bigint>
      >,
      protocolSetName: {
        name: 'protocol-set-name',
        access: 'public',
        args: [
          { name: 'new-name', type: { 'string-ascii': { length: 32 } } },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          newName: TypedAbiArg<string, 'newName'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolSetSymbol: {
        name: 'protocol-set-symbol',
        access: 'public',
        args: [
          { name: 'new-symbol', type: { 'string-ascii': { length: 10 } } },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          newSymbol: TypedAbiArg<string, 'newSymbol'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolSetTokenUri: {
        name: 'protocol-set-token-uri',
        access: 'public',
        args: [
          { name: 'new-uri', type: { optional: { 'string-utf8': { length: 256 } } } },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          newUri: TypedAbiArg<string | null, 'newUri'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      protocolUnlock: {
        name: 'protocol-unlock',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'owner', type: 'principal' },
          { name: 'contract-flag', type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          owner: TypedAbiArg<string, 'owner'>,
          contractFlag: TypedAbiArg<Uint8Array, 'contractFlag'>
        ],
        Response<boolean, bigint>
      >,
      transfer: {
        name: 'transfer',
        access: 'public',
        args: [
          { name: 'amount', type: 'uint128' },
          { name: 'sender', type: 'principal' },
          { name: 'recipient', type: 'principal' },
          { name: 'memo', type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, 'amount'>,
          sender: TypedAbiArg<string, 'sender'>,
          recipient: TypedAbiArg<string, 'recipient'>,
          memo: TypedAbiArg<Uint8Array | null, 'memo'>
        ],
        Response<boolean, bigint>
      >,
      transferMany: {
        name: 'transfer-many',
        access: 'public',
        args: [
          {
            name: 'recipients',
            type: {
              list: {
                type: {
                  tuple: [
                    { name: 'amount', type: 'uint128' },
                    { name: 'memo', type: { optional: { buffer: { length: 34 } } } },
                    { name: 'sender', type: 'principal' },
                    { name: 'to', type: 'principal' },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: 'uint128', error: 'uint128' } } },
      } as TypedAbiFunction<
        [
          recipients: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              sender: string;
              to: string;
            }[],
            'recipients'
          >
        ],
        Response<bigint, bigint>
      >,
      getBalance: {
        name: 'get-balance',
        access: 'read_only',
        args: [{ name: 'who', type: 'principal' }],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[who: TypedAbiArg<string, 'who'>], Response<bigint, null>>,
      getBalanceAvailable: {
        name: 'get-balance-available',
        access: 'read_only',
        args: [{ name: 'who', type: 'principal' }],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[who: TypedAbiArg<string, 'who'>], Response<bigint, null>>,
      getBalanceLocked: {
        name: 'get-balance-locked',
        access: 'read_only',
        args: [{ name: 'who', type: 'principal' }],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[who: TypedAbiArg<string, 'who'>], Response<bigint, null>>,
      getDecimals: {
        name: 'get-decimals',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: 'get-name',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: { 'string-ascii': { length: 32 } }, error: 'none' } } },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: 'get-symbol',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: { 'string-ascii': { length: 10 } }, error: 'none' } } },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: 'get-token-uri',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            response: { ok: { optional: { 'string-utf8': { length: 256 } } }, error: 'none' },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: 'get-total-supply',
        access: 'read_only',
        args: [],
        outputs: { type: { response: { ok: 'uint128', error: 'none' } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_OWNER: {
        name: 'ERR_NOT_OWNER',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TRANSFER_INDEX_PREFIX: {
        name: 'ERR_TRANSFER_INDEX_PREFIX',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      tokenDecimals: {
        name: 'token-decimals',
        type: 'uint128',
        access: 'constant',
      } as TypedAbiVariable<bigint>,
      tokenName: {
        name: 'token-name',
        type: {
          'string-ascii': {
            length: 32,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string>,
      tokenSymbol: {
        name: 'token-symbol',
        type: {
          'string-ascii': {
            length: 10,
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string>,
      tokenUri: {
        name: 'token-uri',
        type: {
          optional: {
            'string-utf8': {
              length: 256,
            },
          },
        },
        access: 'variable',
      } as TypedAbiVariable<string | null>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [{ name: 'sbtc-token' }, { name: 'sbtc-token-locked' }],
    epoch: 'Epoch30',
    clarity_version: 'Clarity3',
    contractName: 'sbtc-token',
  },
  tester: {
    functions: {
      complexArgs: {
        name: 'complex-args',
        access: 'public',
        args: [
          { name: 'a', type: 'uint128' },
          { name: 'b', type: 'int128' },
          { name: 'c', type: 'bool' },
          { name: 'd', type: 'principal' },
          { name: 'f', type: { buffer: { length: 10 } } },
          { name: 'g', type: { 'string-ascii': { length: 10 } } },
          { name: 'h', type: { 'string-utf8': { length: 10 } } },
          { name: 'i', type: { optional: 'uint128' } },
          { name: 'j', type: { list: { type: 'uint128', length: 10 } } },
          {
            name: 'k',
            type: {
              tuple: [
                { name: 'a', type: 'uint128' },
                { name: 'b', type: 'bool' },
              ],
            },
          },
          { name: 'l', type: { response: { ok: 'uint128', error: 'uint128' } } },
          { name: 'm', type: { optional: 'uint128' } },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<
        [
          a: TypedAbiArg<number | bigint, 'a'>,
          b: TypedAbiArg<number | bigint, 'b'>,
          c: TypedAbiArg<boolean, 'c'>,
          d: TypedAbiArg<string, 'd'>,
          f: TypedAbiArg<Uint8Array, 'f'>,
          g: TypedAbiArg<string, 'g'>,
          h: TypedAbiArg<string, 'h'>,
          i: TypedAbiArg<number | bigint | null, 'i'>,
          j: TypedAbiArg<number | bigint[], 'j'>,
          k: TypedAbiArg<
            {
              a: number | bigint;
              b: boolean;
            },
            'k'
          >,
          l: TypedAbiArg<Response<number | bigint, number | bigint>, 'l'>,
          m: TypedAbiArg<number | bigint | null, 'm'>
        ],
        Response<boolean, null>
      >,
      printErr: {
        name: 'print-err',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'none', error: 'uint128' } } },
      } as TypedAbiFunction<[], Response<null, bigint>>,
      printPub: {
        name: 'print-pub',
        access: 'public',
        args: [],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<[], Response<boolean, null>>,
      responseInResponse: {
        name: 'response-in-response',
        access: 'public',
        args: [],
        outputs: {
          type: {
            response: {
              ok: { tuple: [{ name: 'a', type: { response: { ok: 'uint128', error: 'none' } } }] },
              error: 'none',
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            a: Response<bigint, null>;
          },
          null
        >
      >,
      setInMap: {
        name: 'set-in-map',
        access: 'public',
        args: [
          { name: 'key', type: 'uint128' },
          { name: 'val', type: 'bool' },
        ],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<
        [key: TypedAbiArg<number | bigint, 'key'>, val: TypedAbiArg<boolean, 'val'>],
        Response<boolean, null>
      >,
      setNum: {
        name: 'set-num',
        access: 'public',
        args: [{ name: 'num', type: 'uint128' }],
        outputs: { type: { response: { ok: 'bool', error: 'none' } } },
      } as TypedAbiFunction<[num: TypedAbiArg<number | bigint, 'num'>], Response<boolean, null>>,
      clarity4Test: {
        name: 'clarity-4-test',
        access: 'read_only',
        args: [],
        outputs: { type: 'uint128' },
      } as TypedAbiFunction<[], bigint>,
      echo: {
        name: 'echo',
        access: 'read_only',
        args: [{ name: 'val', type: { 'string-ascii': { length: 33 } } }],
        outputs: { type: { 'string-ascii': { length: 33 } } },
      } as TypedAbiFunction<[val: TypedAbiArg<string, 'val'>], string>,
      echoWithLogs: {
        name: 'echo-with-logs',
        access: 'read_only',
        args: [{ name: 'val', type: { 'string-ascii': { length: 33 } } }],
        outputs: { type: { 'string-ascii': { length: 33 } } },
      } as TypedAbiFunction<[val: TypedAbiArg<string, 'val'>], string>,
      getTenureInfoTest: {
        name: 'get-tenure-info-test',
        access: 'read_only',
        args: [],
        outputs: { type: { optional: { buffer: { length: 32 } } } },
      } as TypedAbiFunction<[], Uint8Array | null>,
      getTup: {
        name: 'get-tup',
        access: 'read_only',
        args: [],
        outputs: {
          type: {
            tuple: [
              { name: 'a', type: 'uint128' },
              { name: 'bool-prop', type: 'bool' },
              {
                name: 'tuple-prop',
                type: { tuple: [{ name: 'sub-prop', type: { 'string-ascii': { length: 4 } } }] },
              },
            ],
          },
        },
      } as TypedAbiFunction<
        [],
        {
          a: bigint;
          boolProp: boolean;
          tupleProp: {
            subProp: string;
          };
        }
      >,
      mergeTuple: {
        name: 'merge-tuple',
        access: 'read_only',
        args: [{ name: 'i', type: { tuple: [{ name: 'min-height', type: 'uint128' }] } }],
        outputs: {
          type: {
            tuple: [
              { name: 'max-height', type: 'uint128' },
              { name: 'min-height', type: 'uint128' },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          i: TypedAbiArg<
            {
              minHeight: number | bigint;
            },
            'i'
          >
        ],
        {
          maxHeight: bigint;
          minHeight: bigint;
        }
      >,
      roResp: {
        name: 'ro-resp',
        access: 'read_only',
        args: [{ name: 'return-err', type: 'bool' }],
        outputs: {
          type: { response: { ok: { 'string-ascii': { length: 4 } }, error: 'uint128' } },
        },
      } as TypedAbiFunction<
        [returnErr: TypedAbiArg<boolean, 'returnErr'>],
        Response<string, bigint>
      >,
    },
    maps: {
      simpleMap: { name: 'simple-map', key: 'uint128', value: 'bool' } as TypedAbiMap<
        number | bigint,
        boolean
      >,
    },
    variables: {
      ERR_ONE: {
        name: 'ERR_ONE',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TWO: {
        name: 'ERR_TWO',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      errThree: {
        name: 'err-three',
        type: {
          response: {
            ok: 'none',
            error: 'uint128',
          },
        },
        access: 'constant',
      } as TypedAbiVariable<Response<null, bigint>>,
      numVar: {
        name: 'num-var',
        type: 'uint128',
        access: 'variable',
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_ONE: {
        isOk: false,
        value: 1n,
      },
      ERR_TWO: {
        isOk: false,
        value: 2n,
      },
      errThree: {
        isOk: false,
        value: 3n,
      },
      numVar: 0n,
    },
    non_fungible_tokens: [
      { name: 'nft', type: 'uint128' },
      {
        name: 'tuple-nft',
        type: {
          tuple: [
            { name: 'a', type: 'uint128' },
            { name: 'b', type: 'bool' },
          ],
        },
      },
    ],
    fungible_tokens: [{ name: 'ft' }],
    epoch: 'Epoch33',
    clarity_version: 'Clarity4',
    contractName: 'tester',
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
  wrappedBitcoin: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin',
  counter: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.counter',
  ftTrait: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.ft-trait',
  restrictedTokenTrait: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.restricted-token-trait',
  sbtcDeposit: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit',
  sbtcRegistry: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry',
  sbtcToken: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token',
  tester: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester',
} as const;

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;

export const deployments = {
  wrappedBitcoin: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.Wrapped-Bitcoin',
    simnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin',
    testnet: null,
    mainnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin',
  },
  counter: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.counter',
    simnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.counter',
    testnet: null,
    mainnet: null,
  },
  ftTrait: {
    devnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.ft-trait',
    simnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.ft-trait',
    testnet: null,
    mainnet: null,
  },
  restrictedTokenTrait: {
    devnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.restricted-token-trait',
    simnet: 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.restricted-token-trait',
    testnet: null,
    mainnet: null,
  },
  sbtcDeposit: {
    devnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit',
    simnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit',
    testnet: null,
    mainnet: null,
  },
  sbtcRegistry: {
    devnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry',
    simnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry',
    testnet: null,
    mainnet: null,
  },
  sbtcToken: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-token',
    simnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token',
    testnet: null,
    mainnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token',
  },
  tester: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester',
    simnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester',
    testnet: null,
    mainnet: null,
  },
} as const;

export const project = {
  contracts,
  deployments,
} as const;
