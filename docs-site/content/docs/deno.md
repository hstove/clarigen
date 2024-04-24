---
sidebar_label: Quick Start
toc_max_heading_level: 4
---

# Clarinet Unit Tests

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

If you're using [Clarinet](https://github.com/hirosystems/clarinet) during contract development, you're probably using `clarinet test` to write unit tests for your contracts. Clarigen is designed to work alongside Clarinet; in fact, Clarigen is built on top of Clarinet!

## Getting started {#getting-started}

To use Clarigen in Deno, make sure you've followed the [getting started](./getting-started) guide. Additionally, you'll need to specify [`deno.output` configuration](./configuration#deno). In these examples, it's assumed that the Clarigen auto-generated code is at `./tests/clarigen.ts`.

```toml title="Clarigen.toml"
[deno]
output = "tests/clarigen.ts"
```

## Importing Clarigen in Deno {#importing-clarigen-in-deno}

Clarigen's Deno package is published to [deno.land](https://deno.land), so you can import Clarigen from there:

```ts
import * as Clarigen from "https://deno.land/x/clarigen/src/index.ts";
```

In the above example, a version of the package isn't specified, so the latest version will be used. As a best practice, you should specify the version of the package you're using. When getting setup, visit the [Clarigen package page](https://deno.land/x/clarigen) to see the latest version. You can learn more in the [Deno docs for managing dependencies](https://deno.land/manual/examples/manage_dependencies).

## Example {#example}

Here's an example of a basic (but complete) contract test using Clarigen and Clarinet:

```ts title="tests/contract_test.ts"
// import from the Clarigen package:
import { factory, txOk } from "https://deno.land/x/clarigen/src/index.ts";
// import from your auto-generated code:
import { simnet } from "./clarigen.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

// helper function to "setup" the test environment
const { contracts, test } = factory(simnet);

// "counter" is the name of our contract
const { counter } = contracts;

test({
  name: "Counter test",
  fn(chain, accounts) {
    // similar to `accounts.get('wallet_1').address`;
    const alice = accounts.addr("wallet_1");

    // mine a block with a single transaction
    // similar to `const [receipt] = chain.mineBlock(...).receipts;`
    const receipt = chain.mineOne(txOk(counter.increment(2), alice));
    assertEquals(receipt.value, 3n);

    // mine a block with multiple transactions
    const receipts = chain.mine(
      txOk(counter.increment(2), alice),
      txOk(counter.decrement(1), alice)
    );
    const [increment, decrement] = receipts;
    assertEquals(decrement.value, 4n);

    // Call a read-only function
    // similar to Clarinet's `chain.callReadOnlyFn(...).expectOk()`
    const currentCount = chain.rovOk(counter.readCounter());
    assertEquals(currentCount, 3n);
  },
});
```

## Differences between Clarigen and Clarinet {#differences-between-clarigen-and-clarinet}

In Clarinet, the result of a mined block isn't strongly typed. When using Clarigen, a transaction receipt's `value` is a native JavaScript type, which is strongly typed. Otherwise, the other properties of a transaction receipt (like `events`) are the same.

Additionally, to ensure strong typing, transactions are specified as 'spread arguments' instead of an array.

```ts
// in Clarinet:
const block = chain.mineBlock([
  Tx.contractCall(...)
]);
block.receipts[0].value; // string, like `(ok u4)`

// in Clarigen:
const block = chain.mineBlock(
  txOk(contract.fn(...), sender)
);
block.receipts[0].value; // native type, like `4n`, `true`, "string", etc.
```
