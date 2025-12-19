import { useCallback, useEffect, useState } from 'react';
import {
  clearVisitedHistory,
  getVisitedContracts,
  getVisitedFunctions,
  type VisitedFunction,
} from '@/lib/visited-history';

export type UseVisitedHistoryReturn = {
  visitedFunctions: VisitedFunction[];
  visitedContracts: string[];
  refresh: () => void;
  clear: () => void;
};

export function useVisitedHistory(): UseVisitedHistoryReturn {
  const [visitedFunctions, setVisitedFunctions] = useState<VisitedFunction[]>(
    []
  );
  const [visitedContracts, setVisitedContracts] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setVisitedFunctions(getVisitedFunctions());
    setVisitedContracts(getVisitedContracts());
  }, []);

  const clear = useCallback(() => {
    clearVisitedHistory();
    refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    visitedFunctions,
    visitedContracts,
    refresh,
    clear,
  };
}
