/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { Option } from 'clipanion';
import { BaseCommand } from './base-command';
import { Config } from '../config';
import { getSession } from '../clarinet-sdk';
import { generateDocs } from '../files/docs';
import { dirname, join, relative } from 'node:path';
import { logger } from '../logger';
import chokidar from 'chokidar';

export async function watch(config: Config, cwd?: string) {
  // const ora = await import('ora');
  const session = await getSession(config);
  // First, generate the docs
  try {
    await generateDocs({
      session,
      config,
    });
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
  watcher.on('change', async path => {
    if (!running) {
      start = Date.now();
      logger.info(`File ${path} has been changed. Generating types.`);
      running = true;
      // biome-ignore lint/nursery/noShadow: ignored using `--suppress`
      const session = await getSession(config);
      // biome-ignore lint/complexity/noVoid: ignored using `--suppress`
      void generateDocs({
        session,
        config,
      })
        .catch(e => {
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
              `Docs generated (${(elapsed / 1000).toFixed(2)}s). Watching for changes...`
            );
            running = false;
          });

          // spinner.succeed('Types generated');
        });
    }
  });
}

export class DocsCommand extends BaseCommand {
  static override paths = [['docs']];
  static override usage = BaseCommand.Usage({
    description: 'Generate markdown documentation for your Clarity contracts',
  });

  cwd = Option.String({ required: false });

  watch = Option.Boolean('-w,--watch', {
    description: 'Watch for changes and regenerate docs',
    required: false,
  });

  async execute() {
    this.preexecute();
    const config = await Config.load(this.cwd);
    if (this.watch) {
      await watch(config, this.cwd);
    } else {
      const session = await getSession(config);
      await generateDocs({
        session: {
          ...session,
          variables: [],
        },
        config,
      });
    }
  }
}
