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
3. ✅ Field helper infrastructure
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

### Field Helper Infrastructure (completed 2025-12-18)

Created focus tracking system with context-aware field helpers:

**Key files:**

- `src/hooks/use-focused-field.tsx` - React context and hooks for focus tracking
- `src/components/tx-builder/field-helper.tsx` - Main helper component with type-specific helpers

**Focus tracking:**

- `FocusedFieldProvider` wraps the form to provide focus context
- `useFieldFocusHandlers(name, type)` hook returns `onFocus`/`onBlur` handlers
- Each primitive field component calls these handlers on input focus/blur
- Nested fields (tuple members, list items) report their full path (e.g., `k.a`)

**Field helpers by type:**

- `uint`/`int`: Shows signed/unsigned info, decimal reminder for token amounts
- `principal`: Shows address format (SP.../ST...) and contract format for traits
- `buffer`: Shows max length, hex encoding instructions
- `string-ascii`/`string-utf8`: Shows encoding and length constraints
- `bool`: Shows toggle instructions

**Updated field components:**

- `number-field.tsx` - Added `type` prop and focus handlers
- `principal-field.tsx` - Added `type` prop and focus handlers
- `bool-field.tsx` - Added `type` prop and focus handlers
- `buffer-field.tsx` - Added `type` prop and focus handlers
- `string-ascii-field.tsx` - Added `type` prop and focus handlers
- `string-utf8-field.tsx` - Added `type` prop and focus handlers
- `clarity-field.tsx` - Now passes `type` to all primitive field components

### Principal Field Quick-Fill Buttons (completed 2025-12-18)

Enhanced the principal field helper with interactive quick-fill functionality:

**Key files:**

- `src/components/tx-builder/helpers/principal-helper.tsx` - New component with quick-fill buttons
- `src/components/tx-builder/field-helper.tsx` - Updated to use new PrincipalHelper
- `src/components/tx-builder/context-panel.tsx` - Updated to pass contractId prop
- `src/routes/tx.$network.$contractAddress.$functionName.tsx` - Updated to pass contractId to ContextPanel

**Features:**

- **Connect Wallet Button**: If no wallet is connected, shows a button to connect
- **Your Address Button**: Quick-fill with the user's connected wallet address
  - Automatically uses mainnet (SP...) or testnet (ST...) address based on route network
  - Shows address preview below the button
- **Contract Address Button**: Quick-fill with the current contract's address
  - Shows address preview below the button
  - Useful for self-referential contract calls

**Implementation details:**

- Uses `useAccount()` hook to get wallet connection status and addresses
- PrincipalHelper receives `network` and `contractId` props from the route
- Field helpers now accept an optional `setValue` function via focused field context
- When `setValue` is available, the enhanced helper with buttons is shown
- Falls back to basic info-only helper when `setValue` is not available
- `principal-field.tsx` now passes `field.handleChange` to `useFieldFocusHandlers`

**User experience:**

- Single click to fill in common addresses
- No typing or copy/paste needed
- Network-aware address conversion for wallet addresses
- Visual feedback with address previews
