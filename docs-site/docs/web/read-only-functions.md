---
sidebar_label: Read-only functions
---

# Calling Read-Only Functions

When building a Stacks app, you can query on-chain state from a Stacks contract by calling "read-only functions". These are functions exposed by the contract to help apps and other contracts integrate with the contract.

## Setting up the `ClarigenClient`

The `@clarigen/core` package exposes a `ClarigenClient` instance, which provides an easy way to call read-only functions in your app.

To construct the `ClarigenClient`, you need to include either:

- A `string` pointing to a Stacks API endpoint
- A `StacksNetwork` instance (from either `micro-stacks` or Stacks.js)

To use an API endpoint:

```ts
import { ClarigenClient } from '@clarigen/core';

const stacksApi = 'https://stacks-node-api.mainnet.stacks.co';

const client = new ClarigenClient(stacksApi);
```

Or, using a `StacksNetwork` instance:

```ts
import { ClarigenClient } from '@clarigen/core';
import { StacksMainnet } from 'micro-stacks/network';

const network = new StacksMainnet();

const client = new ClarigenClient(network);
```

## Using `ClarigenClient`

To call individual contract functions, you'll need to have a [contract factory](./factory) setup. In these examples, we'll use a hypothetical NFT contract, `nftContract` to call functions.

### `ro`

In Clarigen, "ro" stands for "read-only". It's a shorthand for calling read-only methods.

Using `ro` returns the exact value returns from the contract function, but typed and converted to JS-native values.

```ts
import { clarigen } from './clarigen-client';
// import your contract
import { nftContract } from './clarigen-contracts';

export async function getOwner(id: number | bigint) {
  const response = await clarigen.ro(nftContract.getOwner(id));
  if (response.isOk) {
    return response.value;
  }
  throw new Error(`Unexpected error: ${response.value}`);
}
```

### `roOk`

`roOk` is a shorthand to call a read-only function and automatically scope to the `ok` type of the contract's response. It is only suitable for contract functions that return the `(response)` Clarity type.

In the above example, we were manually checking to see that the contract returned an `ok` response. We can shorten that to be:

```ts
import { clarigen } from './clarigen-client';
import { nftContract } from './clarigen-contracts';

export async function getOwner(id: number | bigint) {
  const owner = await clarigen.roOk(nftContract.getOwner(id));
  return owner;
}
```

### `roErr`

Sometimes, the assumption is that an `err` is returned from a function, otherwise you want to throw an error. `roErr` is a shorthand for that.

```ts
import { clarigen } from './clarigen-client';
import { nftContract } from './clarigen-contracts';

// A function that throws if an NFT has an owner:
export async function expectUnowned(id: number | bigint) {
  // throws an error unless the response is `err`:
  await clarigen.roErr(nftContract.getOwner(id));
  return true;
}
```

## Fetching microblock-based state

If you want to query the state of a contract based on the most recent microblock, you can include the `latest` option:

```ts
import { clarigen } from './clarigen-client';
import { nftContract } from './clarigen-contracts';

export async function getOwner(id: number | bigint) {
  const owner = await clarigen.roOk(nftContract.getOwner(id), { latest: true });
  return owner;
}
```

## Returning JSON-valid types

By default, Clarigen returns `bigint` for integers and `UInt8Array` values for buffers. If you only want to receive valid JSON, you can use the `json` option.

When `json: true` is specified, integers are returned as `string` (to prevent overflows), and buffers are returned as hex-encoded `string`.

For example, a `u1000` integer would be `"1000"`, and `0xdeadbeef` would be `"deadbeef"`.

```ts
// Return a `string`
export async function getBalanceOf(owner: string): string {
  return client.roOk(tokenContract.getBalanceOf(owner), { json: true });
}
```

## Calling read-only functions without a `ClarigenClient` instance

If you want to call read-only functions without having to instantiate a `ClarigenClient` instance, the `@clarigen/core` package exposes pure functions for you. These are available as `ro`, `roOk`, and `roErr`.

When using these functions, you must specify a `url` or `network` option.

Using `url`:

```ts
import { ro } from '@clarigen/core';
import { nftContract } from './clarigen-contracts';

const stacksApiUrl = 'https://stacks-node-api.mainnet.stacks.co';

export function getOwner(id: bigint) {
  return ro(nftContract.getOwner(id), {
    url: stacksApiUrl,
  });
}
```

Or using `network`:

```ts
import { ro } from '@clarigen/core';
import { nftContract } from './clarigen-contracts';
import { StacksMainnet } from 'micro-stacks/network';

const network = new StacksMainnet();

export function getOwner(id: bigint) {
  return ro(nftContract.getOwner(id), {
    network,
  });
}
```
