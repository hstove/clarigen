# TX Builder Implementation Progress

## Completed: Task 1 - Route Setup

### What was done

Created the tx builder route at `web/src/routes/tx.$network.$contractAddress.$functionName.tsx`

### Key implementation details

**Route path**: `/tx/$network/$contractAddress/$functionName`

- Example: `/tx/mainnet/SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx-v1/transfer`

**Param validation**:

- `network`: Validated against arktype `Network` type, only allows 'mainnet' | 'testnet' (devnet excluded)
- `contractAddress`: Must contain exactly one `.` separator (e.g., `SP123.contract-name`)
- `functionName`: Validated against fetched ABI, must be public or read_only (not private)

**Loader**:

- Fetches contract ABI via `getContractAbi(network, contractId)` from `@/lib/stacks-api`
- Finds matching function in `abi.functions`
- Returns `{ network, contractId, contract, func, abi }` to component
- Throws `notFound()` for invalid params

**Component**:

- Basic scaffold showing network, contract ID, function name, and argument types
- Uses `getTypeString()` from `@clarigen/core` to display Clarity types

### Dependencies added

- `@clarigen/core` added as workspace dependency to web package

### Files modified

- Created: `web/src/routes/tx.$network.$contractAddress.$functionName.tsx`
- Modified: `web/src/components/Header.tsx` (removed stale demo links)
- Modified: `web/package.json` (added @clarigen/core)

### Related code references

- ABI types: `packages/core/src/abi-types.ts`
- Type checkers & parseToCV: `packages/core/src/clarity-types.ts`
- Stacks API helpers: `web/src/lib/stacks-api.ts`
- Network type: `web/src/lib/constants.ts`

## Completed: Task 2 - ABI Fetching Hook

### What was done

Created TanStack Query hooks for fetching contract ABI and extracting function metadata.

### File created

`web/src/hooks/use-contract-abi.ts`

### Hooks exported

**useContractAbi(network, contractId)**

- Fetches the full contract ABI using TanStack Query
- Query key: `['contractAbi', network, contractId]`
- Returns the standard useQuery result with `data` as `ClarityAbi`

**useContractFunction(network, contractId, functionName)**

- Uses `useContractAbi` internally
- Finds and returns a single function by name
- Filters out private functions (only returns public/read_only)
- Returns `{ data: ClarityAbiFunction | undefined, isLoading, error, ... }`

**useContractFunctions(network, contractId)**

- Uses `useContractAbi` internally
- Returns all non-private functions from the contract
- Useful for function picker/selector components

### Notes

- The ABI types come from `@stacks/transactions` (via `getContractAbi` return type)
- The route loader already fetches ABI server-side; these hooks are for client-side re-fetching or other components
- No type predicates used to avoid conflicts between `@clarigen/core` and `@stacks/transactions` type definitions

## Completed: Task 3 - Clarity Type Form Field Components

### What was done

Created form input components for each Clarity type, enabling dynamic form generation based on contract ABI.

### Directory structure

```
web/src/components/tx-builder/
├── index.ts                    # Re-exports ClarityField
├── clarity-field.tsx           # Main dispatcher component
└── fields/
    ├── number-field.tsx        # uint128, int128
    ├── bool-field.tsx          # bool
    ├── principal-field.tsx     # principal, trait_reference
    ├── buffer-field.tsx        # (buff N)
    ├── string-ascii-field.tsx  # (string-ascii N)
    ├── string-utf8-field.tsx   # (string-utf8 N)
    ├── optional-field.tsx      # (optional T)
    ├── list-field.tsx          # (list N T)
    └── tuple-field.tsx         # {tuple ...}
```

### Type → Component mapping

| Clarity Type       | Component        | Notes                                    |
| ------------------ | ---------------- | ---------------------------------------- |
| `uint128`          | NumberField      | Text input with numeric inputMode        |
| `int128`           | NumberField      | Same as uint, with signed flag           |
| `bool`             | BoolField        | Switch toggle                            |
| `principal`        | PrincipalField   | Text input for SP.../ST... addresses     |
| `trait_reference`  | PrincipalField   | Same with requireContract flag           |
| `(buff N)`         | BufferField      | Hex input with byte length display       |
| `(string-ascii N)` | StringAsciiField | Text with maxLength + char count         |
| `(string-utf8 N)`  | StringUtf8Field  | Same as ASCII                            |
| `(optional T)`     | OptionalField    | Toggle for none + recursive ClarityField |
| `(list N T)`       | ListField        | Add/remove buttons + recursive fields    |
| `{tuple ...}`      | TupleField       | Nested FieldGroup with recursive fields  |

### Key implementation details

**ClarityField dispatcher** (`clarity-field.tsx`):

- Uses type checkers from `@clarigen/core` (isClarityAbiPrimitive, isClarityAbiBuffer, etc.)
- Renders appropriate field component based on ClarityAbiType
- Recursive for nested types (optional, list, tuple)

**Complex fields (optional, list, tuple)**:

- Use both `useFieldContext()` and `useFormContext()` from TanStack Form
- Nested fields created via `form.Field` with dynamic name paths (e.g., `${field.name}.value`)
- ListField uses `field.pushValue()` and `field.removeValue()` for array manipulation

**UI components used**:

- Input, Button, Switch from `@/components/ui/`
- Field, FieldLabel, FieldError, FieldDescription, FieldGroup from `@/components/ui/field`

### Route integration

Updated `tx.$network.$contractAddress.$functionName.tsx`:

- Uses `useAppForm` with dynamic defaultValues computed from function args
- Wraps form in `form.AppForm` for context
- Renders ClarityField for each function argument
- Form submission logs values to console (ready for transaction building)

### Dependencies added

- `viem` - for hex utilities in buffer handling

### Files created

- `web/src/components/tx-builder/clarity-field.tsx`
- `web/src/components/tx-builder/index.ts`
- `web/src/components/tx-builder/fields/number-field.tsx`
- `web/src/components/tx-builder/fields/bool-field.tsx`
- `web/src/components/tx-builder/fields/principal-field.tsx`
- `web/src/components/tx-builder/fields/buffer-field.tsx`
- `web/src/components/tx-builder/fields/string-ascii-field.tsx`
- `web/src/components/tx-builder/fields/string-utf8-field.tsx`
- `web/src/components/tx-builder/fields/optional-field.tsx`
- `web/src/components/tx-builder/fields/list-field.tsx`
- `web/src/components/tx-builder/fields/tuple-field.tsx`

### Files modified

- `web/src/routes/tx.$network.$contractAddress.$functionName.tsx` - integrated form with ClarityField
- `web/package.json` - added viem dependency

## Stacks wallet connection

In the header component (`web/src/components/header.tsx`), we added the `WalletButton` component.

We added `web/src/hooks/use-stacks.ts` to handle the wallet connection.

## Completed: clarigen-qfp - Client-side fetching & devnet support

- Added devnet support by allowing the `devnet` network param and pointing Stacks API requests to `http://localhost:3999` when selected.
- Moved tx builder data loading to client-side TanStack Query hooks; the route no longer fetches ABI via the loader and instead uses `useContractFunction` inside the component.
- Added inline loading/error/invalid-state handling for the tx builder page, keeping the form initialization keyed to the fetched function.

## Completed: Task 4 - URL State with nuqs

### What was done

Added URL state management using nuqs so form values sync bidirectionally with URL query params. Users can now share pre-filled transaction links.

### File created

`web/src/hooks/use-tx-url-state.ts`

### Implementation details

**Custom parsers for Clarity types**:

- `parseAsOptional` - Handles `{ isNone: boolean, value: unknown }` structure
- `parseAsList` - JSON serialization for array values
- `parseAsTuple` - JSON serialization for object values
- Primitives use built-in `parseAsString` and `parseAsBoolean`

**Parser mapping**:

| Clarity Type       | nuqs Parser      | Serialization           |
| ------------------ | ---------------- | ----------------------- |
| `uint128`          | parseAsString    | Direct string           |
| `int128`           | parseAsString    | Direct string           |
| `bool`             | parseAsBoolean   | `true`/`false`          |
| `principal`        | parseAsString    | Direct string           |
| `trait_reference`  | parseAsString    | Direct string           |
| `(buff N)`         | parseAsString    | Hex string              |
| `(string-ascii N)` | parseAsString    | Direct string           |
| `(string-utf8 N)`  | parseAsString    | Direct string           |
| `(optional T)`     | parseAsOptional  | JSON with isNone flag   |
| `(list N T)`       | parseAsList      | JSON array              |
| `{tuple ...}`      | parseAsTuple     | JSON object             |

**Hook API**:

```ts
const { urlState, setUrlState } = useTxUrlState(func.args);
```

- `urlState` - Current values from URL query params
- `setUrlState` - Update URL with new form values

**Route integration**:

- Form initializes with URL state values (falls back to defaults)
- Form changes sync to URL via `form.store.subscribe()`
- Initial values computed once on mount to avoid re-initialization loops

### Example URLs

```
/tx/mainnet/SP.../transfer?amount=1000&recipient=SP...
/tx/testnet/ST.../mint?enabled=true
```

### Files modified

- Created: `web/src/hooks/use-tx-url-state.ts`
- Modified: `web/src/routes/tx.$network.$contractAddress.$functionName.tsx` - integrated URL state hook

## Completed: Bug Fix - Nested Field Context

### Problem

Nested form fields (optional values, tuple members, list items) displayed `[object Object]` instead of their actual values when loaded from URL state.

### Root Causes

1. **Missing `fieldContext.Provider`**: In `TupleField`, `OptionalField`, and `ListField`, the nested `form.Field` components created new field instances but didn't provide them to React context. Child components using `useFieldContext()` received the parent field's value instead of the nested field's value.

2. **Invalid optional state from URL**: The `parseAsOptional` parser could return `{isNone: false, value: null}` which is semantically invalid - "has a value" but "value is null".

### Fixes Applied

**Field context propagation** - Added `fieldContext.Provider` wrapper in nested field render functions:

- `tuple-field.tsx`: Wrap each tuple member's `ClarityField` with its field context
- `optional-field.tsx`: Wrap the `.value` nested field with its field context
- `list-field.tsx`: Wrap each list item's `ClarityField` with its field context

**Optional parser validation** - Modified `parseAsOptional` in `use-tx-url-state.ts` to treat `{isNone: false, value: null}` as `{isNone: true, value: null}`, converting the invalid state to "none".

### Files modified

- `web/src/components/tx-builder/fields/tuple-field.tsx`
- `web/src/components/tx-builder/fields/optional-field.tsx`
- `web/src/components/tx-builder/fields/list-field.tsx`
- `web/src/hooks/use-tx-url-state.ts`
- `web/src/routes/tx.$network.$contractAddress.$functionName.tsx` (cleanup)
