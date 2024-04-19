import { z } from 'zod';
import { readFile } from 'fs/promises';
import { parse } from 'smol-toml';

export const ClarinetConfigSchema = z.object({
  project: z.object({
    requirements: z.array(z.object({ contract_id: z.string() })).optional(),
    cache_location: z.object({ path: z.string() }).optional(),
  }),
  contracts: z.record(z.string(), z.object({ path: z.string() })).optional(),
});

export type ClarinetConfig = z.infer<typeof ClarinetConfigSchema>;

export async function getClarinetConfig(path: string): Promise<ClarinetConfig> {
  const file = await readFile(path, 'utf-8');
  const config = ClarinetConfigSchema.parse(parse(file));
  return config;
}
