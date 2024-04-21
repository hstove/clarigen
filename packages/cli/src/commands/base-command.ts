import { Command, Option } from 'clipanion';
import { logger } from '../logger';
import { ZodError } from 'zod';

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
  async catch(error: unknown) {
    if (error instanceof ZodError) {
      logger.error(error.issues, 'Your configuration file is invalid.');
      return;
    }
    logger.error(error);

    if (error instanceof Error) {
      logger.error(error.stack);
    }
    throw error;
  }
}
