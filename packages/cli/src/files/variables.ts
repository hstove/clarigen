import type { Simnet } from '@stacks/clarinet-sdk';
import { logger } from '../logger';
import type { Session, SessionContract } from '../session';
import {
  type ClarityAbiTypeTuple,
  type ClarityAbiVariable,
  cvToValue,
  getContractName,
} from '@clarigen/core';
import { serialize } from './base';

function clarityVersionForContract(contract: SessionContract) {
  switch (contract.contract_interface.clarity_version) {
    case 'Clarity1':
      return 1;
    case 'Clarity2':
      return 2;
    case 'Clarity3':
      return 3;
    case 'Clarity4':
      return 4;
    case 'Clarity5':
      return 5;
    default:
      if (contract.contract_interface.clarity_version.startsWith('Clarity')) {
        return Number.parseInt(
          contract.contract_interface.clarity_version.slice('Clarity'.length),
          10
        );
      }
      return 4;
  }
}

export function getVariablesV2(
  contract: SessionContract,
  simnet: Simnet,
  verbose?: boolean
) {
  const [deployer] = contract.contract_id.split('.');
  const fakeId = `${getContractName(contract.contract_id)}-vars`;
  logger.debug(`Deploying ${contract.contract_id} for variables.`);

  if (!contract.source) {
    logger.debug(
      `Contract ${getContractName(contract.contract_id)} has no source. Skipping variables.`
    );
    return {};
  }

  if (contract.contract_interface.variables.length === 0) {
    logger.info(
      `Contract ${getContractName(contract.contract_id, false)} has no variables`
    );
    return {};
  }

  let varFn = '{\n';

  const varLines = contract.contract_interface.variables.map((variable) => {
    let varLine = `${variable.name}: `;
    if (variable.access === 'constant') {
      varLine += `${variable.name}`;
    } else {
      varLine += `(var-get ${variable.name})`;
    }
    return varLine;
  });
  varFn += varLines.map((l) => ` ${l},`).join('\n');

  varFn += '\n}';

  const fullSrc = `${contract.source}\n\n${varFn}`;
  try {
    const receipt = simnet.deployContract(
      fakeId,
      fullSrc,
      {
        // hacky type to prevent having to constantly update this
        clarityVersion: clarityVersionForContract(contract) as unknown as
          | 1
          | 2
          | 3
          | 4,
      },
      deployer
    );
    const result = receipt.result;

    const varsAbi: Writeable<ClarityAbiTypeTuple> = {
      tuple: [],
    };
    for (const v of contract.contract_interface.variables) {
      const _v = v as unknown as Writeable<ClarityAbiVariable>;
      varsAbi.tuple.push({
        type: _v.type,
        name: _v.name,
      });
    }

    if (verbose) {
      logger.info(cvToValue(result, true));
    }

    return cvToValue(result, true);
  } catch (error) {
    logger.warn(
      { err: error },
      `Error getting variables for ${getContractName(contract.contract_id, false)}`
    );
    return {};
  }
}

type Writeable<T> = { -readonly [P in keyof T]: Writeable<T[P]> };

export function mapVariables(session: Session, simnet: Simnet) {
  return session.contracts.map((contract) => {
    const vars = getVariablesV2(contract, simnet);
    return serialize(vars);
  });
}
