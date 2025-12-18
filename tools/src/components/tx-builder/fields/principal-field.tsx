import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '@/hooks/form-context';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface PrincipalFieldProps {
  name: string;
  label?: string;
  requireContract?: boolean;
  disabled?: boolean;
}

export function PrincipalField({ name, label, requireContract, disabled }: PrincipalFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);

  return (
    <Field>
      <FieldLabel htmlFor={name} className="font-mono text-xs">
        {label ?? name}
      </FieldLabel>
      <Input
        id={name}
        value={field.state.value}
        placeholder={requireContract ? 'SP123...ABC.contract-name' : 'SP123...ABC'}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        className="font-mono"
        disabled={disabled}
      />
      <FieldDescription className="font-mono">
        {requireContract
          ? 'Contract principal (address.contract-name)'
          : 'Stacks address (SP... or ST...)'}
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors.map(e => (typeof e === 'string' ? e : e.message)).join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
