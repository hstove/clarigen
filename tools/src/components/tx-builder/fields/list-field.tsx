import type { ClarityAbiType } from '@clarigen/core';
import { useStore } from '@tanstack/react-form';
import { fieldContext, useFieldContext, useFormContext } from '@/hooks/form-context';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';

interface ListFieldProps {
  name: string;
  label?: string;
  itemType: ClarityAbiType;
  maxLength: number;
  disabled?: boolean;
}

export function ListField({ name, label, itemType, maxLength, disabled }: ListFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<unknown[]>();
  const items = useStore(field.store, state => state.value ?? []);

  const addItem = () => {
    if (items.length < maxLength) {
      field.pushValue(getDefaultValue(itemType));
    }
  };

  const removeItem = (index: number) => {
    field.removeValue(index);
  };

  return (
    <FieldGroup className="border border-border p-4 bg-muted/10">
      <div className="flex items-center justify-between">
        <FieldLabel className="font-mono text-xs">{label ?? name}</FieldLabel>
        {!disabled && (
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={addItem}
            disabled={items.length >= maxLength}
          >
            + add
          </Button>
        )}
      </div>
      <FieldDescription className="font-mono">
        List of {maxLength} items ({items.length}/{maxLength})
      </FieldDescription>

      {items.map((_, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-1">
            <form.Field
              name={`${field.name}[${index}]` as never}
              validators={getClarityValidators(itemType)}
            >
              {itemField => (
                <fieldContext.Provider value={itemField}>
                  <ClarityField
                    name={`${name}[${index}]`}
                    type={itemType}
                    label={`[${index}]`}
                    disabled={disabled}
                  />
                </fieldContext.Provider>
              )}
            </form.Field>
          </div>
          {!disabled && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => removeItem(index)}
              className="mt-6"
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
