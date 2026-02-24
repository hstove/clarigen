# @clarigen/test

## 4.1.0

### Patch Changes

- [`f38fc64`](https://github.com/hstove/clarigen/commit/f38fc64f6aa60347d44beda6b0a445027ad2f28a) Thanks [@hstove](https://github.com/hstove)! - Adds `cost` to logged contract calls

- [`c436afb`](https://github.com/hstove/clarigen/commit/c436afb99b9327a933e60cee7b09933d639baf70) Thanks [@hstove](https://github.com/hstove)! - Private functions can now be called in `@clarigen/test`. `simnet.callPrivateFn` is used under the hood

- [`0730fac`](https://github.com/hstove/clarigen/commit/0730facf8c3c2119e1ccc046553b0a008c8d9ac8) Thanks [@hstove](https://github.com/hstove)! - Adds the ability to log a deployment `contract-call` as YAML with `process.env.LOG_TX_CALLS`

- [`962583b`](https://github.com/hstove/clarigen/commit/962583b68596da7b50d179b176da61d7c7cbcc2d) Thanks [@hstove](https://github.com/hstove)! - Adds helper functions `assertOk` and `assertErr` to `@clarigen/test`

- Updated dependencies [[`f38fc64`](https://github.com/hstove/clarigen/commit/f38fc64f6aa60347d44beda6b0a445027ad2f28a), [`0730fac`](https://github.com/hstove/clarigen/commit/0730facf8c3c2119e1ccc046553b0a008c8d9ac8), [`229ea03`](https://github.com/hstove/clarigen/commit/229ea039b9bbfd9c2ea4a035b74f19296724e5ac)]:
  - @clarigen/core@4.1.0

## 4.0.2-alpha.1

### Patch Changes

- [`f38fc64`](https://github.com/hstove/clarigen/commit/f38fc64f6aa60347d44beda6b0a445027ad2f28a) Thanks [@hstove](https://github.com/hstove)! - Adds `cost` to logged contract calls

- Updated dependencies [[`f38fc64`](https://github.com/hstove/clarigen/commit/f38fc64f6aa60347d44beda6b0a445027ad2f28a)]:
  - @clarigen/core@4.0.2-alpha.1

## 4.0.2-alpha.0

### Patch Changes

- [`0730fac`](https://github.com/hstove/clarigen/commit/0730facf8c3c2119e1ccc046553b0a008c8d9ac8) Thanks [@hstove](https://github.com/hstove)! - Adds the ability to log a deployment `contract-call` as YAML with `process.env.LOG_TX_CALLS`

- Updated dependencies [[`0730fac`](https://github.com/hstove/clarigen/commit/0730facf8c3c2119e1ccc046553b0a008c8d9ac8)]:
  - @clarigen/core@4.0.2-alpha.0

## 4.0.1

### Patch Changes

- Updated dependencies [[`7804793`](https://github.com/hstove/clarigen/commit/7804793d08085946fe26eae94eec4ec5189ee54f)]:
  - @clarigen/core@4.0.1

## 4.0.0

### Major Changes

- [#22](https://github.com/hstove/clarigen/pull/22) [`7638a7f`](https://github.com/hstove/clarigen/commit/7638a7f621e62048a55d4a0eda6da99fd825cfc7) Thanks [@BowTiedRadone](https://github.com/BowTiedRadone)! - This release updates all dependencies to use `@stacks/clarinet-sdk`, whereas before it was `@hirosystems/clarinet-sdk`. As such, this is a breaking change. See also https://github.com/stx-labs/clarinet/discussions/2055

### Patch Changes

- Updated dependencies [[`7638a7f`](https://github.com/hstove/clarigen/commit/7638a7f621e62048a55d4a0eda6da99fd825cfc7)]:
  - @clarigen/core@4.0.0

## 3.2.0

### Minor Changes

- [`4e395db`](https://github.com/hstove/clarigen/commit/4e395db083ff919afdda82566e2c00ec645a0252) Thanks [@hstove](https://github.com/hstove)! - Updates dependencies to support Clarity 4. Additionally, this fixes a bug when using contracts that include Clarity 4 code.

### Patch Changes

- Updated dependencies [[`4e395db`](https://github.com/hstove/clarigen/commit/4e395db083ff919afdda82566e2c00ec645a0252)]:
  - @clarigen/core@3.2.0

## 3.1.1

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@3.1.1

## 3.1.0

### Minor Changes

- [`ad49850`](https://github.com/hstove/clarigen/commit/ad49850a9f6c973b7f4fc84443582c386a00fa69) Thanks [@hstove](https://github.com/hstove)! - Updates internal versions of `@hirosystems/clarinet-sdk`

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@3.1.0

## 3.0.0

### Major Changes

- [`c5d5e20`](https://github.com/hstove/clarigen/commit/c5d5e201108d027f2a0eaa38e762aeb2f1cc8880) Thanks [@hstove](https://github.com/hstove)! - This major release updates Stacks.JS to v7

### Patch Changes

- Updated dependencies [[`c5d5e20`](https://github.com/hstove/clarigen/commit/c5d5e201108d027f2a0eaa38e762aeb2f1cc8880)]:
  - @clarigen/core@3.0.0

## 2.1.3

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@2.1.3

## 2.1.2

### Patch Changes

- [`6a957b5`](https://github.com/hstove/clarigen/commit/6a957b512738bba67c9b7aed1e222cc24919ae68) Thanks [@hstove](https://github.com/hstove)! - Updates dependencies to get rid of punycode warning

- Updated dependencies [[`6a957b5`](https://github.com/hstove/clarigen/commit/6a957b512738bba67c9b7aed1e222cc24919ae68)]:
  - @clarigen/core@2.1.2

## 2.1.1

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@2.1.1

## 2.1.0

### Minor Changes

- [`c0c0386`](https://github.com/hstove/clarigen/commit/c0c038690e8edafad4703b9abffdb1d1cefc741a) Thanks [@hstove](https://github.com/hstove)! - Updates `@hirosystems/clarinet-sdk` to work with Clarity version 3

### Patch Changes

- Updated dependencies [[`c0c0386`](https://github.com/hstove/clarigen/commit/c0c038690e8edafad4703b9abffdb1d1cefc741a)]:
  - @clarigen/core@2.1.0

## 2.0.6

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [[`63cf6f3`](https://github.com/hstove/clarigen/commit/63cf6f34467658c15462cc72a645b93a85307fb1)]:
  - @clarigen/core@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@2.0.3

## 2.0.2

### Patch Changes

- [`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug when serializing accounts

- Updated dependencies [[`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc), [`2846a13`](https://github.com/hstove/clarigen/commit/2846a1347ef6636a4f5228df91d39383697a6d8f)]:
  - @clarigen/core@2.0.2

## 2.0.1

### Patch Changes

- [`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e) Thanks [@hstove](https://github.com/hstove)! - Updates `clarinet-sdk` imports to latest

- Updated dependencies [[`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e)]:
  - @clarigen/core@2.0.1

## 2.0.0

### Major Changes

- [#1](https://github.com/hstove/clarigen/pull/1) [`160371b`](https://github.com/hstove/clarigen/commit/160371b87efc6e039bd617a970b71f14ddb9501d) Thanks [@hstove](https://github.com/hstove)! - `micro-stacks` has been removed from all libaries and has been replaced by `stacks.js` packages. This is to eliminate compatibility issues with `@hirosystems/clarinet-sdk` and other libraries.

  Additionally, the `@clarigen/web` and `@clarigen/node` packages are effectively deprecated, as they weren't providing any functionality that isn't provided with `@clarigen/core` in combination with other libraries.

### Patch Changes

- [#1](https://github.com/hstove/clarigen/pull/1) [`49f34e7`](https://github.com/hstove/clarigen/commit/49f34e7f039dd74a24173d26622548a324f49281) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug in `cvToValue` when changing tuples with responses in values

* [#1](https://github.com/hstove/clarigen/pull/1) [`e5574db`](https://github.com/hstove/clarigen/commit/e5574db54c1f471c0b4df385a7c841ca53d74226) Thanks [@hstove](https://github.com/hstove)! - Include missing built files

- [#1](https://github.com/hstove/clarigen/pull/1) [`8026e65`](https://github.com/hstove/clarigen/commit/8026e65ec2aa06745d9543717c46f593d6a405c4) Thanks [@hstove](https://github.com/hstove)! - Adds raw clarity parsing capabilities to `core` and more helper functions to `test`

* [#1](https://github.com/hstove/clarigen/pull/1) [`d5172b8`](https://github.com/hstove/clarigen/commit/d5172b8ff25d8568b8ba2db52a8776c590e1c727) Thanks [@hstove](https://github.com/hstove)! - Export utils from `test`

- [#1](https://github.com/hstove/clarigen/pull/1) [`5155718`](https://github.com/hstove/clarigen/commit/5155718a403848cf54358b2fbc034c645f13abda) Thanks [@hstove](https://github.com/hstove)! - Fixes `toCamelCase` to handle UPPER_CASE format

* [#1](https://github.com/hstove/clarigen/pull/1) [`76a6440`](https://github.com/hstove/clarigen/commit/76a64407fd8e9eb4832bc516169e8fe42b1bbeaf) Thanks [@hstove](https://github.com/hstove)! - Created a new `@clarigen/test` package, which uses `@hirosystems/clarinet-sdk`

- [#1](https://github.com/hstove/clarigen/pull/1) [`8a50d86`](https://github.com/hstove/clarigen/commit/8a50d86025c27e057da3d1808ba8568ac1fc536b) Thanks [@hstove](https://github.com/hstove)! - Adds a new `@clarigen/cli` package, which generates Clarigen type files.

* [#1](https://github.com/hstove/clarigen/pull/1) [`915381c`](https://github.com/hstove/clarigen/commit/915381cbef6de70dc722bae888232322f58fb0ac) Thanks [@hstove](https://github.com/hstove)! - Improves types in `test` package

- [#1](https://github.com/hstove/clarigen/pull/1) [`a66d78a`](https://github.com/hstove/clarigen/commit/a66d78a17746ff46c259d683d814c2296d199772) Thanks [@hstove](https://github.com/hstove)! - Fix: invalid build of previous release

- Updated dependencies [[`49f34e7`](https://github.com/hstove/clarigen/commit/49f34e7f039dd74a24173d26622548a324f49281), [`e5574db`](https://github.com/hstove/clarigen/commit/e5574db54c1f471c0b4df385a7c841ca53d74226), [`8026e65`](https://github.com/hstove/clarigen/commit/8026e65ec2aa06745d9543717c46f593d6a405c4), [`d5172b8`](https://github.com/hstove/clarigen/commit/d5172b8ff25d8568b8ba2db52a8776c590e1c727), [`5155718`](https://github.com/hstove/clarigen/commit/5155718a403848cf54358b2fbc034c645f13abda), [`8a50d86`](https://github.com/hstove/clarigen/commit/8a50d86025c27e057da3d1808ba8568ac1fc536b), [`160371b`](https://github.com/hstove/clarigen/commit/160371b87efc6e039bd617a970b71f14ddb9501d), [`915381c`](https://github.com/hstove/clarigen/commit/915381cbef6de70dc722bae888232322f58fb0ac), [`a66d78a`](https://github.com/hstove/clarigen/commit/a66d78a17746ff46c259d683d814c2296d199772)]:
  - @clarigen/core@2.0.0

## 1.0.16-alpha.7

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`b5b382e`](https://github.com/mechanismHQ/clarigen/commit/b5b382ee7cbd5fd33bc490a06a7169cf72de6eb2) Thanks [@hstove](https://github.com/hstove)! - Fix: invalid build of previous release

- Updated dependencies [[`b5b382e`](https://github.com/mechanismHQ/clarigen/commit/b5b382ee7cbd5fd33bc490a06a7169cf72de6eb2)]:
  - @clarigen/core@1.0.16-alpha.7

## 1.0.16-alpha.6

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`f63a739`](https://github.com/mechanismHQ/clarigen/commit/f63a73930d80bddb83f1ec18e886a5c738e3a8ef) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug in `cvToValue` when changing tuples with responses in values

- Updated dependencies [[`f63a739`](https://github.com/mechanismHQ/clarigen/commit/f63a73930d80bddb83f1ec18e886a5c738e3a8ef)]:
  - @clarigen/core@1.0.16-alpha.6

## 1.0.16-alpha.5

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`ac1ef2f`](https://github.com/mechanismHQ/clarigen/commit/ac1ef2ffa39dcb580693694b6c98d15194f07910) Thanks [@hstove](https://github.com/hstove)! - Fixes `toCamelCase` to handle UPPER_CASE format

- Updated dependencies [[`ac1ef2f`](https://github.com/mechanismHQ/clarigen/commit/ac1ef2ffa39dcb580693694b6c98d15194f07910)]:
  - @clarigen/core@1.0.16-alpha.5

## 1.0.16-alpha.4

### Patch Changes

- [`b969418`](https://github.com/mechanismHQ/clarigen/commit/b9694186e7b9a07368d75b46a66dcfdb1f9357d7) Thanks [@hstove](https://github.com/hstove)! - Improves types in `test` package

- Updated dependencies [[`b969418`](https://github.com/mechanismHQ/clarigen/commit/b9694186e7b9a07368d75b46a66dcfdb1f9357d7)]:
  - @clarigen/core@1.0.16-alpha.4

## 1.0.16-alpha.3

### Patch Changes

- [`911cc06`](https://github.com/mechanismHQ/clarigen/commit/911cc06c8f293d53c29e2cd5e16eff38a7762053) Thanks [@hstove](https://github.com/hstove)! - Include missing built files

- Updated dependencies [[`911cc06`](https://github.com/mechanismHQ/clarigen/commit/911cc06c8f293d53c29e2cd5e16eff38a7762053)]:
  - @clarigen/core@1.0.16-alpha.3

## 1.0.16-alpha.2

### Patch Changes

- [`9a863ad`](https://github.com/mechanismHQ/clarigen/commit/9a863adcb5c94582e369181f2a8773078416f4f4) Thanks [@hstove](https://github.com/hstove)! - Export utils from `test`

- Updated dependencies [[`9a863ad`](https://github.com/mechanismHQ/clarigen/commit/9a863adcb5c94582e369181f2a8773078416f4f4)]:
  - @clarigen/core@1.0.16-alpha.2

## 1.0.16-alpha.1

### Patch Changes

- [`1e52fd6`](https://github.com/mechanismHQ/clarigen/commit/1e52fd6b8278feec80961dcdd1f34ddf393a132f) Thanks [@hstove](https://github.com/hstove)! - Adds raw clarity parsing capabilities to `core` and more helper functions to `test`

- Updated dependencies [[`1e52fd6`](https://github.com/mechanismHQ/clarigen/commit/1e52fd6b8278feec80961dcdd1f34ddf393a132f)]:
  - @clarigen/core@1.0.16-alpha.1

## 1.0.16-alpha.0

### Patch Changes

- Created a new `@clarigen/test` package, which uses `@hirosystems/clarinet-sdk`

- Updated dependencies []:
  - @clarigen/core@1.0.16-alpha.0
