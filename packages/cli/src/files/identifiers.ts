import { getContractName } from '@clarigen/core';
import type { Session } from '../session';
import { sortContracts } from '../utils';

export function generateIdentifiers(session: Session) {
  const identifiers = Object.fromEntries(
    sortContracts(session.contracts).map(c => {
      const contractName = getContractName(c.contract_id);
      return [contractName, c.contract_id];
    })
  );
  return identifiers;
}

export function generateIdentifiersCode(session: Session) {
  const identifiers = generateIdentifiers(session);

  return `export const identifiers = ${JSON.stringify(identifiers)} as const`;
}
