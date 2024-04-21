---
sidebar_label: Post Conditions
---

# Post Conditions

Clarigen can make it easier for you to write post conditions in your app.

## NFT Post Conditions

To create a NFT post condition, use `makeNonFungiblePostCondition`.

The arguments are:

- `contract`: a Clarigen-created contract (see [factories](./factory))
- `address`: The address that this post condition is for
- `condition`: An `NFTConditionCode`
- `value`: the asset ID for this post condition.

For this example, assume there is an NFT contract defined like this:

```clarity
(define-non-fungible-token punks uint)
```

To create a post condition:

```ts
import { makeNonFungiblePostCondition } from '@clarigen/core';
import { NonFungibleConditionCode } from 'micro-stacks/transactions';
import { nftContract } from './contracts';

const sender = 'SP12...';

const postCondition = makeNonFungiblePostCondition(
  nftContract,
  sender,
  NonFungibleConditionCode.DoesNotOwn,
  1n // the ID of the NFT
);
```

Note that this is strongly typed, so using a value other than a `bigint` as an ID would show a type error.

If the NFT has a different type of key, like for BNS:

```clarity
(define-non-fungible-token names { name: (buff 48), namespace: (buff 20) })
```

Then you'd need to use an appropriate tuple type:

```ts
const postCondition = makeNonFungiblePostCondition(
  nftContract,
  sender,
  NonFungibleConditionCode.DoesNotOwn,
  {
    name: asciiToBytes('example'),
    namespace: asciiToBytes('btc'),
  }
);
```

## Fungible token post conditions

Creating post conditions for a fungible token follows a similar process, except that you use an `amount` instead of a specific NFT.

When calling `makeFungiblePostCondition`, the `amount` argument can be:

- A bigint (`123n`)
- A string-encoded integer (`"123"`)
- A number type integer (`123`)

```ts
import { makeFungiblePostCondition } from '@clarigen/core';
import { FungibleConditionCode } from 'micro-stacks/transactions';
import { ftContract } from './contracts';

const sender = 'SP12...';

const postCondition = makeFungiblePostCondition(
  ftContract,
  sender,
  FungibleConditionCode.Equals,
  1000n // the amount being sent
);
```
