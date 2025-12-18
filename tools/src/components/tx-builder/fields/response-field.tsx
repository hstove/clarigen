import type { ClarityAbiType } from '@clarigen/core';
import { useStore } from '@tanstack/react-form';
import { fieldContext, useFieldContext, useFormContext } from '@/hooks/form-context';
import { FieldGroup, FieldLabel, Field } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';
import { cn } from '@/lib/utils';

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
      <Field orientation="horizontal">
        <FieldLabel className="font-mono text-xs">{label ?? name}</FieldLabel>
        <div className="flex border border-border font-mono text-xs">
          <button
            type="button"
            className={cn(
              'px-2 py-0.5 transition-colors',
              isOk ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted/50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() =>
              field.handleChange({
                ...field.state.value,
                isOk: true,
              } as any)
            }
            disabled={disabled}
          >
            ok
          </button>
          <button
            type="button"
            className={cn(
              'px-2 py-0.5 border-l border-border transition-colors',
              !isOk
                ? 'bg-destructive/20 text-destructive'
                : 'text-muted-foreground hover:bg-muted/50',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() =>
              field.handleChange({
                ...field.state.value,
                isOk: false,
              } as any)
            }
            disabled={disabled}
          >
            err
          </button>
        </div>
      </Field>

      {isOk ? (
        <form.Field name={`${field.name}.ok` as never} validators={getClarityValidators(okType)}>
          {okField => (
            <fieldContext.Provider value={okField}>
              <ClarityField name={`${name}.ok`} type={okType} disabled={disabled} />
            </fieldContext.Provider>
          )}
        </form.Field>
      ) : (
        <form.Field name={`${field.name}.err` as never} validators={getClarityValidators(errType)}>
          {errField => (
            <fieldContext.Provider value={errField}>
              <ClarityField name={`${name}.err`} type={errType} disabled={disabled} />
            </fieldContext.Provider>
          )}
        </form.Field>
      )}
    </FieldGroup>
  );
}
