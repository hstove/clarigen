# Using Clarigen

# Use Clarigen with Clarinet-SDK

Clarigen provides the `@clarigen/test` library to help make it easier to write unit tests for your Clarity contracts. You'll still use `Clarinet SDK` to execute and interact with your contracts. Clarigen will just provide a more ergonomic way to write your tests.

## Getting started

Once you have a Clarinet project setup, you'll want to install a few Clarigen libraries:

```bash
npm install @clarigen/cli @clarigen/test @clarigen/core
```

Next, generate a Clarigen configuration file:

```bash
npx clarigen init
```

In your `Clarigen.toml` file, you can update the `output` field to specify where you want the auto-generated Clarigen code to be saved. For example:

```toml title="Clarigen.toml"
[types]
output = "tests/clarigen-types.ts"
```

Finally, run the Clarigen CLI to generate types for your contracts:

```bash
npx clarigen
# or in watch mode:
npx clarigen --watch
```

## Writing tests

Now that you have Clarigen types, you can write unit tests that utilize them. Here's an example of a basic test that uses `@clarigen/test`.

```ts
import { project, accounts } from './clarigen-types'; // where your [types.output] was specified
import { projectFactory } from '@clarigen/core';
import { rov, txOk } from '@clarigen/test';
import { test, expect } from 'vitest';

const alice = accounts.wallet_1.address;

const { counter } = projectFactory(project, 'simnet');

test('Counter contract test', async () => {
  const value = rov(contracts.getCounter());
  expect(value).toEqual(1n); // initial value

  const receipt = txOk(counter.increment(2), alice);
  expect(receipt.value).toEqual(3n);

  expect(rov(counter.getCounter())).toEqual(3n); // new value
});
```

    ,# Examples of unit tests

If you want to follow along, make sure you&apos;ve followed the [instructions for getting setup](./quick-start.mdx).

## The Counter contract

This example uses a simple counter contract. Here's the Clarity code:

```clarity
;; The counter contract maintains a single global counter
;; variable. Users can change the counter by calling
;; `increment`.

;; The variable used to hold the global counter.
(define-data-var counter uint u1)

;; Map to track each sender's last increment
(define-map last-increment principal uint)

;; Get the current counter
(define-read-only (get-counter)
  (var-get counter)
)

;; Increment the counter. You cannot increment by more than 5.
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
  (asserts! (<= step u5) (err u100))
  (map-set last-increment tx-sender step)
  (ok new-val))
)
```

## Unit test setup

At the top of your unit testing file, you&apos;ll need to import a few things to get started:

```ts
import { projectFactory } from '@clarigen/core';
import { project, accounts } from './clarigen-types';
import { rov, rovOk, txOk, txErr, ro, varGet, mapGet, filterEvents } from '@clarigen/test';
import { test, expect } from 'vitest';

const { counter } = projectFactory(project, 'simnet');
const alice = accounts.wallet_1.address;

test('Counter contract tests with Clarigen', () => {
  // Your tests will go here
});
```

### Calling read-only functions

Use the `rov` function, which stands for "read-only-value", to call a read-only function and only get the value returned. For example:

```ts
const initialValue = rov(counter.getCounter());
expect(initialValue).toEqual(1n);
```

If your read-only function returns a `response` type, use `rovOk` and `rovErr` to automatically check the response and return either the `ok` or `err` value.

### Calling public functions

Use the `txOk` function to call a public function and check that it returns an `ok`. For example:

```ts
const incrementReceipt = txOk(counter.increment(1n), alice);
expect(incrementReceipt.value).toEqual(2n);
```

You can also use `tx` to get the full response value, whether the function is `ok` or `err`.

```ts
const incrementReceipt = tx(counter.increment(1n), alice);
if (incrementReceipt.value.isOk) {
  console.log('Incremented successfully');
  console.log(incrementReceipt.value.value); // inner value of the `ok`
}
```

Or, you can use `txErr` to expect an `err` type. This is helpful for testing your function's validation logic.

In the `increment` function, an error is returned if the `step` is greater than 5. You can test this like so:

```ts
const incrementReceipt = txErr(counter.increment(6n), alice);
expect(incrementReceipt.value).toEqual(100n); // the "inner" value of the `(err)`
```

### Getting variables and map entries

Use `varGet` and `mapGet` to get the value of a variable or map entry.

```ts
const contractId = counter.identifier;
const currentValue = varGet(contractId, counter.variables.counter);
expect(currentValue).toEqual(2n);

const lastIncrement = mapGet(contractId, counter.maps.lastIncrement, alice); // the type is `bigint | null`
expect(lastIncrement).toEqual(1n);

const bobIncrement = mapGet(contractId, counter.maps.lastIncrement, accounts.wallet_2.address);
expect(bobIncrement).toBeNull();
```

### Handling transaction events

Use `filterEvents` to get the events emitted by a transaction. This is useful for testing that your contract emits the correct events.

```ts
import { CoreNodeEventType, cvToValue } from '@clarigen/core';

const incrementReceipt = txOk(counter.increment(3n), alice);
const printEvents = filterEvents(incrementReceipt.events, CoreNodeEventType.ContractEvent);
expect(printEvents.length).toEqual(1);
const [print] = printEvents;

// next, use `cvToValue` to easily convert from a ClarityValue
// to a "JS Native" value
const printData = cvToValue<{
  action: string;
  object: string;
  value: bigint;
}>(print.data.value);

expect(printData).toEqual({
  object: 'counter',
  action: 'incremented',
  value: 5n,
});
```

    ,# Unit Testing API Reference

To learn more about writing unit tests using Clarigen, check out the [quick start guide](/docs/unit-tests/quick-start).

Jump to a section:

- [Read-only functions](#calling-read-only-functions)
- [Public functions](#calling-public-functions)
- [Filtering events](#filtering-events)

## Importing Simnet Contracts and Accounts

A "simnet" is an environment where you can interact with your contracts without running a full Stacks chain. When using Clarinet and Clarinet SDK to write tests, you're using a simnet.

Clarigen automatically includes your simnet contracts and accounts.

To get your simnet contracts and accounts, you can import them and use `projectFactory` to configure your contracts for simnet:

```ts
import { project, accounts } from './clarigen-types';
import { projectFactory } from '@clarigen/core';

const contracts = projectFactory(project, 'simnet');
```

## Calling read-only functions

Clarigen provides helper functions to make strongly typed read-only function calls.

In these examples, assume a contract with a `validate-number` and `get-rate` function like so:

```clarity
;; Return ok if `num` greater than or equal to 100
(define-read-only (validate-number (num uint))
  (if (>= num u100) (ok num) (err "Number must be greater than 100"))
)

(define-read-only (get-rate)
  (begin
    (print { "rate": u555 })
    (ok u555)
  )
)
```

### `ro` ("read-only")

If you want to receive the full response, including events, you can use `ro`:

```ts
const rateReceipt = ro(contract.getRate());
expect(rateReceipt.value).toEqual(555n);
// rateReceipt.events is the list of events emitted by the contract call
expect(rateReceipt.events.length).toEqual(1n);

const validation = ro(contract.getRate(100));
//validation.value.value has the type `bigint | string`
expect(validation.value.value).toEqual(100n);
expect(validation.value.isOk).toBe(true);
```

The return type of `ro` is:

```ts
{
  value: T;
  result: ClarityValue;
  events: CoreNodeEvent[];
}
```

### `rov` ("read-only value")

If you only care about the return value of the contract call, you can use `rov`:

```ts
const rate = rov(contract.getRate());
expect(rate).toEqual(555n);

const validationResponse = rov(contract.validateNumber(100));
// `validationResponse.value` has the type `bigint | string`
expect(validationResponse.value).toEqual(100n);
```

### `rovOk` and `rovErr`

For functions that return a `response`, you can use `rovOk` and `rovErr` to assert that the response is either `ok` or `err` and return the inner value:

<Collapsible className="mt-3">
  <CollapsibleTrigger>
    <Text variant="small">
      Show example Clarity function:<CaretSortIcon className="w-6 h-6 inline" style={{ display: 'inline-block', height: '18px', width: '18px' }}/>
    </Text>
  </CollapsibleTrigger>

  <CollapsibleContent>

```clarity
(define-read-only (validate-number (num uint))
  (if (>= num u100) (ok num) (err "Number must be greater than 100"))
)
```

  </CollapsibleContent>
</Collapsible>

```ts
const okResult = rovOk(contract.validateNumber(101));
// okResult is 101n

const errResult = rovErr(contract.validateNumber(99));
// errResult is "Number must be greater than 100"

rovOk(contract.validateNumber(99)); // throws an error
rovErr(contract.validateNumber(101)); // throws an error
```

## Calling public functions

When making transactions, you provide two arguments:

1. The function call payload
2. The sender (`string`) address

For these examples, assume an `increment` function that looks like this:

```clarity
(define-data-var counter uint u0)

(define-public (increment (amount uint))
  (if (< 5 amount)
    (begin
      (var-set counter (+ (var-get counter) amount))
      (ok amount)
    )
    (err false)
  )
)
```

### Transaction receipt type

When calling public functions, the return type is:

```ts
{
  value: T;
  events: CoreNodeEvent[];
  result: ClarityValue;
}
```

### `tx`

```ts
const receipt = tx(contract.increment(1), alice);
// result.events is a list of events emitted
if (receipt.value.isOk) {
  // receipt.value.value is the `ok` type
} else {
  // receipt.value.value is the `err` type
}
```

### `txOk` and `txErr`

If you want to automatically throw an error and get the inner value of the `ok` or `err` type, you can use `txOk` and `txErr`:

```ts
const okResult = txOk(contract.increment(3), alice);
expect(okResult).toEqual(3n);

const errResult = txErr(contract.increment(10), alice);
expect(errResult).toEqual(false);

txOk(contract.increment(10), alice); // throws an error
txErr(contract.increment(3), alice); // throws an error
```

## Filtering events

If you want to get specific events from a receipt, you can use `filterEvents` from `@clarigen/test`.

```ts
import { CoreNodeEventType } from '@clarigen/core';
import { filterEvents } from '@clarigen/test';

const printEvents = filterEvents(receipt.events, CoreNodeEventType.ContractEvent);
// `printEvents` has the type `SmartContractEvent[]`

const tokenTransfers = filterEvents(receipt.events, CoreNodeEventType.FtTransferEvent);
// `tokenTransfers` has the type `FtTransferEvent[]`
```

You can combine this with `cvToValue` from `@clarigen/core` to easily verify `print` events:

```ts
import { CoreNodeEventType, cvToValue } from '@clarigen/core';
import { filterEvents } from '@clarigen/test';

const print = printEvents[0];
const printData = cvToValue(print.data.value);
expect(printData).toEqual({
  topic: 'mint',
  amount: 100n,
});
```

    ,# Maps and Values

Clarigen makes it easy to get values from your contract's maps and variables.

Assume a contract with the following data:

```clarity
(define-data-var counter uint u0)

(define-map balances principal uint)

(define-map allowed-callers
  {
    account: principal,
    contract: principal
  }
  bool
)
```

## Getting variables

`varGet` is used to get the value of a variable.

```ts
import { varGet } from '@clarigen/test';

const counter = await varGet(contract.identifier, counter.variables.counter);

expect(counter).toEqual(0n);
```

## Getting map entries

`mapGet` is used to get the value of a map entry.

When getting a map entry, the type of the result is always `T | null`.

```ts
import { mapGet } from '@clarigen/test';

const balance = mapGet(contract.identifier, contract.maps.balances, alice);

expect(balance).toEqual(0n);

const allowed = mapGet(contract.identifier, contract.maps.allowedCallers, {
  account: alice,
  contract: contract.identifier,
});

expect(allowed).toEqual(null);
```
