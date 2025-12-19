import type { FocusedField } from '@/hooks/use-focused-field';
import { useValueHistory } from '@/hooks/use-value-history';
import { getTypeString } from '@clarigen/core';

type HistoryHelperProps = {
  contractId: string;
  functionName: string;
  field: FocusedField;
};

function HistoryValueButton({
  value,
  onApply,
}: {
  value: string;
  onApply: (v: string) => void;
}) {
  return (
    <button
      className="w-full truncate border border-border bg-muted/30 px-2 py-1.5 text-left font-mono text-xs transition-colors hover:bg-muted/50"
      onClick={() => onApply(value)}
      type="button"
    >
      {value}
    </button>
  );
}

function HistorySection({
  title,
  values,
  onApply,
}: {
  title: string;
  values: string[];
  onApply: (v: string) => void;
}) {
  if (values.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
        {title}
      </p>
      <div className="space-y-1">
        {values.map((value, index) => (
          <HistoryValueButton
            key={`${value}-${index}`}
            onApply={onApply}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}

export function HistoryHelper({
  contractId,
  functionName,
  field,
}: HistoryHelperProps) {
  const clarityType = getTypeString(field.type);
  const { contextHistory, typeHistory } = useValueHistory({
    contractId,
    functionName,
    argName: field.name,
    clarityType,
  });

  const handleApply = (value: string) => {
    field.setValue?.(value);
  };

  // Deduplicate type history - remove values already in context history
  const contextSet = new Set(contextHistory);
  const filteredTypeHistory = typeHistory.filter((v) => !contextSet.has(v));

  const hasHistory =
    contextHistory.length > 0 || filteredTypeHistory.length > 0;

  if (!hasHistory) {
    return (
      <p className="text-muted-foreground text-xs italic">
        No recent values. Values are saved when you submit the form.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <HistorySection
        onApply={handleApply}
        title="this field"
        values={contextHistory}
      />
      <HistorySection
        onApply={handleApply}
        title={`other ${clarityType}`}
        values={filteredTypeHistory}
      />
    </div>
  );
}
