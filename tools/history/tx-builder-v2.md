# TX Builder V2 - Layout Redesign

## Overview

Transition from single-column stacked layout to two-column layout with distinct "Builder" and "Result" modes.

## Modes

| Mode    | Trigger          | Form State                    | Context Panel Shows |
| ------- | ---------------- | ----------------------------- | ------------------- |
| Builder | No `txid` in URL | Editable                      | Field Helper        |
| Result  | `txid` in URL    | Read-only (locked to tx args) | Transaction Status  |

## Layout

```
Wide (≥1024px):
┌──────────────────────────────────────────────────────────┐
│ Breadcrumbs / Contract Header                            │
├─────────────────────────────┬────────────────────────────┤
│ PRIMARY (form)              │ CONTEXT (helper/status)    │
│ ~60%                        │ ~40%                       │
└─────────────────────────────┴────────────────────────────┘

Narrow (<1024px): Single column, context stacks above form
```

## Key Files

| File                                                        | Purpose                                       |
| ----------------------------------------------------------- | --------------------------------------------- |
| `src/routes/tx.$network.$contractAddress.$functionName.tsx` | Main route, layout container                  |
| `src/components/tx-builder/context-panel.tsx`               | New: wrapper for field helper / tx status     |
| `src/components/tx-builder/field-helper.tsx`                | New: contextual helper based on focused field |
| `src/components/tx-builder/transaction-status.tsx`          | Existing: move into context panel             |
| `src/hooks/use-focused-field.ts`                            | New: track which field is focused             |

## Result Mode Behavior

When `txid` present:

1. Fetch tx via `useTransaction` (already exists)
2. Extract args from `tx.contract_call.function_args` (has `name`, `repr`, `hex`, `type`)
3. Populate form with these values (not URL params)
4. Disable all fields
5. Show "Clone to New" button → navigates without `txid`, form becomes editable

## Field Helper

Context panel shows helpers based on focused field type:

| Field Type    | Helper                                                          |
| ------------- | --------------------------------------------------------------- |
| `uint`, `int` | Decimal converter (configurable decimals: 6 for STX/USDC, etc.) |
| `principal`   | "Use connected wallet" button, future: address book             |
| `buff`        | Hex/text converter                                              |
| None focused  | Function info or tips                                           |

**Nested fields**: Helper determined by leaf type. Tuple member `amount: uint` shows uint helper.

## Responsive

- `lg:` (≥1024px): CSS grid two-column
- Below: single column stack

## Implementation Order

1. ✅ Mode distinction (disabled form, clone button)
2. ✅ Two-column layout + context panel
3. Field helper infrastructure
4. Uint decimal converter
5. Additional helpers (principal, buff)
6. Enhanced transaction display

## Implementation Notes

### Two-Column Layout (completed 2025-12-18)

Created `ContextPanel` component (`src/components/tx-builder/context-panel.tsx`) that:

- Shows `TransactionStatus` in Result mode (when `txid` present)
- Shows field helper placeholder in Builder mode
- Handles loading/error states for transaction fetching

Layout changes in main route:

- Container width changed from `max-w-2xl` to `max-w-6xl`
- CSS grid: `grid-cols-1 lg:grid-cols-[1fr_400px] gap-6`
- Context panel uses `lg:order-2 lg:sticky lg:top-6 lg:self-start` for sticky positioning on wide screens
- On mobile, context panel appears above the form
