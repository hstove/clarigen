import type { ClarityAbi } from '@clarigen/core';

export type SessionContract = {
  contract_id: string;
  contract_interface: ClarityAbi;
  source: string;
};
export type EpochType = ClarityAbi;

export type SessionAccount = {
  address: string;
  balance: string;
  name: string;
};

export type Session = {
  session_id: number;
  accounts: SessionAccount[];
  contracts: SessionContract[];
};

export interface SessionWithVariables extends Session {
  variables: string[];
}
