# @clarigen/cli

## 3.2.0

### Minor Changes

- [`4e395db`](https://github.com/hstove/clarigen/commit/4e395db083ff919afdda82566e2c00ec645a0252) Thanks [@hstove](https://github.com/hstove)! - Updates dependencies to support Clarity 4. Additionally, this fixes a bug when using contracts that include Clarity 4 code.

### Patch Changes

- [`f20c203`](https://github.com/hstove/clarigen/commit/f20c203cd901548efb00ca402d6e233b00a965e4) Thanks [@hstove](https://github.com/hstove)! - Adds `-w` to `clarigen docs`, to allow building docs in watch mode.

- Updated dependencies [[`4e395db`](https://github.com/hstove/clarigen/commit/4e395db083ff919afdda82566e2c00ec645a0252)]:
  - @clarigen/core@3.2.0

## 3.1.1

### Patch Changes

- [`5313660`](https://github.com/hstove/clarigen/commit/53136607f22629189121058fb3d9126cc146d800) Thanks [@hstove](https://github.com/hstove)! - Fixes an indentation bug in the generated docs README file, and adds JSON schema

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

- [`6edce37`](https://github.com/hstove/clarigen/commit/6edce3715479bfb2ac8d1be00338fa9a7531b6bd) Thanks [@hstove](https://github.com/hstove)! - You can now add `[watch_folders]` to your Clarigen config, which will let you watch different contracts folders for file changes when running `clarigen -w`.

- Updated dependencies []:
  - @clarigen/core@2.1.3

## 2.1.2

### Patch Changes

- [`6a957b5`](https://github.com/hstove/clarigen/commit/6a957b512738bba67c9b7aed1e222cc24919ae68) Thanks [@hstove](https://github.com/hstove)! - Updates dependencies to get rid of punycode warning

- Updated dependencies [[`6a957b5`](https://github.com/hstove/clarigen/commit/6a957b512738bba67c9b7aed1e222cc24919ae68)]:
  - @clarigen/core@2.1.2

## 2.1.1

### Patch Changes

- [`5b4c023`](https://github.com/hstove/clarigen/commit/5b4c0239ebe96be2ed8fa40159106d0637202edc) Thanks [@hstove](https://github.com/hstove)! - Fixes an issue with generating variables for Clarity version 3 contracts

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

- [`b23a777`](https://github.com/hstove/clarigen/commit/b23a7773b5d7eee33798537f60e845d82a847320) Thanks [@hstove](https://github.com/hstove)! - Adds the proper hashbang to the CLI .bin file

- Updated dependencies []:
  - @clarigen/core@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [[`63cf6f3`](https://github.com/hstove/clarigen/commit/63cf6f34467658c15462cc72a645b93a85307fb1)]:
  - @clarigen/core@2.0.5

## 2.0.4

### Patch Changes

- [`1b6c0b1`](https://github.com/hstove/clarigen/commit/1b6c0b114fd3bbcc93ba0f40c783275d77f9cfaf) Thanks [@hstove](https://github.com/hstove)! - When in watch mode, contract errors will no longer exit the `clarigen --watch` command.

- Updated dependencies []:
  - @clarigen/core@2.0.4

## 2.0.3

### Patch Changes

- [`ee3a60f`](https://github.com/hstove/clarigen/commit/ee3a60fa03643331250d3245294c5366e6b33754) Thanks [@hstove](https://github.com/hstove)! - Fixes `clarigen --watch` by generating types automatically, and properly reloading the session when files change.

- Updated dependencies []:
  - @clarigen/core@2.0.3

## 2.0.2

### Patch Changes

- [`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug when serializing accounts

* [`a77e4e9`](https://github.com/hstove/clarigen/commit/a77e4e90e5e1216e09137c3d084a45a214df165b) Thanks [@hstove](https://github.com/hstove)! - The accounts type now has a fixed alphabetical ordering. This will prevent git changes just from re-running `clarigen`.

- [`2846a13`](https://github.com/hstove/clarigen/commit/2846a1347ef6636a4f5228df91d39383697a6d8f) Thanks [@hstove](https://github.com/hstove)! - Fixed a type issue when an NFT's key was a tuple

- Updated dependencies [[`b00c618`](https://github.com/hstove/clarigen/commit/b00c6184d4d75ec839988c4f755601a5052853bc), [`2846a13`](https://github.com/hstove/clarigen/commit/2846a1347ef6636a4f5228df91d39383697a6d8f)]:
  - @clarigen/core@2.0.2

## 2.0.1

### Patch Changes

- [`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e) Thanks [@hstove](https://github.com/hstove)! - Updates `clarinet-sdk` imports to latest

- Updated dependencies [[`70836a4`](https://github.com/hstove/clarigen/commit/70836a4cbc14d832be8acfd460f562662d14d81e)]:
  - @clarigen/core@2.0.1

## 2.0.0

### Patch Changes

- [#1](https://github.com/hstove/clarigen/pull/1) [`8a50d86`](https://github.com/hstove/clarigen/commit/8a50d86025c27e057da3d1808ba8568ac1fc536b) Thanks [@hstove](https://github.com/hstove)! - Adds a new `@clarigen/cli` package, which generates Clarigen type files.

- Updated dependencies [[`49f34e7`](https://github.com/hstove/clarigen/commit/49f34e7f039dd74a24173d26622548a324f49281), [`e5574db`](https://github.com/hstove/clarigen/commit/e5574db54c1f471c0b4df385a7c841ca53d74226), [`8026e65`](https://github.com/hstove/clarigen/commit/8026e65ec2aa06745d9543717c46f593d6a405c4), [`d5172b8`](https://github.com/hstove/clarigen/commit/d5172b8ff25d8568b8ba2db52a8776c590e1c727), [`5155718`](https://github.com/hstove/clarigen/commit/5155718a403848cf54358b2fbc034c645f13abda), [`8a50d86`](https://github.com/hstove/clarigen/commit/8a50d86025c27e057da3d1808ba8568ac1fc536b), [`160371b`](https://github.com/hstove/clarigen/commit/160371b87efc6e039bd617a970b71f14ddb9501d), [`915381c`](https://github.com/hstove/clarigen/commit/915381cbef6de70dc722bae888232322f58fb0ac), [`a66d78a`](https://github.com/hstove/clarigen/commit/a66d78a17746ff46c259d683d814c2296d199772)]:
  - @clarigen/core@2.0.0
