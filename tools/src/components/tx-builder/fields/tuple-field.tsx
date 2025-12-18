import type { ClarityAbiType } from '@clarigen/core';
import { fieldContext, useFieldContext, useFormContext } from '@/hooks/form-context';
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
  disabled?: boolean;
}

export function TupleField({ name, label, members, disabled }: TupleFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<Record<string, unknown>>();

  return (
    <FieldGroup className="border border-border p-4 bg-muted/10">
      {label && <FieldLabel className="font-mono text-xs">{label}</FieldLabel>}
      {members.map(member => (
        <form.Field key={member.name} name={`${field.name}.${member.name}` as never}>
          {memberField => (
            <fieldContext.Provider value={memberField}>
              <ClarityField
                name={`${name}.${member.name}`}
                type={member.type}
                label={member.name}
                disabled={disabled}
              />
            </fieldContext.Provider>
          )}
        </form.Field>
      ))}
    </FieldGroup>
  );
}
