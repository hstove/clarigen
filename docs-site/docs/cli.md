---
sidebar_label: CLI
---

import { Terminal } from '../src/components/Terminal';

# Clarigen CLI

The Clarigen CLI is the interface you'll use to generate Clarigen types. The CLI is a Deno project - so you'll need Deno installed in order to install it.

To install:

<Terminal>
deno install -qAfn clarigen https://deno.land/x/clarigen/cli.ts
</Terminal>

After being installed, you can run `clarigen` in your terminal.

## Commands {#commands}

### `clarigen` {#command-clarigen}

Running `clarigen` on its own will generate type files for you.

#### Watch mode {#watch-mode}

Running `clarigen --watch` will keep the process open and watch for specific file changes. When a file change is detected, your types will be re-generated. This is helpful for actively developing tests or an app.

The files watched are:

- `Clarigen.toml`
- `Clarinet.toml`
- `contracts/*.clar`

### `clarigen docs` {#command-docs}

Generate documentation from comments in your contracts. Check out the [documentation](./documentation) docs for more information.

### `clarigen init` {#command-init}

Generate a `Clarigen.toml` file.

### `clarigen upgrade` {#command-upgrade}

Update your locally installed version of the `clarigen` CLI.

Run `clarigen upgrade -l` to list available versions.

Run `clarigen upgrade --version $version` to install a specific version.

## Log levels {#log-levels}

To change the default logging, each command accepts either `--quiet` or `--verbose` flags, which changes the default log level used.
