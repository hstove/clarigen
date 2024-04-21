---
sidebar_label: Configuration
---

# Configuration

Clarigen relies on a `Clarigen.toml` file at the root-level of your repository. That file determines which files to generate, where to put them, and more.

## `clarinet` {#clarinet}

The only mandatory configuration you need to set is `clarinet`, which needs to point to your `Clarinet.toml` file. For most projects, your `Clarinet.toml` will also be at the root of your project. If you have a Clarinet project as a sub-directory, specify where the TOML file is.

```toml title="Clarigen.toml"
# for most projects:
clarinet = "./Clarinet.toml"

# or if a sub-directory
clarinet = "clarinet/Clarinet.toml"
```

## `deno` {#deno}

If you're writing Clarinet tests with Deno, specify where you'd like your Clarigen types to be generated. You can specify either a filename (ending in `.ts`) or a directory. If you specify a directly, the generated file will be `$dir/index.ts`.

To disable Deno generation, comment out the `output` field.

```toml title="Clarigen.toml"
[deno]
output = "artifacts/" # will generate ./artifacts/index.ts

# or specify a file:
output = "tests/clarigen.ts"

# or disable:
# output = "clarigen.ts"
```

### `deno.outputs` {#denooutputs}

If you want to export multiple generated Deno types files (like for a monorepo), you can use the `outputs` array. Note that if `output` is present, then this is ignored.

```toml title="Clarigen.toml
[deno]
outputs = ["common/clarigen.ts", "packages/web/clarigen.ts"]
```

## `esm` {#esm}

The "ESM" output is for environments that utilize NPM (or yarn, pnpm, etc) packages. This mostly refers to Node.js or web projects.

### `esm.output` {#esmoutput}

Just like Deno, set where you'd like the generated code. You can specify a file or a directory.

To disable ESM generation, disable the `output` field

```toml title="Clarigen.toml"
[esm]
output = "common/clarigen.ts"

# or disable:
# output = "common/clarigen.ts"
```

### `esm.outputs` {#esmoutputs}

If you want to export multiple generated types files (like for a monorepo), you can use the `outputs` array. Note that if `output` is present, then this is ignored.

```toml title="Clarigen.toml
[esm]
outputs = ["common/clarigen.ts", "packages/web/clarigen.ts"]
```

### `esm.after` {#esmafter}

The code generated for ESM is not formatted, so it'll fail any linting you have. Use this field to specify a script you want ran after code is generated.

```toml title="Clarigen.toml"
[esm]
output = "src/clarigen.ts"
// highlight-next-line
after = "yarn prettier -w src/clarigen.ts"
```

## `docs` {#docs}

Clarigen can [automatically generate contract documentation](./documentation) for you.

### `docs.output` {#docsoutput}

Specify the folder where you'd like markdown files generated. A markdown file will be generated for each of your contracts, along with a `README.md` file.

```toml title="Clarigen.toml"
[docs]
# docs will be generated at `./docs/$file.md`
output = "docs"
```

### `docs.exclude` {#docsexclue}

By default, all contracts in `Clarinet.toml` are included in your docs. If you want to exclude certain contracts (such as traits and test helpers), you can use the `excludes` array.

Note that the values in `excludes` should be your contract names - not files.

If you have a `Clarinet.toml` like:

```toml
[contracts.extension-trait]
path = 'contracts/traits/extension-trait.clar'
```

Then to exclude that contract, you'd do:

```toml title="Clarigen.toml"
[docs]
exclude = ["extension-trait"]
```
