/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import { Command, Option } from 'clipanion';
import { Config } from '../config';
import { logger } from '../logger';
import { BaseCommand } from './base-command';

export class SessionInfoCommand extends BaseCommand {
  static override paths = [['session-info']];
  static override usage = Command.Usage({
    description: "Log info about this project's Clarinet session",
  });

  cwd = Option.String({ required: false });

  async execute() {
    this.preexecute();
    const config = await Config.load(this.cwd);
    logger.info(config);
  }
}
