import { Option } from 'clipanion';
import { BaseCommand } from './base-command';
import { Config } from '../config';
import { getSession } from '../clarinet-sdk';
import { generateDocs } from '../files/docs';

export class DocsCommand extends BaseCommand {
  static paths = [['docs']];
  static usage = BaseCommand.Usage({
    description: 'Generate markdown documentation for your Clarity contracts',
  });

  cwd = Option.String({ required: false });

  async execute() {
    this.preexecute();
    const config = await Config.load(this.cwd);
    const session = await getSession(config);
    await generateDocs({
      session: {
        ...session,
        variables: [],
      },
      config,
    });
  }
}
