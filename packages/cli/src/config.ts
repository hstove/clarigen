import { z } from 'zod';
import { log } from './logger';
import { fileExists, writeFile } from './utils';
import { ClarinetConfig, getClarinetConfig } from './clarinet-config';
import { dirname, join, relative, resolve } from 'path';
import { stringify, parse } from '@iarna/toml';
import { readFile } from 'fs/promises';

export const CONFIG_FILE = 'Clarigen.toml' as const;

export enum OutputType {
  ESM = 'types',
  ESM_OLD = 'esm',
  Docs = 'docs',
}

const typesSchema = z
  .object({
    output: z.string().optional(),
    outputs: z.array(z.string()).optional(),
    include_accounts: z.boolean().optional(),
    after: z.string().optional(),
  })
  .optional();

export const ConfigFileSchema = z.object({
  clarinet: z.string(),
  [OutputType.ESM]: typesSchema,
  [OutputType.ESM_OLD]: typesSchema,
  [OutputType.Docs]: z
    .object({
      output: z.string().optional(),
      outputs: z.array(z.string()).optional(),
      exclude: z.array(z.string()).optional(),
      after: z.string().optional(),
    })
    .optional(),
});

export type ConfigFile = z.infer<typeof ConfigFileSchema>;

export const defaultConfigFile: ConfigFile = {
  clarinet: './Clarinet.toml',
};

export class Config {
  public configFile: ConfigFile;
  public clarinet: ClarinetConfig;
  public cwd: string;

  constructor(config: ConfigFile, clarinet: ClarinetConfig, cwd?: string) {
    this.configFile = config;
    this.clarinet = clarinet;
    this.cwd = cwd ?? process.cwd();
  }

  public static async load(cwd?: string) {
    const config = await getConfig(cwd);
    if (config[OutputType.ESM_OLD]) {
      config[OutputType.ESM] = config[OutputType.ESM_OLD];
      delete config[OutputType.ESM_OLD];
    }
    const clarinet = await getClarinetConfig(resolve(cwd ?? '', config.clarinet));
    return new this(config, clarinet, cwd);
  }

  getOutputs(type: OutputType): string[] {
    const singlePath = this.configFile[type]?.output;
    const multiPath = this.configFile[type]?.outputs || [];
    if (singlePath !== undefined) return [singlePath];
    return multiPath;
  }

  outputResolve(type: OutputType, filePath?: string): string[] | null {
    const outputs = this.getOutputs(type);
    if (!this.supports(type)) return null;
    return outputs.map(path => {
      return resolve(this.cwd, path, filePath || '');
    });
  }

  async writeOutput(type: OutputType, contents: string, filePath?: string) {
    const paths = this.outputResolve(type, filePath);
    if (paths === null) return null;
    await Promise.all(
      paths.map(async path => {
        await writeFile(path, contents);
        log.debug(`Generated ${type} file at ${relative(this.cwd, path)}`);
      })
    );
    return paths;
  }

  supports(type: OutputType) {
    return this.getOutputs(type).length > 0;
  }

  type(type: OutputType) {
    return this.configFile[type];
  }

  get esm() {
    return this.configFile[OutputType.ESM];
  }
  get docs() {
    return this.configFile[OutputType.Docs];
  }

  clarinetFile() {
    return resolve(this.cwd, this.configFile.clarinet);
  }

  joinFromClarinet(filePath: string) {
    const baseDir = dirname(this.clarinetFile());
    return join(baseDir, filePath);
  }
}

export function configFilePath(cwd?: string) {
  return resolve(cwd ?? process.cwd(), CONFIG_FILE);
}

export async function saveConfig(config: ConfigFile) {
  const configToml = stringify({ ...config });
  await writeFile(configFilePath(), configToml);
}

// memoize / singleton
let sessionConfig: ConfigFile | undefined;

export async function getConfig(cwd?: string): Promise<ConfigFile> {
  if (typeof sessionConfig !== 'undefined') return sessionConfig;
  const path = configFilePath(cwd);
  if (await fileExists(path)) {
    const toml = await readFile(path, 'utf-8');
    const parsedToml = parse(toml);
    sessionConfig = ConfigFileSchema.parse(parsedToml);
  } else {
    sessionConfig = defaultConfigFile;
  }
  return sessionConfig;
}
