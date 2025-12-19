/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { type } from 'arktype';

const STORAGE_KEY = 'clarigen:visited:functions';
const MAX_ITEMS = 100;
const CURRENT_VERSION = 1 as const;

const VisitedFunction = type({
  contractId: 'string',
  functionName: 'string | null',
  network: 'string',
  lastVisited: 'number',
  'version?': `${CURRENT_VERSION}`,
});

export type VisitedFunction = typeof VisitedFunction.infer;

const VisitedFunctionsArraySchema = type(VisitedFunction, '[]');

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  const test = '__storage_test__';
  window.localStorage.setItem(test, test);
  window.localStorage.removeItem(test);
  return true;
}

function readVisited(): VisitedFunction[] {
  if (!isLocalStorageAvailable()) return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  const result = VisitedFunctionsArraySchema(parsed);
  if (result instanceof type.errors) {
    // Invalid data in storage, clear it and return empty
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
  return result;
}

function writeVisited(items: VisitedFunction[]): void {
  if (!isLocalStorageAvailable()) return;
  const result = VisitedFunctionsArraySchema(items);
  if (result instanceof type.errors) {
    throw new Error(`Invalid visited history data: ${result.summary}`);
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function getVisitedFunctions(): VisitedFunction[] {
  return readVisited();
}

export function addVisitedFunction(
  contractId: string,
  functionName: string | null,
  network: string
): void {
  if (!(contractId && network)) return;

  const visited = readVisited();
  const existingIndex = visited.findIndex(
    (v) =>
      v.contractId === contractId &&
      v.functionName === functionName &&
      v.network === network
  );

  if (existingIndex !== -1) {
    visited.splice(existingIndex, 1);
  }

  visited.unshift({
    contractId,
    functionName,
    network,
    lastVisited: Date.now(),
    version: CURRENT_VERSION,
  });

  writeVisited(visited.slice(0, MAX_ITEMS));
}

export function getVisitedContracts(): string[] {
  const visited = readVisited();
  const seen = new Set<string>();
  const contracts: string[] = [];

  for (const v of visited) {
    if (!seen.has(v.contractId)) {
      seen.add(v.contractId);
      contracts.push(v.contractId);
    }
  }

  return contracts;
}

export function clearVisitedHistory(): void {
  if (!isLocalStorageAvailable()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
