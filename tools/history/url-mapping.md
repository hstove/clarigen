# Mapping URL State to Clarity Values

This document describes how Clarity values are represented in URL query parameters for the Transaction Builder and Read-only API.

## Core Principles

- **Nuqs Integration**: On the front-end, the `nuqs` library is used to manage URL state.
- **JSON for Complex Types**: Lists, Tuples, and Optionals are serialized as JSON strings in the URL.
- **Consistency**: The same mapping is used for both the front-end Transaction Builder and the back-end Read-only API.

## Type Mappings

| Clarity Type      | URL Representation                | Example                                          |
| ----------------- | --------------------------------- | ------------------------------------------------ |
| `uint128`         | String                            | `?myUint=12345`                                  |
| `int128`          | String                            | `?myInt=-100`                                    |
| `bool`            | `"true"` or `"false"`             | `?myBool=true`                                   |
| `principal`       | String                            | `?address=SP3K8BC...`                            |
| `trait_reference` | String                            | `?trait=SP3K8BC...contract-name`                 |
| `buffer`          | Hex string (optional `0x` prefix) | `?data=0xabcdef` or `?data=abcdef`               |
| `string-ascii`    | String                            | `?text=hello`                                    |
| `string-utf8`     | String                            | `?text=hello`                                    |
| `optional`        | JSON or empty string              | `?opt={"isNone":false,"value":"val"}` or `?opt=` |
| `list`            | JSON array                        | `?list=[1,2,3]`                                  |
| `tuple`           | JSON object                       | `?tuple={"a":1,"b":"two"}`                       |
| `response`        | JSON                              | `?res={"isOk":true,"value":123}`                 |

## Intermediate "Form Value" Representation

Before being converted to actual `ClarityValue` objects (via `parseToCV`), values are parsed into an intermediate "Form Value" structure:

- **Primitives**: `string`, `number`, or `boolean`.
- **Buffers**: Hex `string`.
- **Optionals**: `{ isNone: boolean; value: unknown }`.
- **Lists**: `unknown[]`.
- **Tuples**: `Record<string, unknown>`.
- **Responses**: `{ isOk: boolean; value: unknown }`.

## Implementation Details

- **Front-end**: `web/src/hooks/use-tx-url-state.ts` defines the `nuqs` parsers.
- **Back-end**: `packages/core/src/api/url-parsing.ts` provides `parseQueryValue` and `queryToFunctionArgs` for server-side parsing.
- **Shared Logic**: `formValueToCV` in `@clarigen/core` handles the final conversion from Form Values to Stacks `ClarityValue` objects.
