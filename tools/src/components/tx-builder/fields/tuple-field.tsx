import type { ClarityAbiType } from '@clarigen/core';
import {
  fieldContext,
  useFieldContext,
  useFormContext,
} from '@/hooks/form-context';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';
import type { AnyFieldApi } from '@tanstack/react-form';

type TupleMember = {
  name: string;
  type: ClarityAbiType;
};

type TupleFieldProps = {
  name: string;
  label?: string;
  members: readonly TupleMember[];
  disabled?: boolean;
};

export function TupleField({
  name,
  label,
  members,
  disabled,
}: TupleFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<Record<string, unknown>>();

  return (
    <FieldGroup className="border border-border bg-muted/10 p-4">
      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {label && <FieldLabel className="font-mono text-xs">{label}</FieldLabel>}
      {members.map((member) => (
        <form.Field
          key={member.name}
          name={`${field.name}.${member.name}` as never}
          validators={getClarityValidators(member.type)}
        >
          {(memberField) => (
            <fieldContext.Provider
              value={memberField as unknown as AnyFieldApi}
            >
              <ClarityField
                disabled={disabled}
                label={member.name}
                name={`${name}.${member.name}`}
                type={member.type}
              />
            </fieldContext.Provider>
          )}
        </form.Field>
      ))}
    </FieldGroup>
  );
}
