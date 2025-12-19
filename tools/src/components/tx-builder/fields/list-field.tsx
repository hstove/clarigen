import type { ClarityAbiType } from '@clarigen/core';
import { type AnyFieldApi, useStore } from '@tanstack/react-form';
import {
  fieldContext,
  useFieldContext,
  useFormContext,
} from '@/hooks/form-context';
import { Button } from '@/components/ui/button';
import {
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';

type ListFieldProps = {
  name: string;
  label?: string;
  itemType: ClarityAbiType;
  maxLength: number;
  disabled?: boolean;
};

export function ListField({
  name,
  label,
  itemType,
  maxLength,
  disabled,
}: ListFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<unknown[]>();
  const items = useStore(field.store, (state) => state.value ?? []);

  const addItem = () => {
    if (items.length < maxLength) {
      field.pushValue(getDefaultValue(itemType));
    }
  };

  const removeItem = (index: number) => {
    field.removeValue(index);
  };

  return (
    <FieldGroup className="border border-border bg-muted/10 p-4">
      <div className="flex items-center justify-between">
        <FieldLabel className="font-mono text-xs">{label ?? name}</FieldLabel>
        {!disabled && (
          <Button
            disabled={items.length >= maxLength}
            onClick={addItem}
            size="xs"
            type="button"
            variant="outline"
          >
            + add
          </Button>
        )}
      </div>
      <FieldDescription className="font-mono">
        List of {maxLength} items ({items.length}/{maxLength})
      </FieldDescription>

      {items.map((_, index) => (
        <div className="flex items-start gap-2" key={index}>
          <div className="flex-1">
            <form.Field
              name={`${field.name}[${index}]` as never}
              validators={getClarityValidators(itemType)}
            >
              {(itemField) => (
                <fieldContext.Provider
                  value={itemField as unknown as AnyFieldApi}
                >
                  <ClarityField
                    disabled={disabled}
                    label={`[${index}]`}
                    name={`${name}[${index}]`}
                    type={itemType}
                  />
                </fieldContext.Provider>
              )}
            </form.Field>
          </div>
          {!disabled && (
            <Button
              className="mt-6"
              onClick={() => removeItem(index)}
              size="xs"
              type="button"
              variant="ghost"
            >
              ×
            </Button>
          )}
        </div>
      ))}
    </FieldGroup>
  );
}

function getDefaultValue(type: ClarityAbiType): unknown {
  if (typeof type === 'string') {
    // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
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
      obj[member.name] = getDefaultValue(member.type);
    }
    return obj;
  }
  return '';
}
