import { useQueryState, createParser } from 'nuqs';
import { type PostConditionsState, DEFAULT_POST_CONDITIONS_STATE } from '@/lib/post-conditions';

const parseAsPostConditions = createParser({
  parse: (value: string): PostConditionsState | null => {
    if (!value) return DEFAULT_POST_CONDITIONS_STATE;
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null) {
        return {
          mode: parsed.mode || 'deny',
          conditions: Array.isArray(parsed.conditions) ? parsed.conditions : [],
        };
      }
      return DEFAULT_POST_CONDITIONS_STATE;
    } catch {
      return DEFAULT_POST_CONDITIONS_STATE;
    }
  },
  serialize: (value: PostConditionsState): string => {
    // Don't serialize if it's the default state
    if (value.mode === 'deny' && value.conditions.length === 0) {
      return '';
    }
    return JSON.stringify(value);
  },
  eq: (a: PostConditionsState, b: PostConditionsState) => {
    return JSON.stringify(a) === JSON.stringify(b);
  },
});

export function usePostConditionsUrlState() {
  const [postConditions, setPostConditions] = useQueryState(
    'pcs',
    parseAsPostConditions.withDefault(DEFAULT_POST_CONDITIONS_STATE)
  );

  return {
    postConditions,
    setPostConditions,
  };
}
