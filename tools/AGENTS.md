# Clarigen Web Tools

Web application for Stacks blockchain utilities. Part of the Clarigen monorepo.

## Key Features

- **TX Builder** (`/tx/:network/:contract/:function`) - Dynamic form builder for contract calls. See [TX-BUILDER.md](./TX-BUILDER.md) for architecture details.

## Forms

We use `@tanstack/react-form` with `arktype` for validation:

```tsx
// Schema in @src/lib/form-options.ts
const schema = type({ name: 'string', 'key?': 'string' });

// Component
const form = useAppForm({ defaultValues, onSubmit });
<form.AppField name="artist">
  {field => <field.TextField label="Artist" />}
</form.AppField>

// Submit button must be inside AppForm
<form.AppForm>
  <form.SubscribeButton label="Submit" />
</form.AppForm>
```

## Memory

- Dev server: `localhost:2527`
- Server logs: `tail -n 100 tmp/dev-server.log`
- UI design: See `./UI-DESIGN.md`
- Debugging: Use playwriter tool to interact with the running app
- For debugging, these are some good paths to try:
  - Complex tx builder: http://localhost:2527/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.tester/complex-args
  - Simple tx builder: http://localhost:2527/tx/mainnet/SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-abtc/transfer
  - Submitted tx with a failure: http://localhost:2527/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.burn-from-contract/burn-from-contract?amount=5000000&native-domain=0&native-recipient=0x00000000000000000000000027af410f8d787a46c71c10d6b16781c8d07d73eb&txid=0x4cc9af7aa781a0014c2d13754733aea397b0b5a78e682b6e11faacac10f82052
  - Submitted tx with a success: http://localhost:2527/tx/testnet/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.burn-from-contract/burn-from-contract?amount=5000000&native-domain=0&native-recipient=0x00000000000000000000000027af410f8d787a46c71c10d6b16781c8d07d73eb&txid=06da92a18b580cd9ab146463adfaa01747fc55679fe4bbd1d59530e06726a20f
