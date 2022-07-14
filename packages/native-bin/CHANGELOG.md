# @clarigen/native-bin

## 1.0.0-next.27

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`b4ee542`](https://github.com/mechanismHQ/clarigen/commit/b4ee5428e1e5f7606824648bba5c9d389a05d2e3) Thanks [@hstove](https://github.com/hstove)! - Fixed handling of tuples with kebab-keys

- Updated dependencies [[`b4ee542`](https://github.com/mechanismHQ/clarigen/commit/b4ee5428e1e5f7606824648bba5c9d389a05d2e3)]:
  - @clarigen/core@1.0.0-next.30

## 1.0.0-next.26

### Minor Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`b2f0d85`](https://github.com/mechanismHQ/clarigen/commit/b2f0d85e7385e83f6e3649b0b8bb2ff6005bd429) Thanks [@hstove](https://github.com/hstove)! - Updated all packages to better work with the new type exports

### Patch Changes

- Updated dependencies [[`b2f0d85`](https://github.com/mechanismHQ/clarigen/commit/b2f0d85e7385e83f6e3649b0b8bb2ff6005bd429)]:
  - @clarigen/core@1.0.0-next.29

## 1.0.0-next.25

### Patch Changes

- The CLI now uses `clarinet run` to get session info, which is much more consistent and handles requirements better. Factory and deployment code updated to handle this

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.25

## 1.0.0-next.24

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`06ac766`](https://github.com/mechanismHQ/clarigen/commit/06ac7660898a481131082c83172afc3c2a8b80f9) Thanks [@hstove](https://github.com/hstove)! - Fix version bumps

- Updated dependencies [[`06ac766`](https://github.com/mechanismHQ/clarigen/commit/06ac7660898a481131082c83172afc3c2a8b80f9)]:
  - @clarigen/core@1.0.0-next.24

## 1.0.0-next.22

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`d116788`](https://github.com/mechanismHQ/clarigen/commit/d116788fd5f8cfa4a14716c2c7c54f435cb01884) Thanks [@hstove](https://github.com/hstove)! - Adds parsing and saving of deployment plans in typescript form.

- Updated dependencies [[`d116788`](https://github.com/mechanismHQ/clarigen/commit/d116788fd5f8cfa4a14716c2c7c54f435cb01884)]:
  - @clarigen/core@1.0.0-next.22

## 1.0.0-next.21

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`a131614`](https://github.com/mechanismHQ/clarigen/commit/a1316142a5bec9e949dd6cacd3328fa2941e12fc) Thanks [@hstove](https://github.com/hstove)! - Updated CLI package to support all config living in `Clarinet.toml`

* [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`0d9414f`](https://github.com/mechanismHQ/clarigen/commit/0d9414fa8e09df10548a5000a37ac66f60f509fc) Thanks [@hstove](https://github.com/hstove)! - Moved internal package management from yarn to pnpm.

* Updated dependencies [[`a131614`](https://github.com/mechanismHQ/clarigen/commit/a1316142a5bec9e949dd6cacd3328fa2941e12fc), [`0d9414f`](https://github.com/mechanismHQ/clarigen/commit/0d9414fa8e09df10548a5000a37ac66f60f509fc)]:
  - @clarigen/core@1.0.0-next.21

## 1.0.0-next.19

### Patch Changes

- Updated dependencies [[`b8988e7`](https://github.com/mechanismHQ/clarigen/commit/b8988e7ec734324de005a7b271d0a03b4cec6d37)]:
  - @clarigen/core@1.0.0-next.19

## 1.0.0-next.18

### Patch Changes

- [`8ae1862`](https://github.com/mechanismHQ/clarigen/commit/8ae18623f3535550c1707642dbde9ec79ae87585) Thanks [@hstove](https://github.com/hstove)! - Created a new generated file type through `@clarigen/cli`. New types allow Clarigen to only need a "typed ABI" in order to generate all of the same functionality. This greatly improve simplicity and portability. This new generated file has zero dependencies, meaning it can be used in Deno.

- Updated dependencies [[`8ae1862`](https://github.com/mechanismHQ/clarigen/commit/8ae18623f3535550c1707642dbde9ec79ae87585)]:
  - @clarigen/core@1.0.0-next.18

## 1.0.0-next.17

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`1a94545`](https://github.com/mechanismHQ/clarigen/commit/1a94545e482d42cc842e241d5484c69bb9188e7c) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug where the CLI exported invalid types for Response

- Updated dependencies [[`1a94545`](https://github.com/mechanismHQ/clarigen/commit/1a94545e482d42cc842e241d5484c69bb9188e7c)]:
  - @clarigen/core@1.0.0-next.17

## 1.0.0-next.16

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`f1cc407`](https://github.com/mechanismHQ/clarigen/commit/f1cc407fe3430e79468d38b5acdb60cf051ea5c5) Thanks [@hstove](https://github.com/hstove)! - Adds an index-level docs page when generating docs

- Updated dependencies [[`f1cc407`](https://github.com/mechanismHQ/clarigen/commit/f1cc407fe3430e79468d38b5acdb60cf051ea5c5)]:
  - @clarigen/core@1.0.0-next.16

## 1.0.0-next.15

### Patch Changes

- Updated dependencies [[`6916cb8`](https://github.com/mechanismHQ/clarigen/commit/6916cb8ea69715634399a4a48680323257c35719)]:
  - @clarigen/core@1.0.0-next.15

## 1.0.0-next.14

### Patch Changes

- [#30](https://github.com/mechanismHQ/clarigen/pull/30) [`a585ecb`](https://github.com/mechanismHQ/clarigen/commit/a585ecb3eb44d2a7b6a6850dcc5f01f76ba43b3c) Thanks [@hstove](https://github.com/hstove)! - Moved to a native `Response` type, instead of from `neverthrow`

* Moves to a native `Response` type, instead of using the 'neverthrow' library.

* Updated dependencies [[`a585ecb`](https://github.com/mechanismHQ/clarigen/commit/a585ecb3eb44d2a7b6a6850dcc5f01f76ba43b3c)]:
  - @clarigen/core@1.0.0-next.14

## 1.0.0-next.12

### Patch Changes

- Updates `@clarigen/native-bin` to use the natively built binaries for macos and linux arm64.

## 1.0.0-next.11

### Patch Changes

- Fixed an issue where some projects didn't run the correct build script in `prepublishonly`

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.11

## 1.0.0-next.10

### Patch Changes

- [`2e62568`](https://github.com/mechanismHQ/clarigen/commit/2e6256853efab622c3d61039c1d55073cb72ff17) Thanks [@hstove](https://github.com/hstove)! - Updates internal build processes with tsup and turborepo

- Updated dependencies [[`2e62568`](https://github.com/mechanismHQ/clarigen/commit/2e6256853efab622c3d61039c1d55073cb72ff17)]:
  - @clarigen/core@1.0.0-next.10

## 1.0.0-next.9

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.9

## 1.0.0-next.8

### Patch Changes

- Updated dependencies [[`741c968`](https://github.com/mechanismHQ/clarigen/commit/741c9687ef5e11a26c80f02233905136403ac940), [`7b5ce6d`](https://github.com/mechanismHQ/clarigen/commit/7b5ce6db6460a313924a976e1cfaca3fdbb4dc49)]:
  - @clarigen/core@1.0.0-next.8

## 1.0.0-next.7

### Patch Changes

- Manually constructs read-only fn call to include `tip` param.

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.7

## 1.0.0-next.6

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.6

## 1.0.0-next.4

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.4

## 1.0.0-next.3

### Patch Changes

- [`1727e49`](https://github.com/obylabs/clarigen/commit/1727e49ba456130115c310527c93c562a07f1716) Thanks [@hstove](https://github.com/hstove)! - Bumps `micro-stacks` version

- Updated dependencies [[`1727e49`](https://github.com/obylabs/clarigen/commit/1727e49ba456130115c310527c93c562a07f1716)]:
  - @clarigen/core@1.0.0-next.3

## 1.0.0-next.1

### Patch Changes

- Updated dependencies []:
  - @clarigen/core@1.0.0-next.1

## 1.0.0-next.0

### Major Changes

- [#28](https://github.com/obylabs/clarigen/pull/28) [`574834a`](https://github.com/obylabs/clarigen/commit/574834a950d8b8cfcff620c66f3f22b62c191c51) Thanks [@hstove](https://github.com/hstove)! - Migrates all packages to depend on `micro-stacks`. This allows for simplicity and much reduced bundle sizes.

  Most APIs do not change at all, however, there are some breaking changes:

  - The `buff` Clarity type now uses the `Uint8Array` native JS type, instead of `Buffer`
  - Some TypeScript types that came from `@stacks/transactions` will break, like the `PostCondition` type

### Patch Changes

- Updated dependencies [[`574834a`](https://github.com/obylabs/clarigen/commit/574834a950d8b8cfcff620c66f3f22b62c191c51)]:
  - @clarigen/core@1.0.0-next.0

## 0.3.4

### Patch Changes

- Updated dependencies [[`3f04d0d`](https://github.com/obylabs/clarigen/commit/3f04d0d5cf0e5e23e52ac2c6d598b08f6c0d58d1)]:
  - @clarigen/core@0.3.4

## 0.3.3

### Patch Changes

- [`7278ff6`](https://github.com/obylabs/clarigen/commit/7278ff662c98a6723e9f26579684dd36f35cdeea) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug where `native-bin` didn't work in node.js > 16.10.

## 0.3.2

### Patch Changes

- [`529cff2`](https://github.com/obylabs/clarigen/commit/529cff2a42263ff801f4a20d62bf7adfbd92ee0a) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug where contracts that printed output on contract deploys would throw an error. For example, this contract:

  ```clar
  (define-public (say-hi) (print "hello"))

  (say-hi)
  ```

  Would `print` when the contract deployed and cause an when Clarigen deployed it.

- Updated dependencies [[`529cff2`](https://github.com/obylabs/clarigen/commit/529cff2a42263ff801f4a20d62bf7adfbd92ee0a), [`d72e4e4`](https://github.com/obylabs/clarigen/commit/d72e4e4e160311d4ed39cf36f105ec9f0df92c81)]:
  - @clarigen/core@0.3.2

## 0.3.1

### Patch Changes

- Updated dependencies [[`5a4e434`](https://github.com/obylabs/clarigen/commit/5a4e43484c9134db102a9ef8745a273a0c6c3018)]:
  - @clarigen/core@0.3.1

## 0.2.7

### Patch Changes

- [`d5d9dc6`](https://github.com/obylabs/clarigen/commit/d5d9dc6b039bfb7c5e39d294594b753bb924b435) Thanks [@hstove](https://github.com/hstove)! - Fixed a bug when re-installing the native bin from a local file

## 0.2.3

### Patch Changes

- [`3e68eb1`](https://github.com/obylabs/clarigen/commit/3e68eb107c19c71af536a42d8120ac9e9a3b2c78) Thanks [@hstove](https://github.com/hstove)! - Fixed CI publish script

- Updated dependencies [[`3e68eb1`](https://github.com/obylabs/clarigen/commit/3e68eb107c19c71af536a42d8120ac9e9a3b2c78)]:
  - @clarigen/core@0.2.3

## 0.2.2

### Patch Changes

- [`a375c62`](https://github.com/obylabs/clarigen/commit/a375c622395b580821c0e53281ddd8233ccadf65) Thanks [@hstove](https://github.com/hstove)! - Fixed a typo in `post-install` for `native-bin`, which pointed to the wrong compiled file.

## 0.2.1

### Patch Changes

- [`cdf1b61`](https://github.com/obylabs/clarigen/commit/cdf1b619877b0e37872037507abe307a82875cc7) Thanks [@hstove](https://github.com/hstove)! - Fixed an issue when installing from NPM, because `post-install.js` was not included in NPM files.

## 0.2.0

### Minor Changes

- fd1b36b: This version contains a number of big changes!

  My favorite addition is the addition of a `@clarigen/native-bin` package. This removes the need to manually build and specify your local version of the `clarity-cli` binary. Most of this code was taken from the `@blockstack/clarity-native-bin` library. Users on Apple Silicon will also automatically download a pre-built binary (which was not previously available).

  These changes should really improve DX for project setup, as well as the ability to run Clarigen in CI.

  Other changes:

  - **Breaking change** JS types for functions that return `uint` or `int` types now use the `BigInt` native JavaScript type.
    - Although this is a breaking change, this is not a major update. Clarigen is still 0.x and is not in wide use.
  - **Breaking change**: Projects that have a `clarinet` configuration now look for the `Devnet.toml` file (instead of `Development.toml`)
  - Clarity type conversion (between hex and JS) has been consolidated into the `core` library
  - Bug fixes for boolean type conversion for function parameters
  - Added `get-stx-balance` test utility function
  - Added util for getting boot contract identifiers
  - `clarity-cli` is now launched in testnet mode by default
  - Added changesets for better release management
  - Added Github Actions CI to this package

### Patch Changes

- Updated dependencies [fd1b36b]
  - @clarigen/core@0.2.0
