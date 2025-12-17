# Transaction Builder Feature Plan

## Overview
Build a dynamic transaction builder that allows users to:
1. Navigate to a specific contract function via URL
2. See a dynamically generated form based on the function's ABI
3. Fill in arguments with proper validation per Clarity type
4. Eventually sign and submit the transaction (future work)

## Route Structure
`/tx/:network/:contractAddress/:functionName`

Examples:
- `/tx/mainnet/SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx-v1/transfer`
- `/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.counter/increment`

## Existing Infrastructure

### Stacks API (`web/src/lib/stacks-api.ts`)
- `getStacksApi(network)` - creates client for mainnet/testnet
- `getContractInfo(network, contractId)` - fetches contract metadata
- `getContractAbi(network, contractId)` - fetches and parses ABI

### Network Type (`web/src/lib/constants.ts`)
```ts
type NETWORK = 'devnet' | 'testnet' | 'mainnet'
```
For this feature, only 'mainnet' and 'testnet' are relevant.

### Clarigen Core (`packages/core/src/`)

**ABI Types (`abi-types.ts`)**:
- `ClarityAbiType` - union of all Clarity types
- `ClarityAbiFunction` - function definition with args and return type
- `ClarityAbiArg` - `{ name: string; type: ClarityAbiType }`

**Type Checkers (`clarity-types.ts`)**:
- `isClarityAbiPrimitive(val)` - int128, uint128, bool, principal, trait_reference, none
- `isClarityAbiBuffer(val)` - `{ buffer: { length: N } }`
- `isClarityAbiStringAscii(val)` - `{ 'string-ascii': { length: N } }`
- `isClarityAbiStringUtf8(val)` - `{ 'string-utf8': { length: N } }`
- `isClarityAbiOptional(val)` - `{ optional: T }`
- `isClarityAbiTuple(val)` - `{ tuple: [...] }`
- `isClarityAbiList(val)` - `{ list: { type: T, length: N } }`
- `isClarityAbiResponse(val)` - `{ response: { ok: T, error: E } }`

**Conversion (`clarity-types.ts`)**:
- `parseToCV(input, type)` - converts JS value to ClarityValue
- `getTypeString(val)` - converts ABI type to human-readable string

### Form Infrastructure (`web/src/`)

**Form Hook (`hooks/form.ts`)**:
```ts
const { useAppForm } = createFormHook({
  fieldComponents: { TextField, Select, TextArea },
  formComponents: { SubscribeButton },
  fieldContext, formContext,
});
```

**Form Components (`components/form-components.tsx`)**:
- `TextField` - basic text input
- `TextArea` - multiline text
- `Select` - dropdown select
- `Switch` - boolean toggle
- `Slider` - numeric slider
- `SubscribeButton` - submit button with loading state

## Clarity Type → Form Input Mapping

| Clarity Type | Input Component | Notes |
|-------------|-----------------|-------|
| `uint128` | NumberField | Accepts string, converts to bigint |
| `int128` | NumberField | Accepts string, converts to bigint |
| `bool` | Switch | Boolean toggle |
| `principal` | TextField | Stacks address validation |
| `trait_reference` | TextField | Contract principal (addr.contract) |
| `(buff N)` | HexField | Hex string input, validate length |
| `(string-ascii N)` | TextField | Validate ASCII only + max length |
| `(string-utf8 N)` | TextField | Validate max length |
| `(optional T)` | OptionalField | Toggle for none + recursive field |
| `(list N T)` | ListField | Add/remove items, recursive fields |
| `{tuple ...}` | TupleField | Nested form group |
| `(response)` | N/A | Typically not a function argument |

## Buffer Handling
Use `viem` for hex conversion:
```ts
import { fromHex, toHex } from 'viem'
// User input: "deadbeef" or "0xdeadbeef"
// Convert to Uint8Array: fromHex(`0x${input.replace(/^0x/, '')}`)
// Display: toHex(bytes)
```

## URL State with nuqs
Persist form values in URL query params for shareability:
```
/tx/mainnet/SP.../transfer?amount=1000&recipient=SP...
```

## Dependencies to Install
- `nuqs` - URL state management
- `@stacks/connect` - wallet connection
- `viem` - hex utilities (may already be available)

## File Structure
```
web/src/
├── routes/
│   └── tx/
│       └── $network.$contractAddress.$functionName.tsx
├── components/
│   └── tx-builder/
│       ├── clarity-field.tsx       # Main dispatcher component
│       ├── fields/
│       │   ├── number-field.tsx    # uint128, int128
│       │   ├── bool-field.tsx      # bool
│       │   ├── principal-field.tsx # principal, trait_reference
│       │   ├── buffer-field.tsx    # buff
│       │   ├── string-field.tsx    # string-ascii, string-utf8
│       │   ├── optional-field.tsx  # optional
│       │   ├── list-field.tsx      # list
│       │   └── tuple-field.tsx     # tuple
│       ├── tx-form.tsx             # Main form wrapper
│       └── function-selector.tsx   # (optional) function picker
├── hooks/
│   └── use-contract-abi.ts         # TanStack Query hook for ABI
└── lib/
    └── clarity-form-utils.ts       # Helpers for form ↔ Clarity conversion
```

## Wallet Connection (Stacks Connect)
Reference: https://docs.stacks.co/stacks-connect/connect-wallet

```ts
import { showConnect, AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write']);
const userSession = new UserSession({ appConfig });

// Connect wallet
showConnect({
  appDetails: { name: 'Clarigen TX Builder', icon: '...' },
  onFinish: () => { /* user connected */ },
  userSession,
});
```

## Implementation Order
1. Route setup with param validation
2. ABI fetching with TanStack Query
3. Basic form scaffold
4. Primitive type fields (uint, int, bool, principal, strings)
5. Buffer field with hex handling
6. Complex types (optional, list, tuple)
7. URL state with nuqs
8. Wallet connection
9. Transaction building (future)
