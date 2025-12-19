import { useStore } from '@tanstack/react-form';
import type { ClarityAbiType } from '@clarigen/core';
import { useFieldContext } from '@/hooks/form-context';
import { useFieldFocusHandlers } from '@/hooks/use-focused-field';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

type BoolFieldProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  type: ClarityAbiType;
};

export function BoolField({ name, label, disabled, type }: BoolFieldProps) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const { onFocus } = useFieldFocusHandlers(name, type);

  return (
    <Field orientation="horizontal">
      <ShadcnSwitch
        checked={field.state.value}
        disabled={disabled}
        id={name}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(checked)}
        onFocus={onFocus}
      />
      <FieldLabel className="font-mono text-xs" htmlFor={name}>
        {label ?? name}
      </FieldLabel>
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
