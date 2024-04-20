import { Command, Option } from 'clipanion';
import { logger } from '../logger';
import { Config, OutputType } from '../config';
import { getSession } from '../session';
import { generateBaseFile } from '../files/base';
import { afterESM, generateESMFile } from '../files/esm';

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
  if (!config.supports(OutputType.ESM) && !config.supports(OutputType.Deno)) {
    logger.warn('no config for ESM outputs. Not outputting any generated types.');
  }
}

export class DefaultCommand extends Command {
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

  verbose = Option.Boolean('-v,--verbose', false, {
    description: 'Enable verbose logging',
  });
  async execute() {
    if (this.verbose) {
      logger.level = 'debug';
    }
    const config = await Config.load(this.cwd);
    await generate(config);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async catch(error: unknown) {
    logger.error(error);
    if (error instanceof Error) {
      logger.error(error.stack);
    }
    throw error;
  }
}
