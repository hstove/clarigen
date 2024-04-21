---
sidebar_position: 3
sidebar_label: Core Concepts
toc_max_heading_level: 4
---

# Core Concepts

Clarigen can be broken down into two things:

- A **set of libraries** for interacting with Clarity contracts in a type-safe, boilerplate-reduced way, in multiple different environments.
- A **code generator** that generates files and Typescript types relating to your Clarity contracts.

## How it works {#how-it-works}

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

Because we can get this interface for every single Clarity contract, we can depend on it and use it as a way to transform "JS native" code into Clarity function calls. For example, the above function `decrement` has zero arguments, and returns a `(response int none)` Clarity type. That means we can write a JS "transformer" that knows how to convert JavaScript values (like `number`, `boolean`) into Clarity values (`uint`, `bool`) and back.

### The `ContractCall` type {#the-contractcall-type}

Probably the most important concept to know is that, when you use Clarigen, you're calling simple functions that generate a `ContractCall`. Here's what that type looks like:

```ts
export interface ContractCall<T> {
  function: ClarityAbiFunction;
  nativeArgs: any[];
  functionArgs: ClarityValue[];
  contractAddress: string;
  contractName: string;
}
```

When you're interacting with your contracts, the "JS native" function you call will return a `ContractCall` by transforming the arguments you've passed. For example, imagine this contract function:

```clarity
(define-read-only (add-four (n uint))
  (+ n u4)
)
```

Clarigen will generate the TypeScript interface:

```ts
addFour: (n: number | bigint) => ContractCalls.ReadOnly<bigint>;
```

When we actually call this function, it will look like this:

```ts
const txPayload = myContract.addFour(5);
// `txPayload` looks like:
{
  function: {
    name: 'add-four',
    args: [{ name: 'n', type: 'uint128' }],
    outputs: { type: 'uint128 }
  },
  nativeArgs: [5],
  functionArgs: [uintCV(5)],
  contractAddress: 'ST123...',
  contractName: 'my-contract-name',
}
```

With this JSON-compatible object, we have enough information to make a contract call (whether read-only or public) in any environment. From here, it's just a matter of creating adapters for each environment.

Clarigen includes various adapters, or "providers", for each environment (unit tests, node.js, and web). This "provider pattern" is a tried-and-true way to build out a flexible pattern that can be widely used.

## Generated files {#generated-files}

When you use Clarigen to generate files, it creates TypeScript files in the following structure:

```
clarigenDir # Root directory for clarigen
└── index.ts
└── contractDir # a different folder for each contract
   ├── index.ts
   ├── types.ts
   └── abi.ts
```

### Clarigen base directory {#clarigen-base-directory}

All generated code lives under this directory. By default, this will be `src/clarigen`. You can customize this in your `clarigen.config.json` file, using the `outputDir` option.

Don't edit these files - they'll be overwritten each time Clarigen generates files. It's also best not to add any files under this folder.

### Top-level `index.ts` {#top-level-indexts}

Most of the time, you'll only need to import from this file itself. This file exports:

#### `contracts` {#contracts}

`contracts` is an object where each key is the camel-case name of a contract, and the associated value is the "info" or metadata for that contract. Clarigen's libraries are built to consume this object for easy deployment and usage.

#### `accounts` {#accounts}

`accounts` is simply a version of your `Devnet.toml` file, converted to Typescript so that you can use it at runtime. Typically, you'll only use this in your unit tests, where you'll want to bootstrap your test environment with a specific deployer and STX balances.

Each key in `accounts` is the name of that account. The value of each account includes `mnemonic`, `balance`, and `address`.

```ts
export const accounts = {
  deployer: {
    mnemonic: "twice kind ...",
    balance: 100000000000000n,
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  },
  account_1: {}, // etc
};
```

#### Contract types {#contract-types}

You can import each of your contracts Typescript interfaces from here:

```ts
import type { CounterContract, TokenContract } from "./clarigen";
```

### Contract directories {#contract-directories}

For each contract in your project, you'll have a folder with files related to that contract. The name of this folder is the camel-case version of your contract's name, as specified in `Clarinet.toml`.

#### `index.ts` {#indexts}

The key exports of this file are:

##### `${contractName}Contract` {#contractnamecontract}

This is a builder function that allows you to pass the deployer address and contract name of this file, and it returns a version of your contract that you'll use to make contract calls.

##### `${contractName}Info` {#contractnameinfo}

This is an object with metadata that Clarigen uses within internal libraries. You mostly won't use this export directly. It includes the default deployer address, file location, contract ABI, and the builder contract function (described above).

#### `types.ts` {#typests}

This is a pure TypeScript file - it doesn't export any values you can use at runtime. It only exports the generated TypeScript interface that allows you to interact with contracts in a type-safe and JS-native way.

The interface looks like this:

```ts
export interface CounterContract {
  // public functions:
  increment: () => ContractCalls.Public<bigint, bigint>;

  // functions that have arguments:
  incrementMany: (
    count: number | bigint
  ) => ContractCalls.Public<bigint, bigint>;

  // read-only functions:
  getCounter: () => ContractCalls.ReadOnly<bigint>;

  // maps too!
  idToUserMap: () => ContractCalls.Map<bigint, string>;
}
```

#### `abi.ts` {#abits}

The only export here is a `ClarityAbi` object, which is the exact same ABI you'd get from the [contract interface](https://github.com/stacks-network/stacks-blockchain/blob/master/docs/rpc-endpoints.md#get-v2contractsinterfacestacks-addresscontract-name) RPC method. Clarigen mostly uses this under the hood, but it's also helpful for use at runtime in certain situations.
