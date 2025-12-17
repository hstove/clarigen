# Clarigen Web

This is a web application for general helper functions and utilities for the Stacks blockchain.

Clarigen is a tool to build type-safe code that interfacts with Clarity smart contracts. This project is in the Clarigen monorepo.

## Forms

We use `@tanstack/react-form` with `arktype` for validation. Forms follow a consistent pattern:

1. **Schema definition** in @src/lib/form-options.ts:

   - Use `arktype` `type()` function to define validation schema
   - Create `formOptions()` with defaultValues and validators
   - Optional fields use `'field?': 'type'` syntax
   - Example: `'key?': 'string'` for optional key field

2. **Component implementation**:
   - Use `useAppForm()` hook (from @src/hooks/form.ts) with form options and onSubmit handler
   - Form fields use `<form.Field name="fieldName">` with children render prop
   - Access field state via `field.state.value`, `field.state.meta.errors`, etc.
   - Use form composition when possible, ie `<form.AppField>` with child renderer

Example of using the `TextField` component in a form:

```tsx
<group.AppField name="artist">
  {field => <field.TextField label="Artist" placeholder="Enter artist name" required />}
</group.AppField>
```

`SubscribeButton` must be wrapped inside `AppForm`:

```tsx
<form.AppForm>
  <form.SubscribeButton label="Create Page" />
</form.AppForm>
```

## Memory

- The dev server is almost always running on `localhost:3000`.
- You can use the playwriter tool when you need to debug the app.
  - If you're debugging the tx builder, try this route for a good complex example: http://localhost:3000/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester/complex-args
  - A good "simple" example: http://localhost:3000/tx/mainnet/SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-abtc/transfer
- When you've made some progress on the overall "tx builder" feature, make sure you update the `web/history/tx-builder-progress.md` file to reflect your changes.
  - Also, if you need that context, feel free to read it!
