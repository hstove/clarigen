import { type } from 'arktype';
import { readFile } from 'node:fs/promises';
import { parse } from '@iarna/toml';

export const ClarinetConfig = type({
  project: type({
    requirements: type({
      contract_id: type('string').describe('Contract ID'),
    })
      .array()
      .describe('Project requirements')
      .optional(),
    cache_location: type({
      path: type('string').describe('Cache location path'),
    }).optional(),
  }),
  contracts: type({
    '[string]': type({
      path: type('string').describe('Contract path'),
    }),
  }).optional(),
});

export type ClarinetConfig = typeof ClarinetConfig.infer;

export async function getClarinetConfig(path: string): Promise<ClarinetConfig> {
  const file = await readFile(path, 'utf-8');
  const config = ClarinetConfig.assert(parse(file));
  return config;
}
