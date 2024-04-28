import { initSimnet } from '@hirosystems/clarinet-sdk';
import {
  ClarityAbi,
  MAINNET_BURN_ADDRESS,
  TESTNET_BURN_ADDRESS,
  getContractName,
} from '@clarigen/core';
import { ClarityType, ClarityValue } from '@stacks/transactions';

import { Config } from './config';
import { readFile } from 'fs/promises';
import { mapVariables } from './files/variables';
import { SessionContract, SessionWithVariables } from './session';

export async function getSession(config: Config): Promise<SessionWithVariables> {
  const simnet = await initSimnet(config.clarinetFile());
  const interfaces = simnet.getContractsInterfaces();
  const accounts = simnet.getAccounts();

  const allAccounts = [...accounts.entries()].map(([name, address]) => {
    const result = simnet.runSnippet(`(stx-get-balance '${address})`) as ClarityValue;
    if (result.type !== ClarityType.UInt) {
      throw new Error(`Unexpected result type for \`(stx-get-balance \``);
    }
    return {
      name,
      address,
      balance: result.value.toString(),
    };
  });

  // const docsBaseFolder = (config.outputResolve(OutputType.Docs, './')!)[0];

  const contracts = (
    await Promise.all(
      [...interfaces.entries()].map(async ([contract_id, contract_interface]) => {
        if (
          contract_id.startsWith(MAINNET_BURN_ADDRESS) ||
          contract_id.startsWith(TESTNET_BURN_ADDRESS)
        ) {
          return undefined;
        }
        const name = getContractName(contract_id, false);
        const contractPathDef = config.clarinet.contracts?.[name]?.path;
        let source: string | undefined;
        if (contractPathDef) {
          const contractPathFull = config.joinFromClarinet(contractPathDef);
          source = await readFile(contractPathFull, 'utf-8');
        }

        return {
          contract_id,
          contract_interface,
          source: source ?? '',
        };
      })
    )
  ).filter((x): x is SessionContract => x !== undefined);

  const session = {
    session_id: 0,
    accounts: allAccounts,
    contracts: contracts,
  };

  const variables = mapVariables(session, simnet);

  return {
    session_id: 0,
    accounts: allAccounts,
    contracts: contracts,
    variables,
    // variables: [],
  };
}
