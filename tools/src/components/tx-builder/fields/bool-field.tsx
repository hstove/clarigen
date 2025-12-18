import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '@/hooks/form-context';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

interface BoolFieldProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

export function BoolField({ name, label, disabled }: BoolFieldProps) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, state => state.meta.errors);

  return (
    <Field orientation="horizontal">
      <ShadcnSwitch
        id={name}
        checked={field.state.value}
        onCheckedChange={checked => field.handleChange(checked)}
        onBlur={field.handleBlur}
        disabled={disabled}
      />
      <FieldLabel htmlFor={name} className="font-mono text-xs">
        {label ?? name}
      </FieldLabel>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors.map(e => (typeof e === 'string' ? e : e.message)).join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
