# Visited Contracts and Functions History

Implementation plan for tracking and displaying recently visited contracts and functions.

## Overview

Add a history system that:

1. Tracks every time a user visits a contract function page.
2. Stores a list of recently visited functions (contract ID, function name, network) in `localStorage`.
3. Displays a "Recently Viewed" section on the homepage for quick navigation.

## Architecture

### Storage Layer (`src/lib/visited-history.ts`)

Stored in `localStorage` under a single key:

```ts
Key: clarigen:visited:functions
Value: VisitedFunction[]
```

**Data Model:**

```ts
interface VisitedFunction {
  contractId: string;
  functionName: string;
  network: string;
  lastVisited: number; // Timestamp
}
```

**Storage functions:**

```ts
function getVisitedFunctions(): VisitedFunction[];
function addVisitedFunction(contractId: string, functionName: string, network: string): void;
function clearVisitedHistory(): void;
function getVisitedContracts(): string[]; // Derived from functions, unique contract IDs
```

**Design decisions:**

- Max 20 items in history.
- Deduplicate on add: if (contract, function, network) already exists, update `lastVisited` and move to front.
- Guard `localStorage` for SSR.

### React Hook (`src/hooks/use-visited-history.ts`)

```ts
interface UseVisitedHistoryReturn {
  visitedFunctions: VisitedFunction[];
  visitedContracts: string[];
  refresh: () => void;
  clear: () => void;
}

function useVisitedHistory(): UseVisitedHistoryReturn;
```

### Integration

**Tracking Visits:**
We should track visits in two places:

1. **Contract Overview Page**: `src/routes/tx.$network.$contractAddress.index.tsx`
2. **Function Page**: `src/routes/tx.$network.$contractAddress.$functionName.tsx`

When a user visits a function page, it should record both the contract and the function. When they visit the contract overview, it records just the contract (possibly by adding a `null` function name or just using a different tracking call).

Actually, the `clarigen:visited:functions` store can handle both:

- If `functionName` is provided, it's a function visit.
- If `functionName` is omitted/null, it's a contract visit.

**Implementation in routes:**

```ts
// In contract index route
useEffect(() => {
  if (network && contractId) {
    addVisitedFunction(contractId, null, network);
  }
}, [network, contractId]);

// In function route
useEffect(() => {
  if (network && contractId && functionName) {
    addVisitedFunction(contractId, functionName, network);
  }
}, [network, contractId, functionName]);
```

### UI Implementation

#### Homepage (`src/routes/index.tsx`)

Replace the existing `ComponentExample` or add a new section for "Recently Viewed".

**UI Structure:**

- Header: "Recently Viewed"
- List of items, each showing:
  - Contract ID (e.g. `SP123...token`)
  - Function name (e.g. `transfer`)
  - Network badge (mainnet/testnet/devnet)
  - Time since visit (optional)
- Clickable items that navigate to the tx-builder route.
- "Clear History" button.

**Styling:**

- Consistent with `UI-DESIGN.md` (TUI-inspired).
- Monospace font for contract IDs and functions.
- Bordered cards or list items.

## Implementation Order

1. **Storage layer** (`src/lib/visited-history.ts`)
2. **React hook** (`src/hooks/use-visited-history.ts`)
3. **Track visits** in the tx-builder route
4. **Homepage UI** implementation
5. **Testing** and polish
