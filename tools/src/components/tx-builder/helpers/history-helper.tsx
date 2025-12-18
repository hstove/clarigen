import type { FocusedField } from '@/hooks/use-focused-field';
import { useValueHistory } from '@/hooks/use-value-history';
import { getTypeString } from '@clarigen/core';

interface HistoryHelperProps {
  contractId: string;
  functionName: string;
  field: FocusedField;
}

function HistoryValueButton({ value, onApply }: { value: string; onApply: (v: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onApply(value)}
      className="w-full text-left px-2 py-1.5 font-mono text-xs bg-muted/30 hover:bg-muted/50 border border-border truncate transition-colors"
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
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        {title}
      </p>
      <div className="space-y-1">
        {values.map((value, index) => (
          <HistoryValueButton key={`${value}-${index}`} value={value} onApply={onApply} />
        ))}
      </div>
    </div>
  );
}

export function HistoryHelper({ contractId, functionName, field }: HistoryHelperProps) {
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
  const filteredTypeHistory = typeHistory.filter(v => !contextSet.has(v));

  const hasHistory = contextHistory.length > 0 || filteredTypeHistory.length > 0;

  if (!hasHistory) {
    return (
      <p className="text-xs text-muted-foreground italic">
        No recent values. Values are saved when you submit the form.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <HistorySection title="this field" values={contextHistory} onApply={handleApply} />
      <HistorySection
        title={`other ${clarityType}`}
        values={filteredTypeHistory}
        onApply={handleApply}
      />
    </div>
  );
}
