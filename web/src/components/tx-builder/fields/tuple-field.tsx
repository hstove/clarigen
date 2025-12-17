import type { ClarityAbiType } from '@clarigen/core';
import { useFieldContext, useFormContext } from '@/hooks/form-context';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';

interface TupleMember {
  name: string;
  type: ClarityAbiType;
}

interface TupleFieldProps {
  name: string;
  label?: string;
  members: readonly TupleMember[];
}

export function TupleField({ name, label, members }: TupleFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<Record<string, unknown>>();

  return (
    <FieldGroup className="border rounded-lg p-4">
      {label && <FieldLabel>{label}</FieldLabel>}
      {members.map((member) => (
        <form.Field key={member.name} name={`${field.name}.${member.name}` as never}>
          {() => (
            <ClarityField
              name={`${name}.${member.name}`}
              type={member.type}
              label={member.name}
            />
          )}
        </form.Field>
      ))}
    </FieldGroup>
  );
}
