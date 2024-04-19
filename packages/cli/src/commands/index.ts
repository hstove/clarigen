// import { termost, helpers } from 'termost';
import { logger } from '../logger';
import { Config } from '../config';
// import { C } from 'clipanion';

// export type CliGlobalFlags = {
//   quiet: boolean;
//   verbose: boolean;
// };

// export type ProjectInfoOptions = {
//   config?: string;
// };

// export const cli = termost<CliGlobalFlags>('Clarigen', {
//   onException(error) {
//     logger.error(`Error logic ${error.message}`);
//   },
//   onShutdown() {
//     logger.info('Bye bye!');
//   },
// });

// cli.option({
//   key: 'quiet',
//   name: { long: 'quiet', short: 'q' },
//   description: 'Suppress any warnings',
//   defaultValue: false,
// });
// cli.option({
//   key: 'verbose',
//   name: { long: 'verbose', short: 'v' },
//   description: 'Include more diagnostic logging',
//   defaultValue: false,
// });

// cli.task({
//   handler() {
//     logger.info('Hello world!');
//   },
// });

// cli
//   .command<ProjectInfoOptions>({
//     name: 'project-info',
//     description: 'Output information about your contracts',
//   })
//   .option({
//     key: 'config',
//     name: { long: 'config', short: 'c' },
//     description: 'Path to your Clarigen config file',
//     // defaultValue: 'Clarigen.toml',
//   })
//   .task({
//     async handler(context, argv) {
//       console.log('context', context);
//       const config = await Config.load(context.config);
//       logger.info(config);
//     },
//   });
