import { SessionWithVariables } from '../session';
import { Config, OutputType } from '../config';
import { log } from '../logger';
import { getContractName } from '@clarigen/core';
import { relative } from 'path';
import { generateMarkdown, generateReadme } from '../docs/markdown';

export async function generateDocs({
  session,
  config,
}: {
  session: SessionWithVariables;
  config: Config;
}) {
  const docs = config.configFile[OutputType.Docs];
  const docsBase = docs?.output;
  if (!docsBase) {
    warnNoDocs();
    return;
  }
  if (docsBase.includes('.')) {
    log.warn(`Docs output path ('${docsBase}') looks like a file - it needs to be a directory.`);
  }
  const excluded: Record<string, boolean> = Object.fromEntries(
    (docs.exclude || []).map(e => {
      return [e, true];
    })
  );
  log.debug(`Generating docs at path \`${docsBase}\``);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const docsBaseFolder = config.outputResolve(OutputType.Docs, './')![0];
  const paths = await Promise.all(
    session.contracts.map(async contract => {
      const name = getContractName(contract.contract_id, false);
      if (excluded[name]) return null;
      const docFile = `${name}.md`;
      // location of
      const contractPathDef = config.clarinet.contracts?.[name]?.path;
      let contractFile: string | undefined;
      // if we have the contract file, make a relative link
      if (contractPathDef) {
        const contractPathFull = config.joinFromClarinet(contractPathDef);
        contractFile = relative(docsBaseFolder, contractPathFull);
      } else {
        // TODO: probably a requirement
        log.debug(`Couldn't find contract file from Clarinet.toml for contract ${name}`);
      }

      const md = generateMarkdown({ contract, contractFile });

      // log.debug(`Writing docs markdown file at ${cwdRelative(docPathFull)}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const path = (await config.writeOutput(OutputType.Docs, md, docFile))!;
      return path[0];
    })
  );

  const readme = generateReadme(session, excluded);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  paths.push((await config.writeOutput(OutputType.Docs, readme, 'README.md'))![0]);

  // TODO: `after` command for docs
  // await runDenoFmt(paths.filter(s => s !== null) as string[]);
}

function warnNoDocs() {
  log.warn(
    `\nClarigen config file doesn't include an output directory for docs.

To generate docs, specify 'docs.output' in your config file:

[docs]
output = "docs/"
  `.trimEnd()
  );
}
