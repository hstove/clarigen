# Clarigen

<!-- TOC depthfrom:2 -->

<!-- /TOC -->

Clarigen is a developer tool that automatically generates TypeScript-friendly clients that can interact with [Clarity](https://clarity-lang.org) smart contracts.

The workflow for using Clarigen is usually:

- Write your Clarity contracts under a `/contracts` folder
- Automatically generate interfaces for your contracts with `npx clarigen --watch`
- Write unit tests using [`@clarigen/test`](https://clarigen.dev/docs/unit-tests/quick-start)
- Build web apps that call read-only functions and make transactions

[Learn more on clarigen.dev](https://clarigen.dev)
