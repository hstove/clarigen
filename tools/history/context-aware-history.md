# Context-Aware Value History

Implementation plan for field value history with tabbed field helper UI.

Related issue: `clarigen-hbz`

## Overview

Add a value history system that:

1. Stores previously used values scoped to specific (contract, function, argument) contexts
2. Also stores values globally by Clarity type for cross-contract reuse
3. Presents history in the field helper panel via a tabbed interface

## Architecture

### Storage Layer (`src/lib/value-history.ts`)

Two separate localStorage stores:

```
Context-Specific:
  Key: clarigen:history:${contractId}:${functionName}:${argName}
  Value: string[] (max 10 items, most recent first)

Type-Global:
  Key: clarigen:global:${clarityType}
  Value: string[] (max 20 items, most recent first)
```

**Storage functions:**

```ts
// Context-specific
function getContextHistory(contractId: string, functionName: string, argName: string): string[];
function addContextHistory(
  contractId: string,
  functionName: string,
  argName: string,
  value: string
): void;

// Type-global (e.g., "principal", "uint128")
function getTypeHistory(clarityType: string): string[];
function addTypeHistory(clarityType: string, value: string): void;

// Combined - merges context-specific (first) with type-global (deduplicated)
function getCombinedHistory(
  contractId: string,
  functionName: string,
  argName: string,
  clarityType: string
): { contextValues: string[]; typeValues: string[] };

// Batch save - called on form submission
function saveFormHistory(
  contractId: string,
  functionName: string,
  args: Array<{ name: string; type: string; value: string }>
): void;
```

**Design decisions:**

- Store raw string values (not serialized objects) - matches form field values
- Deduplicate on add (move existing to front rather than duplicate)
- Type-global uses simplified type string (e.g., "principal" not full ABI object)
- Empty strings are not stored

### React Hook (`src/hooks/use-value-history.ts`)

```ts
interface UseValueHistoryOptions {
  contractId: string;
  functionName: string;
  argName: string;
  clarityType: string;
}

interface UseValueHistoryReturn {
  contextHistory: string[];
  typeHistory: string[];
  refresh: () => void; // Re-read from localStorage
}

function useValueHistory(options: UseValueHistoryOptions): UseValueHistoryReturn;
```

The hook:

- Reads from localStorage on mount and when options change
- Provides `refresh()` for manual re-read after submission
- Does NOT auto-refresh on every render (performance)

### Form Submission Integration

In `tx.$network.$contractAddress.$functionName.tsx`, after successful submission:

```ts
// In onSubmit handler, after successful response
import { saveFormHistory } from '@/lib/value-history';
import { getTypeString } from '@clarigen/core';

// After form submission succeeds:
const argsToSave = func.args.map(arg => ({
  name: arg.name,
  type: getTypeString(arg.type), // Simplified type string
  value: serializeValue(value[arg.name]), // Convert to string
}));
saveFormHistory(contractId, func.name, argsToSave);
```

**Value serialization:**

- Primitives (string, number, bool): direct `String()` conversion
- Optional: store inner value if `isNone === false`, skip if none
- Tuple/List: skip (complex types not stored in v1)

### UI Components

#### Tabbed Field Helper (`src/components/tx-builder/field-helper.tsx`)

Transform the existing field helper into a tabbed interface:

```
┌─────────────────────────────────────────┐
│ field helper                        [x] │
├─────────────────────────────────────────┤
│ [tools]  [recent]                       │  ← Tab buttons
├─────────────────────────────────────────┤
│ argName                                 │
│                                         │
│ (tab content here)                      │
│                                         │
└─────────────────────────────────────────┘
```

**Tab implementation:**

- Use simple state: `const [activeTab, setActiveTab] = useState<'tools' | 'recent'>('tools')`
- Style tabs per UI-DESIGN.md (monospace, lowercase, border-based)
- "tools" tab shows existing `FieldHelperContent`
- "recent" tab shows new `HistoryHelper` component

**Tab button styling (TUI-inspired):**

```tsx
<div className="flex border-b border-border">
  <button
    className={cn(
      'px-3 py-1.5 font-mono text-xs transition-colors',
      activeTab === 'tools'
        ? 'border-b-2 border-primary text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    )}
    onClick={() => setActiveTab('tools')}
  >
    tools
  </button>
  <button
    className={cn(
      'px-3 py-1.5 font-mono text-xs transition-colors',
      activeTab === 'recent'
        ? 'border-b-2 border-primary text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    )}
    onClick={() => setActiveTab('recent')}
  >
    recent
  </button>
</div>
```

#### History Helper (`src/components/tx-builder/helpers/history-helper.tsx`)

Displays recent values with click-to-fill:

```tsx
interface HistoryHelperProps {
  contractId: string;
  functionName: string;
  field: FocusedField; // Has name, type, setValue
}

function HistoryHelper({ contractId, functionName, field }: HistoryHelperProps) {
  const { contextHistory, typeHistory } = useValueHistory({
    contractId,
    functionName,
    argName: field.name,
    clarityType: getTypeString(field.type),
  });

  // Render sections...
}
```

**UI structure:**

```
┌─────────────────────────────────────────┐
│ recent values                           │
├─────────────────────────────────────────┤
│ this field                              │  ← Section header
│ ┌─────────────────────────────────────┐ │
│ │ SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3P │ │  ← Click to fill
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJS │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ other principals                        │  ← Type-global section
│ ┌─────────────────────────────────────┐ │
│ │ SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PQ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Value button styling:**

```tsx
<button
  onClick={() => field.setValue?.(value)}
  className="w-full text-left px-2 py-1.5 font-mono text-xs bg-muted/30 hover:bg-muted/50 border border-border truncate transition-colors"
>
  {value}
</button>
```

**Empty state:**

```tsx
<p className="text-xs text-muted-foreground italic">
  No recent values. Values are saved when you submit the form.
</p>
```

## Context Requirements

For the history UI to work, it needs:

- `contractId` - from route params
- `functionName` - from route params
- `field.name` - from focused field context
- `field.type` - from focused field context (to get type string)
- `field.setValue` - from focused field context (to apply value)

The `FieldHelper` component already receives `contractId` and has access to `focusedField`. It needs `functionName` added as a prop.

**Changes to context-panel.tsx:**

```tsx
// Add functionName prop
interface ContextPanelProps {
  // ... existing props
  functionName: string;
}

// Pass to FieldHelper
<FieldHelper network={network} contractId={contractId} functionName={functionName} />;
```

**Changes to field-helper.tsx:**

```tsx
interface FieldHelperProps {
  network: NETWORK;
  contractId: string;
  functionName: string; // NEW
}
```

## Implementation Order

1. **Storage layer** (`src/lib/value-history.ts`)

   - Implement all storage functions
   - Add simple unit tests

2. **React hook** (`src/hooks/use-value-history.ts`)

   - Wrap storage layer
   - Handle SSR (guard `localStorage` access)

3. **History helper component** (`src/components/tx-builder/helpers/history-helper.tsx`)

   - Display recent values
   - Click-to-fill functionality

4. **Tabbed field helper** (`src/components/tx-builder/field-helper.tsx`)

   - Add tab state and UI
   - Integrate history helper
   - Update props to include functionName

5. **Form submission integration** (`src/routes/tx.$...tsx`)

   - Save values on successful submission
   - Pass functionName to ContextPanel

6. **Testing**
   - Manual testing with dev server
   - Verify localStorage persistence

## Edge Cases

- **Nested fields**: For tuple members like `data.recipient`, the argName stored is the full path. This naturally scopes history to the exact nested position.

- **List items**: Items in a list (`items.0`, `items.1`) share type-global history but have separate context history. Consider whether to normalize list indices in context keys.

- **Optional fields**: When optional has a value, store the inner value. When `isNone`, don't store anything.

- **SSR/localStorage**: Guard all localStorage access with `typeof window !== 'undefined'`.

- **Large values**: Truncate display in UI, but store full value. Consider max value length (e.g., 1000 chars).

## Future Enhancements

- **Clear history**: Button to clear all history or specific entries
- **Pin values**: Mark frequently used values to always appear first
- **Import/export**: Backup and restore history
- **Sync**: Cloud sync via user account (far future)
