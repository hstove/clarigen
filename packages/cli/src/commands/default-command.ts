import { Command, Option } from 'clipanion';
import { logger } from '../logger';

export class DefaultCommand extends Command {
  static paths = [Command.Default];

  async execute() {
    logger.info('Hello, world!');
    return Promise.resolve();
  }
}
