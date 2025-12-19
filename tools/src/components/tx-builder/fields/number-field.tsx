import { useStore } from '@tanstack/react-form';
import type { ClarityAbiType } from '@clarigen/core';
import { useFieldContext } from '@/hooks/form-context';
import { useFieldFocusHandlers } from '@/hooks/use-focused-field';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from '@/components/ui/field';

type NumberFieldProps = {
  name: string;
  label?: string;
  signed: boolean;
  disabled?: boolean;
  type: ClarityAbiType;
};

export function NumberField({
  name,
  label,
  signed,
  disabled,
  type,
}: NumberFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const { onFocus } = useFieldFocusHandlers(name, type, (value) =>
    field.handleChange(value)
  );

  return (
    <Field>
      <FieldLabel className="font-mono text-xs" htmlFor={name}>
        {label ?? name}
      </FieldLabel>
      <Input
        autoComplete="off"
        className="font-mono"
        disabled={disabled}
        id={name}
        inputMode="numeric"
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        onFocus={onFocus}
        placeholder={signed ? 'int' : 'uint'}
        value={field.state.value}
      />
      <FieldDescription className="font-mono">
        {signed ? 'Signed 128-bit integer' : 'Unsigned 128-bit integer'}
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors
            .map((e) => (typeof e === 'string' ? e : e.message))
            .join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
