import { Command, Option } from 'clipanion';
import { logger } from '@/logger';
import { type } from 'arktype';

export abstract class BaseCommand extends Command {
  verbose = Option.Boolean('-v,--verbose', false, {
    description: 'Enable verbose logging',
  });

  preexecute() {
    if (this.verbose) {
      logger.level = 'debug';
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  // biome-ignore lint/suspicious/useAwait: ignored using `--suppress`
  async catch(error: unknown) {
    if (error instanceof type.errors) {
      logger.error('Your configuration file is invalid.', error.summary);
      return;
    }
    logger.error(error);

    if (error instanceof Error) {
      logger.error(error.stack);
    }
    throw error;
  }
}
