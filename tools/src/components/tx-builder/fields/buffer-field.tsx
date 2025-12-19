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

type BufferFieldProps = {
  name: string;
  label?: string;
  maxLength: number;
  disabled?: boolean;
  type: ClarityAbiType;
};

export function BufferField({
  name,
  label,
  maxLength,
  disabled,
  type,
}: BufferFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const { onFocus } = useFieldFocusHandlers(name, type);

  const hexValue = field.state.value ?? '';
  const normalized = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
  const byteLength = Math.floor(normalized.length / 2);

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
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        onFocus={onFocus}
        placeholder="0x... or hex bytes"
        value={field.state.value}
      />
      <FieldDescription className="font-mono">
        Hex-encoded buffer, max {maxLength} bytes ({byteLength}/{maxLength})
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
