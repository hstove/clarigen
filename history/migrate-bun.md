# Migration to Bun and Ultracite

## Goal

Migrate the Clarigen project from PNPM to Bun, and switch from ESLint/Prettier to Biome (via Ultracite).

## Bun Migration

- Replace `pnpm` with `bun`.
- **Important Gotcha**: `bun test` uses Bun's built-in test runner. This project uses Vitest.
  - Action: Replace all `bun test` invocations with `bun run test`.
- **Important Gotcha**: `bun build` uses Bun's built-in bundler.
  - Action: Replace all `bun build` invocations with `bun run build` to use the script in `package.json`.

## Linting and Formatting (Ultracite)

- Migrate from ESLint and Prettier to Biome.
- Use **Ultracite** for configuration.
- **Important**: Configure Biome / TypeScript to **ignore/silence** errors or warnings for unused variables and imports. These should not trigger any LSP alerts.
- Reference: [Ultracite Introduction](https://www.ultracite.ai/introduction)

## Code Cleanup

- Configure the project to silent unused variable/import warnings.
- This prevents downstream LSP errors that interfere with agent editing.

## Tasks

1. Initialize Bun (`bun install`).
2. Remove `pnpm-lock.yaml`.
3. Update CI/CD workflows to use Bun.
4. Update `package.json` scripts to use `bun run` for `test` and `build`.
5. Install and configure Ultracite/Biome.
6. Remove ESLint and Prettier configurations and dependencies.
7. Run linting/formatting and ensure unused code warnings are silenced in config.
8. Update CI tasks to use `bun`
9. Basically ensure any invocate of `pnpm` is replaced with `bun`.
