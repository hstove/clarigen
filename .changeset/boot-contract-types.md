---
'@clarigen/cli': minor
---

Boot contracts are now fully supported when `include_boot_contracts` is enabled:

- Boot contracts registered at the testnet burn address (`ST000…`) are no longer silently dropped. Previously, because every boot contract is registered at both burn addresses under the same name, the surviving variant depended on map iteration order — and when the testnet variant won, the contract (e.g. `pox-5`) disappeared from the generated output entirely. Deduplication is now deterministic: deployment-plan identifiers win over other contracts, which win over boot contracts, with the mainnet burn address variant preferred between the two boot registrations.
- Contracts without a source file in the project (boot contracts and requirements) now get their source from the simnet via `getContractSource()`, so constants and variables are extracted for them instead of being emitted as empty objects.
- Boot contracts get per-network `deployments` identifiers: the mainnet burn address on `mainnet`, and the testnet burn address on `testnet`, `simnet`, and `devnet` (which are testnet-flavored chains). Previously `simnet`/`devnet` were filled with the mainnet burn address identifier, which is not the instance the simnet executes against.
- `@stacks/clarinet-sdk` was updated to 3.23.1, which is required for `getContractSource()` to return boot contract sources.
