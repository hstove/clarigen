import { configFilePath } from '../config';
import { logger } from '../logger';
import { fileExists } from '../utils';
import { BaseCommand } from './base-command';
import { Option } from 'clipanion';
import { writeFile } from 'fs/promises';
import { tomlInit } from '../generated/init-config';

export class InitConfigCommand extends BaseCommand {
  static paths = [['init-config'], ['init']];
  static usage = {
    description: 'Initialize a Clarigen configuration file',
  };

  cwd = Option.String({ required: false });

  overwrite = Option.Boolean('--overwrite', false, {
    description: 'Overwrite the configuration file if it already exists',
  });

  async execute(): Promise<number | void> {
    this.preexecute();
    const path = configFilePath(this.cwd);
    const configExists = await fileExists(path);
    if (configExists && !this.overwrite) {
      logger.warn('Configuration file already exists. Use --overwrite to overwrite it.');
      return 1;
    }
    logger.debug(`Writing configuration file to ${path}`);
    await writeFile(path, tomlInit, 'utf-8');
  }
}
