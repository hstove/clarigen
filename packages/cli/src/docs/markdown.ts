import { Session, SessionContract } from '../session';
import { getContractName } from '@clarigen/core';
import {
  ClaridocContract,
  ClaridocFunction,
  ClaridocItem,
  ClaridocMap,
  ClaridocParam,
  ClaridocVariable,
  // Comments,
  createContractDocInfo,
} from './index';
import { basename } from 'path';
import { getTypeString } from '@stacks/transactions';
import { sortContracts } from '../utils';

export function generateMarkdown({
  contract,
  contractFile,
}: {
  contract: SessionContract;
  contractFile?: string;
}) {
  const contractName = getContractName(contract.contract_id, false);
  const doc = createContractDocInfo({
    contractSrc: contract.source,
    abi: contract.contract_interface,
  });

  const functions = doc.functions.map(fn => markdownFunction(fn, contractFile));
  const maps = doc.maps.map(map => markdownMap(map, contractFile));
  const vars = doc.variables
    .filter(v => v.abi.access === 'variable')
    .map(v => markdownVar(v, contractFile));
  const constants = doc.variables
    .filter(v => v.abi.access === 'constant')
    .map(v => markdownVar(v, contractFile));
  let fileLine = '';
  if (contractFile) {
    const fileName = basename(contractFile);
    fileLine = `\n[\`${fileName}\`](${contractFile})`;
  }

  return `
# ${contractName}
${fileLine}

${doc.comments.join('\n')}

${markdownTOC(doc)}

## Functions

${functions.join('\n\n')}

## Maps

${maps.join('\n\n')}

## Variables

${vars.join('\n\n')}

## Constants

${constants.join('\n\n')}
  `;
}

export function markdownFunction(fn: ClaridocFunction, contractFile?: string) {
  const params = mdParams(fn);
  const returnType = getTypeString(fn.abi.outputs.type);
  const paramSigs = fn.abi.args.map(arg => {
    return `(${arg.name} ${getTypeString(arg.type)})`;
  });

  const startLine = fn.startLine + 1;

  let link = '';
  if (contractFile) {
    link = `[View in file](${contractFile}#L${startLine})`;
  }

  const source = `<details>
  <summary>Source code:</summary>

\`\`\`clarity
${fn.source.join('\n')}
\`\`\`
</details>
`;

  const sig = `(define-${fn.abi.access.replace('_', '-')} (${fn.abi.name} (${paramSigs.join(
    ' '
  )}) ${returnType})`;

  return `### ${fn.abi.name}

${link}

\`${sig}\`

${fn.comments.text.join('\n')}

  ${source}

  ${params}`;
}

function mdParams(fn: ClaridocFunction) {
  if (fn.abi.args.length === 0) return '';
  const params = Object.values(fn.comments.params).map(markdownParam);

  return `**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
${params.join('\n')}`;
}

function markdownParam(param: ClaridocParam) {
  const typeString = getTypeString(param.abi.type);
  return `| ${param.abi.name} | ${typeString} | ${param.comments.join(' ')} |`;
}

function markdownMap(map: ClaridocMap, contractFile?: string) {
  const startLine = map.startLine + 1;

  let link = '';
  if (contractFile) {
    link = `[View in file](${contractFile}#L${startLine})`;
  }

  return `### ${map.abi.name}

  ${map.comments.text.join('\n')}

\`\`\`clarity
${map.source.join('\n')}
\`\`\`

  ${link}
  `;
}

function markdownVar(variable: ClaridocVariable, contractFile?: string) {
  const startLine = variable.startLine + 1;

  let link = '';
  if (contractFile) {
    link = `[View in file](${contractFile}#L${startLine})`;
  }

  const sig = variable.abi.access === 'variable' ? getTypeString(variable.abi.type) : '';

  return `### ${variable.abi.name}

  ${sig}

  ${variable.comments.text.join('\n')}

\`\`\`clarity
${variable.source.join('\n')}
\`\`\`

  ${link}
  `;
}

function markdownTOC(contract: ClaridocContract) {
  const publics = contract.functions.filter(fn => fn.abi.access === 'public');
  const readOnly = contract.functions.filter(fn => fn.abi.access === 'read_only');
  const privates = contract.functions.filter(fn => fn.abi.access === 'private');
  const maps = contract.maps;
  const constants = contract.variables.filter(v => v.abi.access === 'constant');
  const vars = contract.variables.filter(v => v.abi.access === 'variable');

  function tocLine(fn: ClaridocItem) {
    const name = fn.abi.name;
    return `- [\`${name}\`](#${name})`;
  }

  return `**Public functions:**

${publics.map(tocLine).join('\n')}

**Read-only functions:**

${readOnly.map(tocLine).join('\n')}

**Private functions:**

${privates.map(tocLine).join('\n')}

**Maps**

${maps.map(tocLine).join('\n')}

**Variables**

${vars.map(tocLine).join('\n')}

**Constants**

${constants.map(tocLine).join('\n')}
`;
}

export function generateReadme(session: Session, excluded: Record<string, boolean>) {
  const contractLines: string[] = [];
  sortContracts(session.contracts).forEach(contract => {
    const name = getContractName(contract.contract_id, false);
    if (excluded[name]) return;
    const fileName = `${name}.md`;
    const line = `- [\`${name}\`](${fileName})`;
    contractLines.push(line);
  });
  const fileContents = `# Contracts
  
  ${contractLines.join('\n')}
  `;

  return fileContents;
}

// function md(strings: TemplateStringsArray, ..._values: any) {
//   const raw = String.raw({ raw: strings }, ..._values);
//   const fixed = raw.split('\n').map((s) => s.trim()).join('\n');
//   return fixed;
// }
