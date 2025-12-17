# Using Clarigen

# Building Clarity apps with Clarigen

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
