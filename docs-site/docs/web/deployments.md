---
sidebar_label: Deployments
---

# Deployments

Clarigen's web app support is designed around the concept of ["deployments" in the Clarinet framework](https://github.com/hirosystems/clarinet#deploy-contracts-to-devnet--testnet--mainnet). Deployments are a helpful way to structure and define how your contracts are deployed and referenced on different environments (devnet, testnet, and mainnet).

Clarigen utilizes your deployments to figure out what to use as the "contract identifier" in a given environment.

This becomes most useful when you utilize [Clarinet's "requirements" feature](https://github.com/hirosystems/clarinet#interacting-with-contracts-deployed-on-mainnet), which allows you to build contracts that utilize existing third-party contracts.

## Using deployments {#using-deployments}

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
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract",
    testnet: "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.my-contract",
    mainnet: "SP3WJBA8QKQB6758WD7SFAXTA7X7TGC1ZDG0RWGT.my-contract",
  },
  externalContract: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.external-contract",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.external-contract",
    testnet: "ST2X2FYCY01Y7YR2TGC2Y6661NFF3SMH0NGXPWTV5.external-contract",
    // notice how this deployer is different than "my-contract" on mainnet:
    mainnet: "SP32CF0E78JNPK0HYDTH3CCZ8FN76PFX5W0FYBN20.external-contract",
  },
};
```
