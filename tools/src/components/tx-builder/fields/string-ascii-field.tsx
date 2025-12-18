import { useStore } from '@tanstack/react-form';
import type { ClarityAbiType } from '@clarigen/core';
import { useFieldContext } from '@/hooks/form-context';
import { useFieldFocusHandlers } from '@/hooks/use-focused-field';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface StringAsciiFieldProps {
  name: string;
  label?: string;
  maxLength: number;
  disabled?: boolean;
  type: ClarityAbiType;
}

export function StringAsciiField({
  name,
  label,
  maxLength,
  disabled,
  type,
}: StringAsciiFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);
  const { onFocus } = useFieldFocusHandlers(name, type);
  const currentLength = field.state.value?.length ?? 0;

  return (
    <Field>
      <FieldLabel htmlFor={name} className="font-mono text-xs">
        {label ?? name}
      </FieldLabel>
      <Input
        id={name}
        value={field.state.value}
        placeholder="ASCII string"
        autoComplete="off"
        onBlur={field.handleBlur}
        onFocus={onFocus}
        onChange={e => field.handleChange(e.target.value)}
        maxLength={maxLength}
        className="font-mono"
        disabled={disabled}
      />
      <FieldDescription className="font-mono">
        ASCII only, max {maxLength} characters ({currentLength}/{maxLength})
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors.map(e => (typeof e === 'string' ? e : e.message)).join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
