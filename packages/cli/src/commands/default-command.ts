/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { Command, Option } from 'clipanion';
import { logger } from '../logger';
import { Config, OutputType } from '../config';
import { getSession } from '../clarinet-sdk';
import { generateBaseFile } from '../files/base';
import { afterESM, generateESMFile } from '../files/esm';
import { BaseCommand } from './base-command';
import chokidar from 'chokidar';
import { dirname, join, relative } from 'node:path';

export async function generate(config: Config) {
  const session = await getSession(config);
  const baseFile = generateBaseFile(session);
  if (config.supports(OutputType.ESM)) {
    const esmFile = await generateESMFile({
      baseFile,
      session,
      config,
    });
    await config.writeOutput(OutputType.ESM, esmFile);
    await afterESM(config);
  }
  if (!config.supports(OutputType.ESM)) {
    logger.warn(
      'no config for ESM outputs. Not outputting any generated types.'
    );
  }
  logger.info('Types generated!');
}

// biome-ignore lint/suspicious/useAwait: ignored using `--suppress`
export async function watch(config: Config, cwd?: string) {
  // const ora = await import('ora');
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: ignored using `--suppress`
  return new Promise(async (_resolve, _reject) => {
    // First, generate the types
    try {
      await generate(config);
    } catch (error) {
      logger.error({ error }, 'Error generating types');
    }
    // default to watching the contracts folder
    const clarinetFolder = dirname(config.clarinetFile());
    const contractsFolder = join(clarinetFolder, '/contracts/**/*.clar');
    const relativeFolder = relative(cwd || process.cwd(), contractsFolder);
    const watchFolders = config.esm?.watch_folders ?? [];
    watchFolders.push(relativeFolder);
    logger.info(`Watching for changes in ${watchFolders}`);
    const watcher = chokidar.watch(watchFolders, {
      persistent: true,
      cwd: clarinetFolder,
    });
    let running = false;
    let start = 0;
    const _isVerbose = logger.level !== 'info';
    watcher.on('change', (path) => {
      if (!running) {
        start = Date.now();
        logger.info(`File ${path} has been changed. Generating types.`);
        running = true;
        // biome-ignore lint/complexity/noVoid: ignored using `--suppress`
        void generate(config)
          .catch((e) => {
            logger.error({ error: e }, 'Error generating types');
          })
          .then(() => {
            setTimeout(() => {
              // Temporary hack because clarinet-sdk-wasm prints to stdout
              process.stdout.moveCursor(0, -1);
              process.stdout.clearLine(1);
              const elapsed = Date.now() - start;
              // process.stdout.moveCursor(0, -1);
              // process.stdout.clearLine(1);
              logger.info(
                `Types generated (${(elapsed / 1000).toFixed(2)}s). Watching for changes...`
              );
              running = false;
            });

            // spinner.succeed('Types generated');
          });
      }
      // await generate(config);
    });
  });
}

export class DefaultCommand extends BaseCommand {
  static paths = [Command.Default, ['generate']];
  // static description = 'Generate types for your Clarity contracts';
  static usage = Command.Usage({
    description: 'Generate types for your Clarity contracts',
    examples: [
      ['Basic usage:', 'clarigen'],
      [
        'When your `Clarigen.toml` is in a different directory:',
        'clarigen /path/to/your/project',
      ],
      ['Watch for changes and regenerate types:', 'clarigen --watch'],
    ],
  });

  cwd = Option.String({
    required: false,
  });

  watch = Option.Boolean('-w,--watch', {
    description: 'Watch for changes and regenerate types',
    required: false,
  });

  async execute() {
    this.preexecute();

    const config = await Config.load(this.cwd);
    if (this.watch) {
      await watch(config, this.cwd);
    } else {
      await generate(config);
    }
  }
}
