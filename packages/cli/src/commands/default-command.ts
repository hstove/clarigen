import { Command, Option } from 'clipanion';
import { logger } from '../logger';
import { Config, OutputType } from '../config';
import { getSession } from '../session';
import { generateBaseFile } from '../files/base';
import { afterESM, generateESMFile } from '../files/esm';
import { BaseCommand } from './base-command';

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
    logger.warn('no config for ESM outputs. Not outputting any generated types.');
  }
}

export class DefaultCommand extends BaseCommand {
  static paths = [Command.Default];
  // static description = 'Generate types for your Clarity contracts';
  static usage = Command.Usage({
    description: 'Generate types for your Clarity contracts',
    examples: [
      ['Basic usage:', 'clarigen'],
      ['When your `Clarigen.toml` is in a different directory:', 'clarigen /path/to/your/project'],
    ],
  });

  cwd = Option.String({
    required: false,
  });

  async execute() {
    this.preexecute();

    const config = await Config.load(this.cwd);
    await generate(config);
  }
}
