import {
  CoreNodeEventType,
  type SmartContractEvent as _SmartContractEvent,
  type StxTransferEvent as _StxTransferEvent,
  type StxBurnEvent as _StxBurnEvent,
  type StxMintEvent as _StxMintEvent,
  type StxLockEvent as _StxLockEvent,
  type FtBurnEvent as _FtBurnEvent,
  type FtMintEvent as _FtMintEvent,
  type FtTransferEvent as _FtTransferEvent,
  type NftBurnEvent as _NftBurnEvent,
  type NftMintEvent as _NftMintEvent,
  type NftTransferEvent as _NftTransferEvent,
} from '@clarigen/core';
import type { ClarityValue } from '@stacks/transactions';

export type SmartContractEvent = {
  event: _SmartContractEvent['type'];
  data: Omit<_SmartContractEvent['contract_event'], 'value'> & {
    value: ClarityValue;
  };
};

export type StxTransferEvent = {
  event: _StxTransferEvent['type'];
  data: _StxTransferEvent['stx_transfer_event'];
};

export type StxBurnEvent = {
  event: _StxBurnEvent['type'];
  data: _StxBurnEvent['stx_burn_event'];
};

export type StxLockEvent = {
  event: _StxLockEvent['type'];
  data: _StxLockEvent['stx_lock_event'];
};

export type StxMintEvent = {
  event: _StxMintEvent['type'];
  data: _StxMintEvent['stx_mint_event'];
};

export type FtBurnEvent = {
  event: _FtBurnEvent['type'];
  data: _FtBurnEvent['ft_burn_event'];
};

export type FtMintEvent = {
  event: _FtMintEvent['type'];
  data: _FtMintEvent['ft_mint_event'];
};

export type FtTransferEvent = {
  event: _FtTransferEvent['type'];
  data: _FtTransferEvent['ft_transfer_event'];
};

export type NftBurnEvent = {
  event: _NftBurnEvent['type'];
  data: _NftBurnEvent['nft_burn_event'];
};

export type NftMintEvent = {
  event: _NftMintEvent['type'];
  data: _NftMintEvent['nft_mint_event'];
};

export type NftTransferEvent = {
  event: _NftTransferEvent['type'];
  data: _NftTransferEvent['nft_transfer_event'];
};

export type CoreNodeEvent =
  | SmartContractEvent
  | StxTransferEvent
  | StxMintEvent
  | StxBurnEvent
  | StxLockEvent
  | FtTransferEvent
  | FtMintEvent
  | FtBurnEvent
  | NftTransferEvent
  | NftMintEvent
  | NftBurnEvent;

export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.ContractEvent
): SmartContractEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.StxTransferEvent
): StxTransferEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.StxMintEvent
): StxMintEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.StxBurnEvent
): StxBurnEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.StxLockEvent
): StxLockEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.NftTransferEvent
): NftTransferEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.NftMintEvent
): NftMintEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.NftBurnEvent
): NftBurnEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.FtTransferEvent
): FtTransferEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.FtMintEvent
): FtMintEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType.FtBurnEvent
): FtBurnEvent[];
export function filterEvents(
  events: CoreNodeEvent[],
  type: CoreNodeEventType
): CoreNodeEvent[] {
  const typeString =
    type === CoreNodeEventType.ContractEvent ? 'print_event' : type;
  return events.filter((event) => event.event === typeString);
}
