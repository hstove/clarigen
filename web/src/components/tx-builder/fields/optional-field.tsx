import type { ClarityAbiType } from '@clarigen/core';
import { useStore } from '@tanstack/react-form';
import { useFieldContext, useFormContext } from '@/hooks/form-context';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';

interface OptionalFieldProps {
  name: string;
  label?: string;
  innerType: ClarityAbiType;
}

export function OptionalField({ name, label, innerType }: OptionalFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<{ isNone: boolean; value: unknown }>();
  const isNone = useStore(field.store, (state) => state.value?.isNone ?? true);

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <ShadcnSwitch
          id={`${name}-toggle`}
          checked={!isNone}
          onCheckedChange={(checked) => {
            field.handleChange({
              isNone: !checked,
              value: field.state.value?.value,
            });
          }}
        />
        <FieldLabel htmlFor={`${name}-toggle`}>{label ?? name} (optional)</FieldLabel>
      </Field>
      {!isNone && (
        <form.Field name={`${field.name}.value` as never}>
          {() => <ClarityField name={`${name}.value`} type={innerType} />}
        </form.Field>
      )}
    </FieldGroup>
  );
}
