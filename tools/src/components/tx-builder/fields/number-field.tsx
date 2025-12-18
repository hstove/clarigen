import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '@/hooks/form-context';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface NumberFieldProps {
  name: string;
  label?: string;
  signed: boolean;
  disabled?: boolean;
}

export function NumberField({ name, label, signed, disabled }: NumberFieldProps) {
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
        placeholder={signed ? 'int' : 'uint'}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        inputMode="numeric"
        className="font-mono"
        disabled={disabled}
      />
      <FieldDescription className="font-mono">
        {signed ? 'Signed 128-bit integer' : 'Unsigned 128-bit integer'}
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors.map(e => (typeof e === 'string' ? e : e.message)).join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
