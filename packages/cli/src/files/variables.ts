import type { Simnet } from '@hirosystems/clarinet-sdk';
import { logger } from '../logger';
import { Session, SessionContract } from '../session';
import {
  ClarityAbiTypeTuple,
  ClarityAbiVariable,
  cvToValue,
  getContractName,
} from '@clarigen/core';
import { serialize } from './base';

export function getVariablesV2(contract: SessionContract, simnet: Simnet, verbose?: boolean) {
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
    logger.info(`Contract ${getContractName(contract.contract_id, false)} has no variables`);
    return {};
  }

  let varFn = `{\n`;

  const varLines = contract.contract_interface.variables.map(variable => {
    let varLine = `${variable.name}: `;
    if (variable.access === 'constant') {
      varLine += `${variable.name}`;
    } else {
      varLine += `(var-get ${variable.name})`;
    }
    return varLine;
  });
  varFn += varLines.map(l => ` ${l},`).join('\n');

  varFn += '\n}';

  const fullSrc = contract.source + `\n\n${varFn}`;
  try {
    const receipt = simnet.deployContract(
      fakeId,
      fullSrc,
      {
        clarityVersion: 4,
      },
      deployer
    );
    const result = receipt.result;

    const varsAbi: Writeable<ClarityAbiTypeTuple> = {
      tuple: [],
    };
    contract.contract_interface.variables.forEach(v => {
      const _v = v as unknown as Writeable<ClarityAbiVariable>;
      varsAbi.tuple.push({
        type: _v.type,
        name: _v.name,
      });
    });

    if (verbose) {
      // const cv = cvConvertHiro(result);
      // console.log('cv', cv);
      // console.log(esCvToValue(cvConvertHiro(result), true));
      logger.info(cvToValue(result, true));
    }

    // return esCvToValue(cvConvertHiro(result), true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cvToValue(result, true);
  } catch (error) {
    logger.warn(
      { err: error },
      `Error getting variables for ${getContractName(contract.contract_id, false)}`
    );
    // logger.error(`Source code: ${contract.source} with type ${String(typeof contract.source)}`);
    // logger.error(fullSrc);
    return {};
  }
}

type Writeable<T> = { -readonly [P in keyof T]: Writeable<T[P]> };

export function mapVariables(session: Session, simnet: Simnet) {
  return session.contracts.map(contract => {
    const vars = getVariablesV2(contract, simnet);
    return serialize(vars);
  });
}
