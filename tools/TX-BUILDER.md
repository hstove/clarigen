# TX Builder Context

Dynamic form builder for Clarity smart contract function calls.

## Route

`/tx/:network/:contractAddress/:functionName`

Examples:

- `/tx/mainnet/SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx-v1/transfer`
- `/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester/complex-args`

## Key Files

| File                                                        | Purpose                                                |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| `src/routes/tx.$network.$contractAddress.$functionName.tsx` | Main route - form rendering, submission handling       |
| `src/components/tx-builder/clarity-field.tsx`               | Dispatcher: routes ABI type to correct field component |
| `src/components/tx-builder/fields/*.tsx`                    | Individual field components per Clarity type           |
| `src/hooks/use-contract-abi.ts`                             | TanStack Query hooks for ABI fetching                  |
| `src/hooks/use-tx-url-state.ts`                             | nuqs-based URL state sync for form values              |
| `src/lib/clarity-form-utils.ts`                             | Form values → ClarityValue conversion                  |

## Architecture

```
URL params → useContractFunction() → func.args → ClarityField per arg
                                                      ↓
                                            Renders typed input
                                                      ↓
Form submit → formValuesToFunctionArgs() → ClarityValue[]
                                                      ↓
                              read_only: fetch /read/... API
                              public: stx_callContract via @stacks/connect
```

## Clarity Type → Field Mapping

| Type                | Component          | Notes                      |
| ------------------- | ------------------ | -------------------------- |
| `uint128`, `int128` | `NumberField`      | Text input, string values  |
| `bool`              | `BoolField`        | Switch toggle              |
| `principal`         | `PrincipalField`   | SP.../ST... validation     |
| `trait_reference`   | `PrincipalField`   | With `requireContract`     |
| `(buff N)`          | `BufferField`      | Hex input                  |
| `(string-ascii N)`  | `StringAsciiField` | With length constraint     |
| `(string-utf8 N)`   | `StringUtf8Field`  | With length constraint     |
| `(optional T)`      | `OptionalField`    | Toggle + nested field      |
| `(list N T)`        | `ListField`        | Add/remove + nested fields |
| `{tuple ...}`       | `TupleField`       | Nested FieldGroup          |

## Form Value Shapes

Understanding form state shapes is critical for debugging:

```ts
// Primitives
amount: "1000"           // uint128/int128 as string
enabled: true            // bool
recipient: "SP..."       // principal

// Optional
memo: { isNone: true, value: null }
memo: { isNone: false, value: "hello" }

// List
items: ["a", "b", "c"]

// Tuple
data: { key1: "val1", key2: 123 }
```

## Nested Field Context

Complex fields (optional, list, tuple) must wrap child `ClarityField` with `fieldContext.Provider`. Without this, nested fields receive parent's value.

Pattern in `*-field.tsx`:

```tsx
<form.Field name={`${field.name}.value`}>
  {nestedField => (
    <fieldContext.Provider value={nestedField}>
      <ClarityField ... />
    </fieldContext.Provider>
  )}
</form.Field>
```

## URL State

Form values sync bidirectionally with URL query params via `useTxUrlState()`. Enables shareable pre-filled links.

The hook also manages `txid` param for post-submission state.

## Test URLs

- Complex args: `http://localhost:2527/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester/complex-args`
- Simple transfer: `http://localhost:2527/tx/mainnet/SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-abtc/transfer`

## Deep Dives

For implementation history and design decisions, see:

- `history/tx-builder-plan.md` - Original design doc
- `history/tx-builder-progress.md` - Task-by-task implementation notes
