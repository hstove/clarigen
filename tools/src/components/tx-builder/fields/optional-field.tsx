import type { ClarityAbiType } from '@clarigen/core';
import { useStore } from '@tanstack/react-form';
import { fieldContext, useFieldContext, useFormContext } from '@/hooks/form-context';
import { Switch as ShadcnSwitch } from '@/components/ui/switch';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';

interface OptionalFieldProps {
  name: string;
  label?: string;
  innerType: ClarityAbiType;
  disabled?: boolean;
}

function getDefaultValueForType(type: ClarityAbiType): unknown {
  if (typeof type === 'string') {
    switch (type) {
      case 'bool':
        return false;
      case 'uint128':
      case 'int128':
      case 'principal':
      case 'trait_reference':
        return '';
      case 'none':
        return null;
    }
  }
  if ('buffer' in type) return '';
  if ('string-ascii' in type) return '';
  if ('string-utf8' in type) return '';
  if ('optional' in type) return { isNone: true, value: null };
  if ('list' in type) return [];
  if ('tuple' in type) {
    const obj: Record<string, unknown> = {};
    for (const member of type.tuple) {
      obj[member.name] = getDefaultValueForType(member.type);
    }
    return obj;
  }
  return '';
}

export function OptionalField({ name, label, innerType, disabled }: OptionalFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<{ isNone: boolean; value: unknown }>();
  const isNone = useStore(field.store, state => state.value?.isNone ?? true);

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <ShadcnSwitch
          id={`${name}-toggle`}
          checked={!isNone}
          onCheckedChange={checked => {
            const currentValue = field.state.value?.value;
            const defaultValue = getDefaultValueForType(innerType);
            field.handleChange({
              isNone: !checked,
              value: currentValue ?? defaultValue,
            });
          }}
          disabled={disabled}
        />
        <FieldLabel htmlFor={`${name}-toggle`} className="font-mono text-xs">
          {label ?? name} (optional)
        </FieldLabel>
      </Field>
      {!isNone && (
        <form.Field name={`${field.name}.value` as never}>
          {valueField => (
            <fieldContext.Provider value={valueField}>
              <ClarityField name={`${name}.value`} type={innerType} disabled={disabled} />
            </fieldContext.Provider>
          )}
        </form.Field>
      )}
    </FieldGroup>
  );
}
