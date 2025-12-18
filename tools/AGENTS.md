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
