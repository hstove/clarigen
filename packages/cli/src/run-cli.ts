import { Cli, Builtins } from 'clipanion';
import { SessionInfoCommand } from './commands/session-info';
import { DefaultCommand } from './commands/default-command';
import { DocsCommand } from './commands/docs-command';
import { InitConfigCommand } from './commands/init-config-command';
import { logger } from './logger';
import { version } from './generated/version';

const [node, script, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'Clarigen',
  binaryName: 'clarigen',
  binaryVersion: version,
});

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(DefaultCommand);
cli.register(DocsCommand);
cli.register(InitConfigCommand);
cli.register(SessionInfoCommand);

async function run() {
  await cli.runExit(args, Cli.defaultContext);
}

process.on('SIGINT', () => {
  logger.info('Bye! 👋');
  process.exit();
});

run()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
