# Transaction Builder with Contract Documentation

This document provides context and pointers for incorporating contract documentation (parsed from Clarity source comments) into the Transaction Builder UI.

## Overview

The goal is to parse `@param` and general function comments from the Clarity source code and display them in the Transaction Builder.

### Core Parsing Logic

The existing logic for parsing Clarity comments into structured JSON exists in:
`packages/cli/src/docs/index.ts` -> `createContractDocInfo`

This function takes `contractSrc` and `abi` and returns a `ClaridocContract` object. The `tools` package can import this directly from `@clarigen/cli`.

This function contains:

- Top-level contract comments
- Function-level comments
- Parameter-level comments (parsed from `@param`)

### Usage in Docs Site

The `docs-site` project uses this logic to generate its documentation:
`docs-site/src/lib/code-gen.ts` -> `generateContractMarkdown`

### Transaction Builder Integration Points

1.  **Fetching Source Code**: The `tools` project already uses `getContractInfo` in `tools/src/lib/stacks-api.ts` which returns the contract metadata. The `source_code` field is available in this response.
2.  **Field Helper UI**: `tools/src/components/tx-builder/field-helper.tsx` is the primary place to show parameter-level documentation.
3.  **Contract Overview**: `tools/src/routes/tx.$network.$contractAddress.index.tsx` can show function-level documentation in the function list.

## Implementation Plan

1.  **Data Hook**: Create a hook (e.g., `useContractDocs`) in `tools` that fetches the contract source and parses it using `createContractDocInfo` from `@clarigen/cli`.
2.  **UI Updates**:
    - Update `FieldHelper` to display parameter comments.
    - Update `ContractOverviewContent` to display function descriptions.
