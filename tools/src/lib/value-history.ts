const CONTEXT_PREFIX = 'clarigen:history:';
const TYPE_PREFIX = 'clarigen:global:';

const MAX_CONTEXT_ITEMS = 10;
const MAX_TYPE_ITEMS = 20;

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function getStorageKey(prefix: string, ...parts: string[]): string {
  return prefix + parts.join(':');
}

function readHistory(key: string): string[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(key: string, values: string[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // localStorage full or unavailable - fail silently
  }
}

function addToHistory(key: string, value: string, maxItems: number): void {
  if (!value || value.trim() === '') return;

  const history = readHistory(key);
  const existingIndex = history.indexOf(value);
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }
  history.unshift(value);

  writeHistory(key, history.slice(0, maxItems));
}

export function getContextHistory(
  contractId: string,
  functionName: string,
  argName: string
): string[] {
  const key = getStorageKey(CONTEXT_PREFIX, contractId, functionName, argName);
  return readHistory(key);
}

export function addContextHistory(
  contractId: string,
  functionName: string,
  argName: string,
  value: string
): void {
  const key = getStorageKey(CONTEXT_PREFIX, contractId, functionName, argName);
  addToHistory(key, value, MAX_CONTEXT_ITEMS);
}

export function getTypeHistory(clarityType: string): string[] {
  const key = getStorageKey(TYPE_PREFIX, clarityType);
  return readHistory(key);
}

export function addTypeHistory(clarityType: string, value: string): void {
  const key = getStorageKey(TYPE_PREFIX, clarityType);
  addToHistory(key, value, MAX_TYPE_ITEMS);
}

export interface CombinedHistory {
  contextHistory: string[];
  typeHistory: string[];
}

export function getCombinedHistory(
  contractId: string,
  functionName: string,
  argName: string,
  clarityType: string
): CombinedHistory {
  const contextHistory = getContextHistory(contractId, functionName, argName);
  const typeHistory = getTypeHistory(clarityType);
  return { contextHistory, typeHistory };
}

export interface ArgToSave {
  name: string;
  type: string;
  value: string;
}

export function saveFormHistory(contractId: string, functionName: string, args: ArgToSave[]): void {
  for (const arg of args) {
    if (!arg.value || arg.value.trim() === '') continue;
    addContextHistory(contractId, functionName, arg.name, arg.value);
    addTypeHistory(arg.type, arg.value);
  }
}
