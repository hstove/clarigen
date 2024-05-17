# demo-project

## 2.0.4

### Patch Changes

- Updated dependencies []:
  - @clarigen/boot@2.0.4
  - @clarigen/test@2.0.4
  - @clarigen/core@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies []:
  - @clarigen/boot@2.0.3
  - @clarigen/test@2.0.3
  - @clarigen/core@2.0.3

## 2.0.2

### Patch Changes

- [`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug when serializing accounts

- Updated dependencies [[`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc), [`2846a13`](https://github.com/hstove/clarigen/commit/2846a1347ef6636a4f5228df91d39383697a6d8f), [`a77e4e9`](https://github.com/hstove/clarigen/commit/a77e4e90e5e1216e09137c3d084a45a214df165b), [`2846a13`](https://github.com/hstove/clarigen/commit/2846a1347ef6636a4f5228df91d39383697a6d8f)]:
  - @clarigen/test@2.0.2
  - @clarigen/core@2.0.2
  - @clarigen/boot@2.0.2

## 2.0.1

### Patch Changes

- [`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e) Thanks [@hstove](https://github.com/hstove)! - Updates `clarinet-sdk` imports to latest

- Updated dependencies [[`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e)]:
  - @clarigen/test@2.0.1
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

- Updated dependencies [[`49f34e7`](https://github.com/hstove/clarigen/commit/49f34e7f039dd74a24173d26622548a324f49281), [`e5574db`](https://github.com/hstove/clarigen/commit/e5574db54c1f471c0b4df385a7c841ca53d74226), [`8026e65`](https://github.com/hstove/clarigen/commit/8026e65ec2aa06745d9543717c46f593d6a405c4), [`d5172b8`](https://github.com/hstove/clarigen/commit/d5172b8ff25d8568b8ba2db52a8776c590e1c727), [`5155718`](https://github.com/hstove/clarigen/commit/5155718a403848cf54358b2fbc034c645f13abda), [`76a6440`](https://github.com/hstove/clarigen/commit/76a64407fd8e9eb4832bc516169e8fe42b1bbeaf), [`8a50d86`](https://github.com/hstove/clarigen/commit/8a50d86025c27e057da3d1808ba8568ac1fc536b), [`160371b`](https://github.com/hstove/clarigen/commit/160371b87efc6e039bd617a970b71f14ddb9501d), [`915381c`](https://github.com/hstove/clarigen/commit/915381cbef6de70dc722bae888232322f58fb0ac), [`a66d78a`](https://github.com/hstove/clarigen/commit/a66d78a17746ff46c259d683d814c2296d199772)]:
  - @clarigen/test@2.0.0
  - @clarigen/core@2.0.0

## 1.0.16-alpha.7

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`b5b382e`](https://github.com/mechanismHQ/clarigen/commit/b5b382ee7cbd5fd33bc490a06a7169cf72de6eb2) Thanks [@hstove](https://github.com/hstove)! - Fix: invalid build of previous release

## 1.0.16-alpha.6

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`f63a739`](https://github.com/mechanismHQ/clarigen/commit/f63a73930d80bddb83f1ec18e886a5c738e3a8ef) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug in `cvToValue` when changing tuples with responses in values

## 1.0.16-alpha.5

### Patch Changes

- [#37](https://github.com/mechanismHQ/clarigen/pull/37) [`ac1ef2f`](https://github.com/mechanismHQ/clarigen/commit/ac1ef2ffa39dcb580693694b6c98d15194f07910) Thanks [@hstove](https://github.com/hstove)! - Fixes `toCamelCase` to handle UPPER_CASE format

## 1.0.16-alpha.4

### Patch Changes

- [`b969418`](https://github.com/mechanismHQ/clarigen/commit/b9694186e7b9a07368d75b46a66dcfdb1f9357d7) Thanks [@hstove](https://github.com/hstove)! - Improves types in `test` package

## 1.0.16-alpha.3

### Patch Changes

- [`911cc06`](https://github.com/mechanismHQ/clarigen/commit/911cc06c8f293d53c29e2cd5e16eff38a7762053) Thanks [@hstove](https://github.com/hstove)! - Include missing built files

## 1.0.16-alpha.2

### Patch Changes

- [`9a863ad`](https://github.com/mechanismHQ/clarigen/commit/9a863adcb5c94582e369181f2a8773078416f4f4) Thanks [@hstove](https://github.com/hstove)! - Export utils from `test`

## 1.0.16-alpha.1

### Patch Changes

- [`1e52fd6`](https://github.com/mechanismHQ/clarigen/commit/1e52fd6b8278feec80961dcdd1f34ddf393a132f) Thanks [@hstove](https://github.com/hstove)! - Adds raw clarity parsing capabilities to `core` and more helper functions to `test`

## 1.0.16-alpha.0

### Patch Changes

- Created a new `@clarigen/test` package, which uses `@hirosystems/clarinet-sdk`

- Updated dependencies []:
  - @clarigen/test@1.0.16-alpha.0
  - @clarigen/core@1.0.16-alpha.0

## 1.0.15

## 1.0.14

### Patch Changes

- [`c74ca1e`](https://github.com/mechanismHQ/clarigen/commit/c74ca1ee50892a946b74c30161cc6f50d6fe4375) Thanks [@hstove](https://github.com/hstove)! - Automatically infer post condition type from raw ABI
