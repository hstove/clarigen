---
sidebar_label: Using Node.js
---

# Clarigen with Node.js

When using Clarigen in a Node.js (i.e. server-side) environment, many of the same patterns can be used as with the [web client](./quick-start).

The main difference is that you'll sometimes want to sign and broadcast transactions using a private key.

## Signing contract call transactions

To sign and broadcast a contract call transaction, utilize the `micro-stacks/transactions` package. Similar to making transactions on the web, use the "spread" syntax to pass options to the `micro-stacks` function.

```ts
// import your conttract factory
import { nftContract } from './clarigen-contract';
import { makeContractCall } from 'micro-stacks/transactions';

export async function transferNft(id, sender, recipient) {
  return makeContractCall({
    // You can use the 'object params' syntax:
    ...nftContract.transfer({
      id,
      sender,
      recipient,
    })
    // or the vanilla 'arguments' syntax:
    // ...nftContract.transfer(1, sender, recipient),

    // other options:
    senderKey: process.env.MY_PRIVATE_KEY,
    fee: '1000',
  })
}
```
