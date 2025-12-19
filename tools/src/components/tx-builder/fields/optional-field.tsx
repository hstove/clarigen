import type { ClarityAbiType } from '@clarigen/core';
import { type AnyFieldApi, useStore } from '@tanstack/react-form';
import {
  fieldContext,
  useFieldContext,
  useFormContext,
} from '@/hooks/form-context';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';
import { getDefaultValueForType } from '@/lib/clarity-form-utils';

type OptionalFieldProps = {
  name: string;
  label?: string;
  innerType: ClarityAbiType;
  disabled?: boolean;
};

export function OptionalField({
  name,
  label,
  innerType,
  disabled,
}: OptionalFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<{ isNone: boolean; value: unknown }>();
  const isNone = useStore(field.store, (state) => state.value?.isNone ?? true);

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <ShadcnSwitch
          checked={!isNone}
          disabled={disabled}
          id={`${name}-toggle`}
          onCheckedChange={(checked) => {
            const currentValue = field.state.value?.value;
            const defaultValue = getDefaultValueForType(innerType);
            field.handleChange({
              isNone: !checked,
              value: currentValue ?? defaultValue,
            });
          }}
        />
        <FieldLabel className="font-mono text-xs" htmlFor={`${name}-toggle`}>
          {label ?? name} (optional)
        </FieldLabel>
      </Field>
      {!isNone && (
        <form.Field
          name={`${field.name}.value` as never}
          validators={getClarityValidators(innerType)}
        >
          {(valueField) => (
            <fieldContext.Provider value={valueField as unknown as AnyFieldApi}>
              <ClarityField
                disabled={disabled}
                name={`${name}.value`}
                type={innerType}
              />
            </fieldContext.Provider>
          )}
        </form.Field>
      )}
    </FieldGroup>
  );
}
