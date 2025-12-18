import {
  ClarityAbi,
  ClarityAbiArg,
  ClarityAbiFunction,
  ClarityAbiMap,
  ClarityAbiVariable,
} from '@clarigen/core';

export const FN_TYPES = ['read-only', 'public', 'private'] as const;

export const VAR_TYPES = ['map', 'data-var', 'constant'] as const;

type ClarityAbiItem = ClarityAbiFunction | ClarityAbiMap | ClarityAbiVariable;

type ClaridocItemType<T extends ClarityAbiItem> = {
  abi: T;
  comments: Comments;
  startLine: number;
  source: string[];
};

export type ClaridocFunction = ClaridocItemType<ClarityAbiFunction>;
export type ClaridocMap = ClaridocItemType<ClarityAbiMap>;
export type ClaridocVariable = ClaridocItemType<ClarityAbiVariable>;

export interface ClaridocItem {
  abi: ClarityAbiItem;
  comments: Comments;
  startLine: number;
  source: string[];
}
// export type ClaridocItem = ClaridocFunction | ClaridocMap | ClaridocVariable;

export interface Comments {
  params: Record<string, ClaridocParam>;
  text: string[];
}

export interface ClaridocContract {
  functions: ClaridocFunction[];
  maps: ClaridocMap[];
  variables: ClaridocVariable[];
  comments: string[];
}

export interface ClaridocParam {
  abi: ClarityAbiArg;
  comments: string[];
}

export function createContractDocInfo({
  contractSrc,
  abi,
}: {
  contractSrc: string;
  abi: ClarityAbi;
}): ClaridocContract {
  const lines = contractSrc.split('\n');
  let comments: string[] = [];
  let parensCount = 0;
  let currentFn: ClaridocItem | undefined;
  // const functions: ClaridocFunction[] = [];
  const contract: ClaridocContract = {
    comments: [],
    functions: [],
    variables: [],
    maps: [],
  };
  lines.forEach((line, lineNumber) => {
    // Are we processing a function?
    if (currentFn) {
      currentFn.source.push(line);
      parensCount = traceParens(line, parensCount);
      if (parensCount === 0) {
        // end of fn
        pushItem(contract, currentFn);
        // contract.functions.push(currentFn);
        currentFn = undefined;
      }
      return;
    }
    // Are we gathering comments?
    if (isComment(line)) {
      const comment = line.replace(/^\s*;;\s*/g, '');
      if (contract.comments.length === lineNumber) {
        // Top-level contract comments
        contract.comments.push(comment);
      } else {
        // Aggregate for a function
        comments.push(comment);
      }
      return;
    }

    // Is this the start of a fn?
    // const name = getFnName(line);
    const name = findItemNameFromLine(line);
    if (typeof name === 'undefined') {
      // Not a comment or fn start, clear comments.
      comments = [];
    } else {
      // New function found.
      // const abiFn = abi.functions.find((fn) => {
      //   return fn.name === name;
      // })
      const abiFn = findAbiItemByName(abi, name);
      if (!abiFn) {
        console.debug(`[claridoc]: Unable to find ABI for function \`${name}\`. Probably a bug.`);
        return;
      }
      parensCount = traceParens(line, 0);
      const metaComments = parseComments(comments, abiFn);
      currentFn = {
        abi: abiFn,
        comments: metaComments,
        startLine: lineNumber,
        source: [line],
      };
      if (parensCount === 0) {
        // end of fn - single line fn
        // contract.functions.push(currentFn);
        pushItem(contract, currentFn);
        currentFn = undefined;
      }
      comments = [];
    }
  });
  return contract;
}

function pushItem(contract: ClaridocContract, item: ClaridocItem) {
  if ('args' in item.abi) {
    contract.functions.push(item as ClaridocFunction);
  } else if ('key' in item.abi) {
    contract.maps.push(item as ClaridocMap);
  } else if ('access' in item.abi) {
    contract.variables.push(item as ClaridocVariable);
  }
}

function clarityNameMatcher(line: string) {
  return /[\w|\-|\?|\!]+/.exec(line);
}

function findItemNameFromLine(line: string): string | undefined {
  const fnType = FN_TYPES.find(type => {
    return line.startsWith(`(define-${type}`);
  });
  if (fnType) {
    const prefix = `(define-${fnType} (`;
    const startString = line.slice(prefix.length);
    const match = clarityNameMatcher(startString);
    if (!match) {
      console.debug(`[claridocs]: Unable to determine function name from line:\n  \`${line}\``);
      return;
    }
    return match[0];
  }
  for (const type of VAR_TYPES) {
    const prefix = `(define-${type} `;
    if (!line.startsWith(prefix)) continue;

    const startString = line.slice(prefix.length);
    const match = clarityNameMatcher(startString);
    if (!match) {
      console.debug(`[claridocs]: Unable to determine ${type} name from line:\n  \`${line}\``);
      return;
    }
    return match[0];
  }
  return undefined;
}

function findAbiItemByName(abi: ClarityAbi, name: string): ClarityAbiItem | undefined {
  const fn = abi.functions.find(fn => {
    return fn.name === name;
  });
  if (fn) return fn;
  const map = abi.maps.find(m => m.name === name);
  if (map) return map;
  const v = abi.variables.find(v => v.name === name);
  return v;
}

export function isComment(line: string) {
  return line.startsWith(';;');
}

export function getFnName(line: string) {
  const fnType = FN_TYPES.find(type => {
    return line.startsWith(`(define-${type}`);
  });
  if (typeof fnType === 'undefined') return;
  const prefix = `(define-${fnType} (`;
  const startString = line.slice(prefix.length);
  const match = clarityNameMatcher(startString);
  if (!match) {
    console.debug(`[claridocs]: Unable to determine function name from line:\n  \`${line}\``);
    return;
  }
  return match[0];
}

export function traceParens(line: string, count: number) {
  let newCount = count;
  line.split('').forEach(char => {
    if (char === '(') newCount++;
    if (char === ')') newCount--;
  });
  return newCount;
}

export function parseComments(comments: string[], abi: ClarityAbiItem): Comments {
  // const params: Record<string, ClaridocParam> = {};
  let curParam: string | undefined;
  // const newComments: string[] = [];
  const parsed: Comments = {
    text: [],
    params: {},
  };
  comments.forEach(line => {
    const paramMatches = /\s*@param\s([\w|\-]+)([;|-|\s]*)(.*)/.exec(line);

    if (paramMatches === null) {
      if (!curParam || line.trim() === '') {
        curParam = undefined;
        parsed.text.push(line);
      } else {
        parsed.params[curParam].comments.push(line);
      }
      return;
    }

    if (!('args' in abi)) return;
    const [_full, name, _separator, rest] = paramMatches;
    const arg = abi.args.find(arg => arg.name === name);
    if (!arg) {
      console.debug(`[claridocs]: Unable to find ABI for @param ${name}`);
      return;
    }
    curParam = name;
    parsed.params[curParam] = {
      abi: arg,
      comments: [rest],
    };
  });

  if ('args' in abi) {
    abi.args.forEach(arg => {
      if (!parsed.params[arg.name]) {
        parsed.params[arg.name] = {
          abi: arg,
          comments: [],
        };
      }
    });
  }

  return parsed;
}
