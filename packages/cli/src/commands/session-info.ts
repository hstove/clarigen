import { Command, Option } from 'clipanion';
import { Config } from '../config';
import { logger } from '../logger';

export class SessionInfoCommand extends Command {
  static paths = [['session-info']];
  static usage = {
    description: "Log info about this project's Clarinet session",
  };

  cwd = Option.String({ required: false });

  async execute() {
    const config = await Config.load(this.cwd);
    logger.info(config);
  }
}
