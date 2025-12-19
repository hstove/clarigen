import { useState, useCallback, useEffect } from 'react';
import { getCombinedHistory, type CombinedHistory } from '@/lib/value-history';

export type UseValueHistoryOptions = {
  contractId: string;
  functionName: string;
  argName: string;
  clarityType: string;
};

export type UseValueHistoryReturn = {
  contextHistory: string[];
  typeHistory: string[];
  refresh: () => void;
};

export function useValueHistory(
  options: UseValueHistoryOptions
): UseValueHistoryReturn {
  const { contractId, functionName, argName, clarityType } = options;

  const [history, setHistory] = useState<CombinedHistory>({
    contextHistory: [],
    typeHistory: [],
  });

  const refresh = useCallback(() => {
    if (typeof window === 'undefined') return;
    const combined = getCombinedHistory(
      contractId,
      functionName,
      argName,
      clarityType
    );
    setHistory(combined);
  }, [contractId, functionName, argName, clarityType]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    contextHistory: history.contextHistory,
    typeHistory: history.typeHistory,
    refresh,
  };
}
