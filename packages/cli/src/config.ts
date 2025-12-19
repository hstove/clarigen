/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { type } from 'arktype';
import { log, logger } from './logger';
import { fileExists, writeFile } from './utils';
import { type ClarinetConfig, getClarinetConfig } from './clarinet-config';
import { dirname, join, relative, resolve } from 'node:path';
import { stringify, parse } from '@iarna/toml';
import { readFile } from 'node:fs/promises';

export const CONFIG_FILE = 'Clarigen.toml' as const;

// biome-ignore lint/style/noEnum: ignored using `--suppress`
export enum OutputType {
  ESM = 'types',
  ESM_OLD = 'esm',
  Docs = 'docs',
}

const typesSchema = type({
  'output?': type('string').describe('Path to the output file'),
  'outputs?': type('string[]').describe('Paths to the output files'),
  'include_accounts?': type('boolean').describe(
    'Include accounts in the output'
  ),
  'after?': type('string').describe(
    'Script to run after the output is generated'
  ),
  'include_boot_contracts?': type('boolean').describe(
    'Include boot contracts in the output'
  ),
  'watch_folders?': type('string[]').describe('Folders to watch for changes'),
}).optional();

export const ConfigFile = type({
  clarinet: type('string').describe('Path to the Clarinet config file'),
  [OutputType.ESM]: typesSchema,
  [OutputType.ESM_OLD]: typesSchema,
  [OutputType.Docs]: type({
    'output?': type('string').describe(
      'Path to docs output folder. Defaults to ./docs'
    ),
    'outputs?': type('string[]').describe('Paths to docs output folders'),
    'exclude?': type('string[]').describe(
      'Contracts to exclude from docs generation'
    ),
    'after?': type('string').describe('Script to run after docs are generated'),
  }).optional(),
});

export type ConfigFile = typeof ConfigFile.infer;

export const defaultConfigFile: ConfigFile = {
  clarinet: './Clarinet.toml',
};

export class Config {
  // biome-ignore lint/style/useConsistentMemberAccessibility: ignored using `--suppress`
  public configFile: ConfigFile;
  // biome-ignore lint/style/useConsistentMemberAccessibility: ignored using `--suppress`
  public clarinet: ClarinetConfig;
  // biome-ignore lint/style/useConsistentMemberAccessibility: ignored using `--suppress`
  public cwd: string;

  constructor(config: ConfigFile, clarinet: ClarinetConfig, cwd?: string) {
    this.configFile = config;
    this.clarinet = clarinet;
    this.cwd = cwd ?? process.cwd();
  }

  // biome-ignore lint/style/useConsistentMemberAccessibility: ignored using `--suppress`
  public static async load(cwd?: string) {
    const config = await getConfig(cwd);
    if (config[OutputType.ESM_OLD]) {
      config[OutputType.ESM] = config[OutputType.ESM_OLD];
      delete config[OutputType.ESM_OLD];
    }
    const clarinet = await getClarinetConfig(
      resolve(cwd ?? '', config.clarinet)
    );
    return new Config(config, clarinet, cwd);
  }

  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  getOutputs(type: OutputType): string[] {
    const singlePath = this.configFile[type]?.output;
    const multiPath = this.configFile[type]?.outputs || [];
    if (singlePath !== undefined) return [singlePath];
    return multiPath;
  }

  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  outputResolve(type: OutputType, filePath?: string): string[] | null {
    const outputs = this.getOutputs(type);
    if (!this.supports(type)) return null;
    return outputs.map((path) => resolve(this.cwd, path, filePath || ''));
  }

  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  async writeOutput(type: OutputType, contents: string, filePath?: string) {
    const paths = this.outputResolve(type, filePath);
    if (paths === null) return null;
    await Promise.all(
      paths.map(async (path) => {
        await writeFile(path, contents);
        log.debug(`Generated ${type} file at ${relative(this.cwd, path)}`);
      })
    );
    return paths;
  }

  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
  supports(type: OutputType) {
    return this.getOutputs(type).length > 0;
  }

  // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
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
    const parsed = ConfigFile(parsedToml);
    if (parsed instanceof type.errors) {
      logger.error(`Error parsing Clarigen config: ${parsed.summary}`);
      throw new Error(`Error parsing Clarigen config: ${parsed.summary}`);
    }
    sessionConfig = parsed;
  } else {
    sessionConfig = defaultConfigFile;
  }
  return sessionConfig;
}
