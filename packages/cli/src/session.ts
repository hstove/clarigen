import { ClarityAbi } from '@clarigen/core';

export interface SessionContract {
  contract_id: string;
  contract_interface: ClarityAbi;
  source: string;
}
export type EpochType = ClarityAbi;

export type SessionAccount = {
  address: string;
  balance: string;
  name: string;
};

export interface Session {
  session_id: number;
  accounts: SessionAccount[];
  contracts: SessionContract[];
}

export interface SessionWithVariables extends Session {
  variables: string[];
}
