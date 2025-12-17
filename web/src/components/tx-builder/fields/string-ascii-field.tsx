import { useStore } from '@tanstack/react-form';
import { useFieldContext } from '@/hooks/form-context';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

interface StringAsciiFieldProps {
  name: string;
  label?: string;
  maxLength: number;
}

export function StringAsciiField({ name, label, maxLength }: StringAsciiFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const currentLength = field.state.value?.length ?? 0;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label ?? name}</FieldLabel>
      <Input
        id={name}
        value={field.state.value}
        placeholder="ASCII string"
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        maxLength={maxLength}
      />
      <FieldDescription>
        ASCII only, max {maxLength} characters ({currentLength}/{maxLength})
      </FieldDescription>
      {field.state.meta.isTouched && errors.length > 0 && (
        <FieldError>{errors.map((e) => (typeof e === 'string' ? e : e.message)).join(', ')}</FieldError>
      )}
    </Field>
  );
}
