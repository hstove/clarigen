// import { dirname, relative, resolve } from '../deps.ts';
import { getContractName, toCamelCase } from '@clarigen/core';
// export { getContractName, toCamelCase, toKebabCase } from '@clarigen/core';
import { stat, mkdir, writeFile as fsWriteFile } from 'node:fs/promises';
import { dirname, relative } from 'node:path';

export function encodeVariableName(name: string) {
  if (/^[A-Z\-_]*$/.test(name)) return name.replaceAll('-', '_');
  return toCamelCase(name);
}

export async function fileExists(filename: string): Promise<boolean> {
  try {
    await stat(filename);
    // successful, file or directory must exist
    return true;
  } catch (_error) {
    return false;
    // if (error.code === 'ENOENT') {
    //   // file or directory does not exist
    //   return false;
    // } else {
    //   // unexpected error, maybe permissions, pass it along
    //   throw error;
    // }
  }
}

export async function writeFile(path: string, contents: string) {
  const dir = dirname(path);
  await mkdir(dir, { recursive: true });
  await fsWriteFile(path, contents, 'utf-8');
  return path;
}

export function cwdRelative(path: string) {
  return relative(process.cwd(), path);
}

// Sort contracts alphabetically by their contract name.
// Used to preserve ordering when generating files
export function sortContracts<T extends { contract_id: string }>(
  contracts: T[]
): T[] {
  const nameSorted = [...contracts].sort((a, b) => {
    if (
      getContractName(a.contract_id, false) <
      getContractName(b.contract_id, false)
    ) {
      return -1;
    }
    return 1;
  });
  return nameSorted;
}
