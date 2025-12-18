import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';
import type { ClarityAbiType } from '@clarigen/core';

export interface FocusedField {
  name: string;
  type: ClarityAbiType;
  setValue?: (value: string) => void;
}

interface FocusedFieldContextValue {
  focusedField: FocusedField | null;
  setFocusedField: (field: FocusedField | null) => void;
}

const FocusedFieldContext = createContext<FocusedFieldContextValue | null>(null);

export function FocusedFieldProvider({ children }: { children: ReactNode }) {
  const [focusedField, setFocusedField] = useState<FocusedField | null>(null);

  return (
    <FocusedFieldContext.Provider value={{ focusedField, setFocusedField }}>
      {children}
    </FocusedFieldContext.Provider>
  );
}

export function useFocusedField() {
  const context = useContext(FocusedFieldContext);
  if (!context) {
    throw new Error('useFocusedField must be used within a FocusedFieldProvider');
  }
  return context;
}

export function useFieldFocusHandlers(
  name: string,
  type: ClarityAbiType,
  setValue?: (value: string) => void
) {
  const { setFocusedField } = useFocusedField();

  const onFocus = useCallback(() => {
    setFocusedField({ name, type, setValue });
  }, [setFocusedField, name, type, setValue]);

  return { onFocus };
}
