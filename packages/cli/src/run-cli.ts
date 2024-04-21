import { Cli, Builtins } from 'clipanion';
import { SessionInfoCommand } from './commands/session-info';
import { DefaultCommand } from './commands/default-command';
import { DocsCommand } from './commands/docs-command';

const [node, script, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'Clarigen',
  binaryName: 'clarigen',
  binaryVersion: '0.0.1',
});

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(DefaultCommand);
cli.register(DocsCommand);
cli.register(SessionInfoCommand);

async function run() {
  await cli.runExit(args, Cli.defaultContext);
}

run()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
