---
sidebar_label: Contract Factories
---

# Contract Factories

In Clarigen, a "factory" is a fancy term for combining a contract type definition (aka the "interface" or "ABI") along with a contract identifier for a given network. It's built this way because developers usually are working with their contracts on different networks, where contracts have different identifiers.

There are a few helper methods that Clarigen exposes to connect a contract definition with an identifier.

## `projectFactory` {#projectfactory}

The most powerful way to setup your contract identifiers is to use `projectFactory`, which utilizes your Clarinet [deployments](./deployments) to determine contract IDs. For complex projects, this is the best way to keep everything configured in one place. Additionally, this is especially helpful if you're using external "requirements", which have a separate deployer on mainnet.

When using `projectFactory`, you need to specify a "network", which must be one of:

- `devnet`
- `testnet`
- `mainnet`
- `simnet`

[Learn more about using deployments](./deployments)

```ts
// Import from auto-generated types:
import { project } from "./clarigen";
import { projectFactory } from "@clarigen/core";
import { networkKey } from "./constants";

export function getContracts() {
  return projectFactory(project, networkKey);
}
```

## `contractFactory` {#contractfactory}

The simplest way to setup a contract is with `contractFactory`, which takes two arguments: the contract types and the identifier.

```ts
// Import from auto-generated types:
import { contracts } from "./clarigen.ts";
import { contractFactory } from "@clarigen/core";

const nftIdentifier = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft";
export const nftContract = contractFactory(contracts.nft, nftIdentifier);
```

## `contractsFactory` {#contractsfactory}

If you want to simply specify the single "deployer" for your contracts, this helper methods maps through each contract and sets the contract's ID to `${deployer}.${contract.name}`.

For example, if `deployer` is `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM` and you have two contracts (`nft` and `marketplace`), then `contractsFactory` will set the identifiers to `ST1P...GM.nft` and `ST1P...GM.marketplace`.

```ts
import { contracts } from "./clarigen.ts";
import { contractsFactory } from "@clarigen/core";
import { networkKey } from "./constants";

const mainnetDeployer = "SP...";
const testnetDeployer = "ST...";

export function getContracts() {
  let deployer = networkKey === "mainnet" ? mainnetDeployer : testnetDeployer;
  return contractsFactory(contracts, deployer);
}
```
