---
sidebar_label: "Tutorial: Write tests with Clarigen"
---

# Tutorial: Write tests with Clarigen

import { Terminal } from "../../src/components/Terminal";

In this tutorial, you will setup a project and write tests using Clarigen-generated types. You will use Clarinet for running your tests.

## Setup your environment {#setup-your-environment}

First, you'll need a few things installed. You will use your CLI to install each dependency, if they're not installed already.

### Deno {#deno}

Clarigen is a [Deno](https://deno.land/) project, so you'll need that installed in order to use it.

To install Deno, follow the instructions on [Deno's installation documentation page](https://deno.land/manual@v1.28.2/getting_started/installation).

To ensure Deno is installed, run:

<Terminal>
deno -V
</Terminal>

This tutorial was tested with Deno version 1.27. It's recommended you use the latest version of Deno with Clarigen.

### Clarinet {#clarinet}

Clarigen uses Clarinet, a powerful Clarity development tool, under the hood. You'll need it installed. Visit the [installation docs for Clarinet](https://github.com/hirosystems/clarinet#installation) for environment-specific instructions.

To ensure Clarinet is installed, run:

<Terminal>
clarinet -V
</Terminal>

This tutorial was tested with Clarinet 1.0.5. It's recommended to use the latest version of Clarinet.

### Clarigen {#clarigen}

Finally, it's time to install Clarigen. To do so, run:

<Terminal>
deno install -qAfn clarigen https://deno.land/x/clarigen/cli.ts
</Terminal>

Make sure it's installed by running:

<Terminal>
clarigen -V
</Terminal>

## Create a new project {#create-a-new-project}

In this tutorial, we're making a new project from scratch. To generate the project, use the `clarinet new` command. In your CLI, run:

<Terminal>
clarinet new clarigen-tutorial && cd clarigen-tutorial
</Terminal>

This command will generate a new folder called `clarigen-tutorial`. For more information, refer to the [Clarinet documentation around generating new projects](https://github.com/hirosystems/clarinet#create-a-new-project).

At this point, you should open up this folder in your favorite code editor.

## Generate a Clarigen configuration file {#generate-a-clarigen-configuration-file}

You now have a functional Clarinet project, but we need to create a Clarigen-specific configuration file. To do so, run:

<Terminal>
clarigen init
</Terminal>

This will create a configuration file at `Clarigen.toml`. For this tutorial, we won't need to update the default config file. To learn more, check out the [configuration docs](../configuration).

## Create our first Clarity contract {#create-our-first-clarity-contract}

Now our project is setup, and we are ready to start writing Clarity contracts! In this tutorial, we'll be using a basic "counter" contract, and this tutorial won't go into details about writing Clarity contracts. To learn more, visit the [Stacks documentation](https://docs.stacks.co/docs/write-smart-contracts/).

First, generate the contract by running:

<Terminal>
clarinet contracts new counter
</Terminal>

This generates a `contracts/counter.clar` file, and a basic `test/counter_test.ts` test file.

Open up the `contracts/counter.clar` file and remove all the existing code. Paste in this Clarity code:

```clarity title="contracts/counter.clar"
(define-data-var counter uint u1)

;; Get the current counter
(define-read-only (get-counter)
  (var-get counter)
)

;; Increment the counter.
;;
;; @returns the new value of the counter
;;
;; @param step; The interval to increase the counter by
(define-public (increment (step uint))
  (let (
    (new-val (+ step (var-get counter)))
  )
  ;; #[allow(unchecked_data)]
  (var-set counter new-val)
  (print { object: "counter", action: "incremented", value: new-val })
  (ok new-val))
)

;; Decrement the counter
;;
;; @param step; The interval to increase the counter by
(define-public (decrement (step uint))
  (let (
    (new-val (- (var-get counter) step))
  )
  ;; #[allow(unchecked_data)]
  (var-set counter new-val)
  (print { object: "counter", action: "decremented", value: new-val })
  (ok new-val))
)
```

## Generate Clarigen types {#generate-clarigen-types}

Now that we have a full Clarity contract, we can use Clarigen to generate the code that makes testing our contract easy. To do so, run:

<Terminal>
clarigen --verbose
</Terminal>

This will generate two files. The important file is `artifacts/clarigen.ts`, which is what we'll be importing to write our tests. This file includes all of the type information from our counter contract.

## Write tests {#write-tests}

At this point, we're all setup to start writing unit tests for our counter contract.

### Setup imports {#setup-imports}

Open up `tests/counter_test.ts` and delete the existing contents of the file.

At the top of the file, add the following code:

```ts title="tests/counter_test.ts"
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { simnet } from "../artifacts/clarigen.ts";
import { factory, txOk } from "https://deno.land/x/clarigen/mod.ts";
```

:::note What am I importing?

- `simnet` from our auto-generated code. This includes info from our "counter" contract
- `assertEquals` from Deno's standard library
- A few helper methods from Clarigen's Deno library, which we'll use to write tests

:::

### Setup our test definition {#setup-our-test-definition}

We'll now write our test definition.

Below our imports, add the following code:

```ts title="tests/counter_test.ts"
const {
  test,
  contracts: { counter },
} = factory(simnet);

test({
  name: "Counter contract works",
  fn(chain, accounts) {
    // TODO: our tests go here
  },
});
```

You can now run `clarinet test`, and you'll see that our one test ("Counter contract works") passes. That's because we haven't written any assertions yet!

### Testing a read-only function {#testing-a-read-only-function}

We'll start by writing a test that checks the initial value of our counter. It should equal one.

Inside our test function (`fn()`), remove the `// TODO` line and add:

```ts title="tests/counter_test.ts"
const initial = chain.rov(counter.getCounter());
assertEquals(initial, 1n);
```

The full test function should look like this:

```ts title="tests/counter_test.ts"
test({
  name: "Counter contract works",
  fn(chain, accounts) {
    const initial = chain.rov(counter.getCounter());
    assertEquals(initial, 1n);
  },
});
```

Our code is calling the `get-counter` function on our contract to get the current value. Then, it asserts that the result of `get-counter` is equal to 1. With Clarity, all "numbers" are integers, so Clarigen converts them to `BigInt`.

Once again, you can call `clarinet test`, and your test should pass. You can also run `clarinet test --watch` to automatically run the test whenever the file is saved.

### Calling public functions {#calling-public-functions}

Next, we'll call the `increment` function to change the counter value. To do so, we'll use Clarigen's `txOk` helper method. This generates a transaction payload for a given account.

Below the code you just added (at the bottom of the test function), add the following code:

```ts title="tests/counter_test.ts"
const sender = accounts.addr("wallet_1");
const incrementResult = chain.mineOne(txOk(counter.increment(2n), sender));
assertEquals(incrementResult.value, 3n);
```

This code is:

- Getting the Stacks address from one of the accounts in our `settings/Devnet.toml` file
- Mining a block with one transaction calling `increment` with `2` as the argument
- Asserting the result of that contract call is equal to 3

Once again, run `clarinet test` to make sure the test passes.

### Testing that state is updated {#testing-that-state-is-updated}

To wrap things up, we'll once again call `get-counter` to make sure the contract has been updated.

At the bottom of your test, add:

```ts title="tests/counter_test.ts"
const newCounter = chain.rov(counter.getCounter());
assertEquals(newCounter, 3n);
```

Run the test again to make sure everything passes.

## Wrapping up {#wrapping-up}

Your test function should now look like this:

```ts title="tests/counter_test.ts"
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { simnet } from "../artifacts/clarigen.ts";
import { factory, txOk } from "https://deno.land/x/clarigen/mod.ts";

const {
  test,
  contracts: { counter },
} = factory(simnet);

test({
  name: "Counter contract works",
  fn(chain, accounts) {
    const initial = chain.rov(counter.getCounter());
    assertEquals(initial, 1n);

    const sender = accounts.addr("wallet_1");
    const incrementResult = chain.mineOne(txOk(counter.increment(2n), sender));
    assertEquals(incrementResult.value, 3n);

    const newCounter = chain.rov(counter.getCounter());
    assertEquals(newCounter, 3n);
  },
});
```

Now that you've got this test in place, try adding your own code that calls the `decrement` function and asserts that the counter value was decreased.

To learn more about writing unit tests with Clarigen, visit the [Clarigen testing](../deno) docs.
