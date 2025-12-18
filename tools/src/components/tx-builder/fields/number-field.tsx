import { useStore } from '@tanstack/react-form';
import type { ClarityAbiType } from '@clarigen/core';
import { useFieldContext } from '@/hooks/form-context';
import { useFieldFocusHandlers } from '@/hooks/use-focused-field';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface NumberFieldProps {
  name: string;
  label?: string;
  signed: boolean;
  disabled?: boolean;
  type: ClarityAbiType;
}

export function NumberField({ name, label, signed, disabled, type }: NumberFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);
  const { onFocus } = useFieldFocusHandlers(name, type, value => field.handleChange(value));

  return (
    <Field>
      <FieldLabel htmlFor={name} className="font-mono text-xs">
        {label ?? name}
      </FieldLabel>
      <Input
        id={name}
        value={field.state.value}
        placeholder={signed ? 'int' : 'uint'}
        autoComplete="off"
        onBlur={field.handleBlur}
        onFocus={onFocus}
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
