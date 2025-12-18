import type { ClarityAbiType } from '@clarigen/core';
import { useStore } from '@tanstack/react-form';
import { fieldContext, useFieldContext, useFormContext } from '@/hooks/form-context';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';

interface ResponseFieldProps {
  name: string;
  label?: string;
  okType: ClarityAbiType;
  errType: ClarityAbiType;
  disabled?: boolean;
}

export function ResponseField({ name, label, okType, errType, disabled }: ResponseFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<{ isOk: boolean; ok: unknown; err: unknown }>();
  const isOk = useStore(field.store, state => state.value?.isOk ?? true);

  return (
    <FieldGroup>
      <FieldLabel className="font-mono text-xs">{label ?? name} (response)</FieldLabel>

      <div className="flex bg-muted p-1 rounded-md mb-2">
        <Button
          type="button"
          variant={isOk ? 'secondary' : 'ghost'}
          size="sm"
          className="flex-1 h-7 text-xs"
          onClick={() =>
            field.handleChange({
              ...field.state.value,
              isOk: true,
            } as any)
          }
          disabled={disabled}
        >
          Ok
        </Button>
        <Button
          type="button"
          variant={!isOk ? 'secondary' : 'ghost'}
          size="sm"
          className="flex-1 h-7 text-xs"
          onClick={() =>
            field.handleChange({
              ...field.state.value,
              isOk: false,
            } as any)
          }
          disabled={disabled}
        >
          Error
        </Button>
      </div>

      {isOk ? (
        <div className="mt-2 pl-4 border-l-2 border-primary/20">
          <form.Field name={`${field.name}.ok` as never} validators={getClarityValidators(okType)}>
            {okField => (
              <fieldContext.Provider value={okField}>
                <ClarityField name={`${name}.ok`} type={okType} disabled={disabled} />
              </fieldContext.Provider>
            )}
          </form.Field>
        </div>
      ) : (
        <div className="mt-2 pl-4 border-l-2 border-destructive/20">
          <form.Field
            name={`${field.name}.err` as never}
            validators={getClarityValidators(errType)}
          >
            {errField => (
              <fieldContext.Provider value={errField}>
                <ClarityField name={`${name}.err`} type={errType} disabled={disabled} />
              </fieldContext.Provider>
            )}
          </form.Field>
        </div>
      )}
    </FieldGroup>
  );
}
