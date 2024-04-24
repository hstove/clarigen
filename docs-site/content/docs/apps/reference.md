---
sidebar_label: Reference
---

# Clarigen ESM Reference

## Making contract call payloads {#making-contract-call-payloads}

At its core, Clarigen is just a tool for constructing contract call "payloads", which can be used for calling read-only functions and making contract call transactions.

In many of these examples, you'll see the use of the "spread" operator on a Clarigen contract call. This works because every Clarigen contract call is a simple object with the following properties:

```ts
interface ContractCall {
  contractName: string;
  contractAddress: string;
  functionName: string;
  functionArgs: ClarityValue[];
}
```

Because it has these properties, you can simply pass it as an object to any `micro-stacks` transaction signing function.
