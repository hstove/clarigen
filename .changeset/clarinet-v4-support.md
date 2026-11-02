---
'@clarigen/cli': minor
'@clarigen/test': minor
---

Add support for Clarinet v4 (`@stacks/clarinet-sdk@^4.0.0`). Clarinet v3 remains supported from 3.15.0; the previous `^3.9.2` peer range was inaccurate, as earlier v3 releases did not work.

- `@clarigen/cli` no longer uses the removed `simnet.runSnippet`, and reads contract variables via a read-only function, since `deployContract` no longer returns the contract's last expression in Clarinet v4.
- `@clarigen/test`'s `tx` throws when a function doesn't return a response, matching Clarinet v3 behavior.
