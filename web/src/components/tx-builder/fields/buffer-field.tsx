import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '@/hooks/form-context';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface BufferFieldProps {
  name: string;
  label?: string;
  maxLength: number;
}

export function BufferField({ name, label, maxLength }: BufferFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const hexValue = field.state.value ?? '';
  const normalized = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
  const byteLength = Math.floor(normalized.length / 2);

  return (
    <Field>
      <FieldLabel htmlFor={name} className="font-mono text-xs">
        {label ?? name}
      </FieldLabel>
      <Input
        id={name}
        value={field.state.value}
        placeholder="0x... or hex bytes"
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="font-mono"
      />
      <FieldDescription className="font-mono">
        Hex-encoded buffer, max {maxLength} bytes ({byteLength}/{maxLength})
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError className="font-mono">
          {errors.map((e) => (typeof e === 'string' ? e : e.message)).join(', ')}
        </FieldError>
      )}
    </Field>
  );
}
