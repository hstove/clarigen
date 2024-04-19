import { Command, Option } from 'clipanion';
import { logger } from '../logger';
import { Config } from '../config';
import { getSession } from '../session';

export class DefaultCommand extends Command {
  static paths = [Command.Default];

  cwd = Option.String({ required: false });
  async execute() {
    const config = await Config.load(this.cwd);
    const session = await getSession(config);
    logger.info(
      {
        contracts: session.contracts.map(c => c.contract_id),
      },
      'Contracts loaded'
    );
    // session.contracts.forEach((contract) => {
    //   contract.
    //   logger.info({
    //     id: contract.contract_id,
    //     // contract.
    //   });
    // });
    // logger.info(session);
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
