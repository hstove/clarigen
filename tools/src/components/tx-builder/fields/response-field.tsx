import type { ClarityAbiType } from '@clarigen/core';
import { type AnyFieldApi, useStore } from '@tanstack/react-form';
import {
  fieldContext,
  useFieldContext,
  useFormContext,
} from '@/hooks/form-context';
import { FieldGroup, FieldLabel, Field } from '@/components/ui/field';
import { ClarityField } from '../clarity-field';
import { getClarityValidators } from '@/lib/clarity-validators';
import { cn } from '@/lib/utils';

type ResponseFieldProps = {
  name: string;
  label?: string;
  okType: ClarityAbiType;
  errType: ClarityAbiType;
  disabled?: boolean;
};

export function ResponseField({
  name,
  label,
  okType,
  errType,
  disabled,
}: ResponseFieldProps) {
  const form = useFormContext();
  const field = useFieldContext<{ isOk: boolean; ok: unknown; err: unknown }>();
  const isOk = useStore(field.store, (state) => state.value?.isOk ?? true);

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldLabel className="font-mono text-xs">{label ?? name}</FieldLabel>
        <div className="flex border border-border font-mono text-xs">
          <button
            className={cn(
              'px-2 py-0.5 transition-colors',
              isOk
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:bg-muted/50',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={disabled}
            onClick={() =>
              field.handleChange({
                ...field.state.value,
                isOk: true,
                // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
              } as any)
            }
            type="button"
          >
            ok
          </button>
          <button
            className={cn(
              'border-border border-l px-2 py-0.5 transition-colors',
              isOk
                ? 'text-muted-foreground hover:bg-muted/50'
                : 'bg-destructive/20 text-destructive',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            disabled={disabled}
            onClick={() =>
              field.handleChange({
                ...field.state.value,
                isOk: false,
                // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
              } as any)
            }
            type="button"
          >
            err
          </button>
        </div>
      </Field>

      {isOk ? (
        <form.Field
          name={`${field.name}.ok` as never}
          validators={getClarityValidators(okType)}
        >
          {(okField) => (
            <fieldContext.Provider value={okField as unknown as AnyFieldApi}>
              <ClarityField
                disabled={disabled}
                name={`${name}.ok`}
                type={okType}
              />
            </fieldContext.Provider>
          )}
        </form.Field>
      ) : (
        <form.Field
          name={`${field.name}.err` as never}
          validators={getClarityValidators(errType)}
        >
          {(errField) => (
            <fieldContext.Provider value={errField as unknown as AnyFieldApi}>
              <ClarityField
                disabled={disabled}
                name={`${name}.err`}
                type={errType}
              />
            </fieldContext.Provider>
          )}
        </form.Field>
      )}
    </FieldGroup>
  );
}
