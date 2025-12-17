# Using Clarigen

# Getting Started

## Installation

Clarigen is a command-line tool that you can install globally.

To install Clarigen, run:

```bash
npm install -g @clarigen/cli
```

### Clarinet dependency

At the moment, using Clarigen requires that you have a basic Clarinet project setup. This allows Clarigen to re-use common configuration (like contracts, deployments, and requirements). If you don't have this yet, the easiest way to start is to [install Clarinet](https://github.com/hirosystems/clarinet#installation) and run:

```bash
# change "my-project" to your project's name
clarinet new my-project
# then install Clarigen:
# cd my-project
# npm install @clarigen/cli
```

### `Clarigen.toml`

Your Clarigen-specfic configuration goes in `Clarigen.toml` at the root of your project. To generate a basic configuration file, run:

```bash
clarigen init
```

In your newly-generated `Clarigen.toml` file, you can specify if (and where) to generate code.

For TypeScript types, use the `types.output` field:

```toml title="Clarigen.toml"
[types]
output = "src/clarigen-types.ts"
```

If you don't want to generate code for either environment, just comment out that section's `output` (or the section entirely).

Learn more about [configuration](./configuration.mdx)

## Generate some code!

Now you have everything you need for Clarigen to start generating type-safe boilerplate for you. In your terminal, simply run:

```bash
npx clarigen
```

    ,# Clarigen

Clarigen is a developer tool that automatically generates TypeScript code that makes it easy to interact with [Clarity](https://clarity-lang.org) smart contracts.

There are two huge benefits to using Clarigen:

- Less boilerplate
- Complete type safety

Clarigen is built to work alongside the libraries and tooling you already use. For unit tests, it works perfectly with [Clarinet](https://docs.hiro.so/clarinet) and [Clarinet SDK](https://docs.hiro.so/clarinet/guides/clarinet-js-sdk). When you're building Clarity apps, it works seamlessly with [Stacks.js](https://docs.hiro.so/stacks.js).

If you'd like to get started using Clarigen in your project, head over to the [getting started with Clarigen](./getting-started.mdx) page.

## See the difference

To see how Clarigen can make building Stacks apps easier, compare the typical code you'll write with and without Clarigen.

When writing contract tests with Clarinet:

<Tabs defaultValue="with" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="with">With Clarigen</TabsTrigger>
    <TabsTrigger value="without">Without Clarigen</TabsTrigger>
  </TabsList>
  <TabsContent value="with">

When using Clarigen, all of your function's arguments and results are strictly typed. In this example, passing a non-integer to `increment` will result in a TypeScript error.

```ts
const alice = accounts.wallet_1.address; // `wallet_1` is typed
const receipt = txOk(contracts.counter.increment(2n), alice);
console.log(receipt.value); // 2n
```

</TabsContent>
<TabsContent value="without">

When using Clarinet SDK without Clarigen, you have to manually handle the types of your contract's arguments and results. In this example, `call.result` is a ClarityValue of unknown type. Similarly, you need to manually specify the `ClarityValue` arguments of your functions, instead
of just using native JavaScript types.

```ts
const accounts = simnet.getAccounts();
const address1 = accounts.get('wallet_1'); // `wallet_1` is untyped
if (!address1) throw new Error('invalid wallet name.');

const call = simnet.callPublicFn('counter', 'add', [Cl.uint(2)], address1);
// `call.result` is a ClarityValue of unknown type
console.log(call.result); // Cl.ok(Cl.int(2n))
```

  </TabsContent>
</Tabs>

Or, when building web apps:

<Tabs defaultValue="with">
  <TabsList>
    <TabsTrigger value="with">With Clarigen</TabsTrigger>
    <TabsTrigger value="without">Without Clarigen</TabsTrigger>
  </TabsList>
  <TabsContent value="with">

```ts
const { openContractCall } = useOpenContractCall();

async function handleOpenContractCall() {
  await openContractCall({
    ...nftContract.transfer({
      id: 1234,
      sender: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3',
      recipient: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3.vault',
    }),
    onFinish: () => {},
  });
}
```

</TabsContent>
<TabsContent value="without">

```ts
const { openContractCall, isRequestPending } = useOpenContractCall();

async function handleOpenContractCall() {
  const functionArgs = [
    uintCV(1234),
    standardPrincipalCV('ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3'),
    contractPrincipalCV('ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3.vault'),
  ];
  await openContractCall({
    contractAddress: 'ST1X6M947Z7E58CNE0H8YJVJTVKS9VW0PHEG3NHN3',
    contractName: 'nft-contract',
    functionName: 'transfer',
    functionArgs,
    onFinish: () => {},
  });
}
```

</TabsContent>
</Tabs>

## From Clarity types to JS types

Because Clarigen knows the types of your contract's functions, it can convert Clarity types to JavaScript types behind the scenes. This means you can pass arguments and check results just like you would with any JavaScript library.

Here's how each Clarity type is converted back and forth with a JavaScript type:

- `uint` and `int`: `bigint`
- `buff`: `Uint8Array`
- `bool`: `boolean`
- `principal`: `string`
- `string-ascii` and `string-utf8`: `string`
- `(list <Type>)`: `Type[]`
- `(optional <Type>)`: `Type | null`

The `response` Clarity type uses a union type to represent the possible return values of a function. For example, the Clarity type `(response principal uint)` would be:

```ts
{
  isOk: true;
  value: string;
} | {
  isOk: false;
  value: bigint;
};
```

Clarity tuple types are represented as objects. For example, the Clarity tuple type `{ topic: (string-ascii 12), value: uint }` would be:

```ts
{
  topic: string;
  value: bigint;
}
```

## Why?

When you're building Clarity contracts, and Clarity apps, there is a ton of boilerplate code that you need to write. Similarly, you need to use a different library, with a different API, depending on if you're writing tests, web apps, or node.js code.

On the other hand, Clarity's designs mean that we shouldn't have to write lots of boilerplate. Clarity code is fully type-safe, and isn't compiled, so it's easy to generate a type interface for every single Clarity contract.

Clarigen is designed to harness Clarity's architecture and type safety to remove as much boilerplate as possible in your JavaScript projects. Ultimately, it makes Clarity development much more productive and easy.

## How it works

The magic behind Clarigen starts with the fact that any Clarity contract can be represented as a machine-readable interface, exposed in JSON format. In other blockchains, this is commonly referred to as an ABI. The interface for a contract looks something like this:

```json
{
  "functions": [
    {
      "name": "decrement",
      "access": "public",
      "args": [],
      "outputs": {
        "type": {
          "response": {
            "ok": "int128",
            "error": "none"
          }
        }
      }
    }
  ]
}
```

Clarigen will take the JSON interface for each of your projects, lightly annotate it, and generate a TypeScript file inside your project. When you're writing JS code (whether for testing or building apps), Clarigen's libraries will utilize these types to make interacting with contracts a breeze.

The end result is that you'll be able to write code that looks like native JavaScript, but is converted under-the-hood to proper Clarity types.

Here's an example of what your code will look like when using Clarigen. This is an example of writing unit tests with Clarinet.

```ts title="tests/counter_test.ts"
import { CoreNodeEventType, cvToValue, projectFactory } from '@clarigen/core';
import { accounts, project } from '../src/clarigen-types';
import { rov, rovOk, txOk, txErr, ro, varGet, mapGet, filterEvents, tx } from '@clarigen/test';
import { describe, test, it, expect } from 'vitest';

const contracts = projectFactory(project, 'simnet');
const { counter } = contracts;
const alice = accounts.wallet_1.address;

describe('counter contract tests', () => {
  it('has a default value', () => {
    const initial = counter.constants.counter;
    expect(initial).toEqual(1n);
    const value = rov(counter.getCounter());
    expect(value).toEqual(initial);
    expect(ro(counter.getCounter()).value).toEqual(1n);
  });

  it('can increment', () => {
    const receipt = txOk(counter.increment(1n), alice);
    expect(receipt.value).toEqual(2n);
  });

  it('can increment more than 1', () => {
    const receipt = txOk(counter.increment(5n), alice);
    expect(receipt.value).toEqual(7n);
  });

  it('cannot increment by more than 5', () => {
    const receipt = txErr(counter.increment(6n), alice);
    expect(receipt.value).toEqual(100n);

    const responseReceipt = tx(counter.increment(6n), alice);
    expect(responseReceipt.value.isOk).toEqual(false);
  });

  it('can get the counter variable', () => {
    const value = varGet(counter.identifier, counter.variables.counter);
    expect(value).toEqual(7n);
  });

  it('can get info from the last-increment map', () => {
    const value = mapGet(counter.identifier, counter.maps.lastIncrement, alice);
    expect(value).toEqual(5n);
  });

  it('can get events from a tx', () => {
    const receipt = txOk(counter.increment(1n), alice);
    const printEvents = filterEvents(receipt.events, CoreNodeEventType.ContractEvent);
    expect(printEvents.length).toEqual(1);
    const [print] = printEvents;
    const printData = cvToValue<{ action: string; object: string; value: bigint }>(
      print.data.value
    );
    expect(printData).toEqual({
      action: 'incremented',
      object: 'counter',
      value: 8n,
    });
  });
});
```

Clarity has it&apos;s own set of [built-in types](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-types), but Clarigen will convert them to JavaScript native values behind the scenes. This way, you can pass arguments and check results just like you would with any JavaScript library.

    ,# Clarigen CLI

The Clarigen CLI is the interface you'll use to generate Clarigen types. The CLI is a Deno project - so you'll need Deno installed in order to install it.

To install:

```bash
npm install @clarigen/cli
```

After being installed, you can run `clarigen` in your terminal.

```bash
npx clarigen
```

## Commands

### `clarigen`

Running `clarigen` on its own will generate type files for you.

#### Watch mode

Running `clarigen --watch` will keep the process open and watch for specific file changes. When a file change is detected, your types will be re-generated. This is helpful for actively developing tests or an app.

The files watched are:

- `Clarigen.toml`
- `Clarinet.toml`
- `contracts/*.clar`

### `clarigen docs`

Generate documentation from comments in your contracts. Check out the **TODO: add link** docs for more information.

### `clarigen init`

Generate a `Clarigen.toml` file.

### `clarigen upgrade`

Update your locally installed version of the `clarigen` CLI.

Run `clarigen upgrade -l` to list available versions.

Run `clarigen upgrade --version $version` to install a specific version.

## Log levels

To change the default logging, each command accepts either `--quiet` or `--verbose` flags, which changes the default log level used.

    ,# Configuration

Clarigen relies on a `Clarigen.toml` file at the root-level of your repository. That file determines which files to generate, where to put them, and more.

## `clarinet`

The only mandatory configuration you need to set is `clarinet`, which needs to point to your `Clarinet.toml` file. For most projects, your `Clarinet.toml` will also be at the root of your project. If you have a Clarinet project as a sub-directory, specify where the TOML file is.

```toml title="Clarigen.toml"
# for most projects:
clarinet = "./Clarinet.toml"

# or if a sub-directory
clarinet = "clarinet/Clarinet.toml"
```

## `types`

The "types" output is for environments that utilize NPM (or yarn, pnpm, etc) packages. This mostly refers to Node.js or web projects.

### `types.output`

Specify where you'd like the types file to be created.

To disable types generation, disable the `output` field

```toml title="Clarigen.toml"
[types]
output = "common/clarigen.ts"

# or disable:
# output = "common/clarigen.ts"
```

### `types.outputs`

If you want to export multiple generated types files (like for a monorepo), you can use the `outputs` array. Note that if `output` is present, then this is ignored.

```toml title="Clarigen.toml
[types]
outputs = ["common/clarigen.ts", "packages/web/clarigen.ts"]
```

### `types.after`

The code generated for types is not formatted, so it'll fail any linting you have. Use this field to specify a script you want ran after code is generated.

```toml title="Clarigen.toml"
[types]
output = "src/clarigen.ts"
// highlight-next-line
after = "yarn prettier -w src/clarigen.ts"
```

## `docs`

Clarigen can [automatically generate contract documentation](./documentation.mdx) for you.

### `docs.output`

Specify the folder where you'd like markdown files generated. A markdown file will be generated for each of your contracts, along with a `README.md` file.

```toml title="Clarigen.toml"
[docs]
# docs will be generated at `./docs/$file.md`
output = "docs"
```

### `docs.exclude`

By default, all contracts in `Clarinet.toml` are included in your docs. If you want to exclude certain contracts (such as traits and test helpers), you can use the `excludes` array.

Note that the values in `excludes` should be your contract names - not files.

If you have a `Clarinet.toml` like:

```toml
[contracts.extension-trait]
path = 'contracts/traits/extension-trait.clar'
```

Then to exclude that contract, you'd do:

```toml title="Clarigen.toml"
[docs]
exclude = ["extension-trait"]
```

    ,# Clarigen Docs - Generate Contract Documentation

Clarigen can automatically generate contract documentation for you. By default, it includes type definitions for everything in your contract. If your contract includes comments and tags that further describe your contract, that will be included alongside the auto-generated type documentation.

**tl;dr:**

```bash
clarigen docs
```

## Getting started

First, you'll need to [configure your `docs` output](./configuration#docs).

```toml title="Clarigen.toml"
[docs]
# docs will be generated at `./docs/$file.md`
output = "docs"
```

Once configured, just run `clarigen docs`, and Clarigen will generate documentation files for you.

## Documentation output

Claridoc will generate a markdown file for each of your contracts under your configured `docs.output` folder. If your contract name is `counter.clar`, the file will be `counter.md`.

You'll also get a `README.md` file in your docs folder, which is a table of contents with links to each of your contracts.

## How to document your contracts

Claridoc assumes a certain format for how you use comments to document your contracts.

Here's an example:

**TODO: example**

### High-level contract description

Adding comments to the top of your contract allow you to provide a description of the contract. Use this area to describe the overall purpose of the contract.

```clarity title="counter.clar" showLineNumbers
;; The counter contract maintains a single global counter
;; variable. Users can change the counter by calling
;; `increment` and `decrement`.
```

### Documenting Functions

Add comments right above a function to document that function. Any un-tagged comments will be used to show a "description" of the function.

Start a line with `@param` to document a parameter. The syntax for documenting params is:

`@param [param-name]; param description`

```clarity
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
```

### Tips for documenting contracts

- Use "vanilla" markdown inside of your comments. Claridoc will simply output the "raw" content, which will render as expected in markdown.
- Don't manually add type hints in your documentation. Claridoc will automatically extract types for everything in your contract.
- At the moment, Claridoc has very limited support for tags that you might expect from other documentation generators. Currently, `@param` is the only tag that is used to generate custom documentation.

Use markdown links to link to other methods and contracts. To link to a function within a contract, use an anchor link.

```clarity
;; For more info, see [`.staking#stake`](`./staking.md#stake`)
```

    ,# Use Clarigen with Clarinet-SDK

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

    ,# Building Clarity apps with Clarigen

Want to start building Stacks web apps using Clarigen? Here's how you can get up and running quickly:

## Install Clarigen and setup your project

Follow the [getting started](../getting-started) guide for installation instructions and project setup.

## Configure Clarigen to export a TypeScript file

In your `Clarigen.toml` file, set `types.output`:

```toml title="Clarigen.toml"
[types]
output = "src/clarigen.ts"
```

Refer to the [configuration docs](../configuration) for more info.

## Generate the TypeScript file

In your CLI, run:

```bash
clarigen
```

You should now have a Clarigen types file generated at `src/clarigen.ts`, or wherever you configured `types.output`.

## Setup your `ClarigenClient`

```ts title="src/clarigen-client.ts"
import { ClarigenClient } from '@clarigen/core';

const stacksApiUrl = 'https://stacks-node-api.mainnet.stacks.co';

export const clarigen = new ClarigenClient(stacksApiUrl);
```

## Create contract factories

Contract factories are ways to "connect" a contract definition with a contract identifier. These factories are designed to make it easy to work with your contracts on different environments.

[Learn more about contract factories](./factory)

```ts title="src/clarigen-contracts.ts"
// import from auto-generated types
import { contracts } from './clarigen';
import { contractFactory } from '@clarigen/core';

const nftContractId = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft';
export const nftContract = contractFactory(contracts.nft, nftContractId);
```

## Call read-only functions

When calling read-only functions using Clarigen, all responses are automatically converted to JS-native types from their associated Clarity values. In addition, the responses are correctly typed when using TypeScript.

[Learn more about calling read-only functions](./read-only-functions)

```ts
// import the client you just made
import { clarigen } from './clarigen-client';
// import your contract
import { nftContract } from './clarigen-contracts';

export async function getOwner(id: number | bigint) {
  // `response` is type:
  // `{ isOk: true; value: string } | { isOk: false, value: bigint }`
  const response = await clarigen.ro(nftContract.getOwner(id));
  if (response.isOk) {
    // `response.value` is a string
    return response.value;
  }
  // `response.value` is a bigint
  throw new Error(`Unexpected error: ${response.value}`);
}
```

## Making contract call transactions

When making contract call transactions, you can almost always use the "spread" syntax to pass contract call parameters to whatever library you're using.

[Learn more about signing transactions](./transactions)

Here's an example using React:

```tsx
import { useOpenContractCall } from '@micro-stacks/react';
import { nftContract } from './clarigen-contracts';

export const TransferTx = () => {
  const { openContractCall } = useOpenContractCall();
  const id = 1;
  const sender = 'SP...';
  const recipient = 'SP...';

  const handleOpenContractCall = async () => {
    await openContractCall({
      ...nftContract.transfer({
        id,
        sender,
        recipient,
      }),
      onFinish: async data => {
        console.log('Finished!', data);
      },
    });
  };

  return <button onClick={() => handleOpenContractCall()}>Transfer</button>;
};
```

    ,# Calling Read-only Functions

When building a Stacks app, you can query on-chain state from a Stacks contract by calling "read-only functions". These are functions exposed by the contract to help apps and other contracts integrate with the contract.

## Setting up the `ClarigenClient`

The `@clarigen/core` package exposes a `ClarigenClient` instance, which provides an easy way to call read-only functions in your app.

To construct the `ClarigenClient`, you need to include either:

- A `string` pointing to a Stacks API endpoint
- A `StacksNetwork` instance from `@stacks/network`

To use an API endpoint:

```ts
import { ClarigenClient } from '@clarigen/core';

const stacksApi = 'https://stacks-node-api.mainnet.stacks.co';

const client = new ClarigenClient(stacksApi);
```

Or, using a `StacksNetwork` instance:

```ts
import { ClarigenClient } from '@clarigen/core';
import { STACKS_MAINNET } from '@stacks/network';

const client = new ClarigenClient(STACKS_MAINNET);
```

If you have a Hiro Platform API key, you can use the optional `apiKey` argument in the `ClarigenClient` constructor:

```ts
import { ClarigenClient } from '@clarigen/core';

const client = new ClarigenClient('mainnet', myApiKey);
```

Or for other headers, you can use the `headers` argument:

```ts
new ClarigenClient('mainnet', myApiKey, {
  'my-custom-header': 'hello',
});
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

If you want to query the state of a contract based on the most recent microblock, you can include the `latest` option. This is provided by default.

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
import { STACKS_MAINNET } from '@stacks/network';

export function getOwner(id: bigint) {
  return ro(nftContract.getOwner(id), {
    network: STACKS_MAINNET,
  });
}
```

    ,# Signing Transactions

There are a few ways you can make contract call transactions, and they mostly depend on your personal preference and the type of web development environment you're using.

To learn more about making contract calls, check out the [`@stacks/connect`](https://www.npmjs.com/package/@stacks/connect#calling-smart-contracts-opencontractcall) docs.

<Tabs defaultValue="React">
  <TabsList>
    <TabsTrigger value="React">React</TabsTrigger>
    {/* <TabsTrigger value="Svelte">Svelte</TabsTrigger>
    <TabsTrigger value="Vue">Vue</TabsTrigger>
    <TabsTrigger value="Solid">Solid</TabsTrigger>
    <TabsTrigger value="Vanilla">Vanilla JS</TabsTrigger> */}
  </TabsList>
  <TabsContent value="React" label="React" default>

```tsx
import { openContractCall } from '@stacks/connect';
import { nftContract } from './clarigen-contracts';

export const TransferTx = () => {
  const { openContractCall } = useOpenContractCall();
  const id = 1;
  const sender = 'SP...';
  const recipient = 'SP...';

  const handleOpenContractCall = async () => {
    await openContractCall({
      // You can use the 'object params' syntax:
      ...nftContract.transfer({
        id,
        sender,
        recipient,
      }),
      // or the vanilla 'arguments' syntax:
      // ...nftContract.transfer(1, sender, recipient),
      onFinish: async data => {
        console.log('Finished!', data);
      },
    });
  };

  return <button onClick={() => handleOpenContractCall()}>Transfer</button>;
};
```

  </TabsContent>
  <TabsContent value="Svelte" label="Svelte">

```html
<script lang="ts">
  import { nftContract } from './clarigen-contracts';
  import { getOpenContractCall } from '@micro-stacks/svelte';

  const contractCall = getOpenContractCall();

  const id = 1;
  const sender = 'SP...';
  const recipient = 'SP...';

  const onClick = async () => {
    await $contractCall.openContractCall({
      // You can use the 'object params' syntax:
      ...nftContract.transfer({
        id,
        sender,
        recipient,
      }),
      // or the vanilla 'arguments' syntax:
      // ...nftContract.transfer(1, sender, recipient),
      // other options
      onFinish: data => {
        console.log('finished contract call!', data);
      },
    });
  };
</script>
```

  </TabsContent>
  <TabsContent value="Vue" label="Vue">

```html
<script setup lang="ts">
  import { nftContract } from "./clarigen-contracts";
  import { useOpenContractCall } from "@micro-stacks/vue";

  const { openContractCall, isRequestPending } = $(useOpenContractCall());

  const id = 1;
  const sender = "SP...";
  const recipient = "SP...";

  const onClick = async () => {
    await openContractCall({
      // You can use the 'object params' syntax:
      ...nftContract.transfer({
        id,
        sender,
        recipient,
      })
      // or the vanilla 'arguments' syntax:
      // ...nftContract.transfer(1, sender, recipient),
      // other options
      onFinish: (data) => {
        console.log("finished contract call!", data);
      },
    });
  };
</script>
```

  </TabsContent>
  <TabsContent value="Solid" label="Solid">

```tsx
import { useOpenContractCall } from '@micro-stacks/solidjs';
import { nftContract } from './clarigen-contracts';

export const TransferTx = () => {
  const { openContractCall } = useOpenContractCall();
  const id = 1;
  const sender = 'SP...';
  const recipient = 'SP...';

  const handleOpenContractCall = async () => {
    await openContractCall({
      // You can use the 'object params' syntax:
      ...nftContract.transfer({
        id,
        sender,
        recipient,
      }),
      // or the vanilla 'arguments' syntax:
      // ...nftContract.transfer(1, sender, recipient),
      onFinish: async data => {
        console.log('Finished!', data);
      },
    });
  };

  return <button onClick={() => handleOpenContractCall()}>Transfer</button>;
};
```

  </TabsContent>

  <TabsContent value="Vanilla" label="Vanilla">

When writing "vanilla JS" you can use the Clarigen client's `openContractCall`
function or the `MicroStacksClient#signTransaction` function.

Using the Clarigen client:

```ts
import { clarigen } from './clarigen-client';
import { nftContract } from './clarigen-contracts';

export async function makeTransfer(id, sender, recipient) {
  // You can use the 'object params' syntax:
  const contractCall = nftContract.transfer({
    id,
    sender,
    recipient,
  });
  // or the vanilla 'arguments' syntax:
  // const contractCall = nftContract.transfer(1, sender, recipient),
  await clarigen.openContractCall(contractCall, {
    // other options:
    postConditions: [],
  });
}
```

Or, using a `MicroStacksClient`:

```ts
import { microStacksClient } from './my-micro-stacks-client';
import { nftContract } from './clarigen-contracts';
import { TxType } from '@micro-stacks/client';

export async function makeTransfer(id, sender, recipient) {
  // You can use the 'object params' syntax:
  const contractCall = nftContract.transfer({
    id,
    sender,
    recipient,
  });
  // or the vanilla 'arguments' syntax:
  // const contractCall = nftContract.transfer(1, sender, recipient),
  await microStacksClient.makeTransfer(TxType.ContractCall, {
    ...contractCall,
    // other options
  });
}
```

  </TabsContent>
</Tabs>

    ,# Contract Factories

In Clarigen, a "factory" is a fancy term for combining a contract type definition (aka the "interface" or "ABI") along with a contract identifier for a given network. It's built this way because developers usually are working with their contracts on different networks, where contracts have different identifiers.

There are a few helper methods that Clarigen exposes to connect a contract definition with an identifier.

## `projectFactory`

The most powerful way to setup your contract identifiers is to use `projectFactory`, which utilizes your Clarinet [deployments](./deployments) to determine contract IDs. For complex projects, this is the best way to keep everything configured in one place. Additionally, this is especially helpful if you're using external "requirements", which have a separate deployer on mainnet.

When using `projectFactory`, you need to specify a "network", which must be one of:

- `devnet`
- `testnet`
- `mainnet`
- `simnet`

[Learn more about using deployments](./deployments)

```ts showLineNumbers {7}
// Import from auto-generated types:
import { project } from './clarigen';
import { projectFactory } from '@clarigen/core';
import { networkKey } from './constants';

export function getContracts() {
  return projectFactory(project, networkKey);
}
```

## `contractFactory`

The simplest way to setup a contract is with `contractFactory`, which takes two arguments: the contract types and the identifier.

```ts {6}
// Import from auto-generated types:
import { contracts } from './clarigen.ts';
import { contractFactory } from '@clarigen/core';

const nftIdentifier = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft';
export const nftContract = contractFactory(contracts.nft, nftIdentifier);
```

## `contractsFactory`

If you want to simply specify the single "deployer" for your contracts, this helper methods maps through each contract and sets the contract's ID to `${deployer}.${contract.name}`.

For example, if `deployer` is `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM` and you have two contracts (`nft` and `marketplace`), then `contractsFactory` will set the identifiers to `ST1P...GM.nft` and `ST1P...GM.marketplace`.

```ts showLineNumbers {10}
import { contracts } from './clarigen.ts';
import { contractsFactory } from '@clarigen/core';
import { networkKey } from './constants';

const mainnetDeployer = 'SP...';
const testnetDeployer = 'ST...';

export function getContracts() {
  let deployer = networkKey === 'mainnet' ? mainnetDeployer : testnetDeployer;
  return contractsFactory(contracts, deployer);
}
```

    ,# Deployments

Clarigen's web app support is designed around the concept of ["deployments" in the Clarinet framework](https://github.com/hirosystems/clarinet#deploy-contracts-to-devnet--testnet--mainnet). Deployments are a helpful way to structure and define how your contracts are deployed and referenced on different environments (devnet, testnet, and mainnet).

Clarigen utilizes your deployments to figure out what to use as the "contract identifier" in a given environment.

This becomes most useful when you utilize [Clarinet's "requirements" feature](https://github.com/hirosystems/clarinet#interacting-with-contracts-deployed-on-mainnet), which allows you to build contracts that utilize existing third-party contracts.

## Using deployments

If you have any deployments in your project, Clarigen will pick them up and use them to figure out what contract identifier to use for a given environment.

For example, imagine a project that utilizes an existing NFT contract. For Devnet and Testnet, your deployment plan will deploy a copy of the NFT contract under your own deployer address. In production, you'll want to reference the actual mainnet address of that contract.

In this example, you'll have two deployments:

- `./deployments/default.testnet-plan.yaml`
- `./deployments/default.mainnet-plan.yaml`

Clarigen will look for any file matching `./deployments/.default.${simnet | devnet | testnet | mainnet}-plan.yaml` and use that to determine contract IDs for a given network.

When you have deployments, Clarigen will add any found contract IDs to your auto-generated code. It'll look like:

```ts
export const deployments = {
  myContract: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
    simnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
    testnet: 'ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.my-contract',
    mainnet: 'SP3WJBA8QKQB6758WD7SFAXTA7X7TGC1ZDG0RWGT.my-contract',
  },
  externalContract: {
    devnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.external-contract',
    simnet: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.external-contract',
    testnet: 'ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.external-contract',
    // notice how this deployer is different than "my-contract" on mainnet:
    mainnet: 'SP32CF0E78JNPK0HYDTH3CCZ8FN76PFX5W0FYBN20.external-contract',
  },
};
```

    ,# Post Conditions

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

    ,# Clarigen with Node.js

When using Clarigen in a Node.js (i.e. server-side) environment, many of the same patterns can be used as with the [web client](./quick-start).

The main difference is that you'll sometimes want to sign and broadcast transactions using a private key.

## Signing contract call transactions

To sign and broadcast a contract call transaction, utilize the `@stacks/transactions` package. Similar to making transactions on the web, use the "spread" syntax to pass options to the `makeContractCall` function.

```ts showLineNumbers {8-12}
// import your conttract factory
import { nftContract } from './clarigen-contract';
import { makeContractCall, AnchorMode } from '@stacks/transactions';

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
    anchorMode: AnchorMode.Any,
  })
}
```
