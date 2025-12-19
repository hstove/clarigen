/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
import type { SessionWithVariables } from '../session';
import { type Config, OutputType } from '../config';
import { log } from '../logger';
import { getContractName } from '@clarigen/core';
import { relative, extname } from 'node:path';
import { generateMarkdown, generateReadme } from '../docs/markdown';
import { afterDocs } from '../docs';

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
  const docsPathExt = extname(docsBase);
  if (docsPathExt) {
    log.warn(
      `Docs output path ('${docsBase}') looks like a file - it needs to be a directory.`
    );
  }
  const excluded: Record<string, boolean> = Object.fromEntries(
    (docs.exclude || []).map((e) => [e, true])
  );
  log.debug(`Generating docs at path \`${docsBase}\``);
  // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
  // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: ignored using `--suppress`
  const docsBaseFolder = config.outputResolve(OutputType.Docs, './')?.[0]!;
  const paths = await Promise.all(
    session.contracts.map(async (contract) => {
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
        log.debug(
          `Couldn't find contract file from Clarinet.toml for contract ${name}`
        );
      }

      const md = generateMarkdown({ contract, contractFile });

      // log.debug(`Writing docs markdown file at ${cwdRelative(docPathFull)}`);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
      const path = (await config.writeOutput(OutputType.Docs, md, docFile))!;
      return path[0];
    })
  );

  const readme = generateReadme(session, excluded);

  paths.push(
    // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: ignored using `--suppress`
    // biome-ignore lint/style/noNonNullAssertion: ignored using `--suppress`
    (await config.writeOutput(OutputType.Docs, readme, 'README.md'))?.[0]!
  );
  await afterDocs(config);
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
