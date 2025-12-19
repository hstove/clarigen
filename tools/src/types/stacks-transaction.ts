import { type } from 'arktype';

// === Reusable Components ===

const HexRepr = type({
  hex: 'string',
  repr: 'string',
});

// Post condition principals
const PrincipalOrigin = type({
  type_id: "'principal_origin'",
});

const PrincipalStandard = type({
  type_id: "'principal_standard'",
  address: 'string',
});

const PrincipalContract = type({
  type_id: "'principal_contract'",
  address: 'string',
  contract_name: 'string',
});

const PostConditionPrincipal =
  PrincipalOrigin.or(PrincipalStandard).or(PrincipalContract);

// Post conditions
const StxConditionCode = type(
  "'sent_equal_to' | 'sent_greater_than' | 'sent_greater_than_or_equal_to' | 'sent_less_than' | 'sent_less_than_or_equal_to'"
);

const AssetInfo = type({
  asset_name: 'string',
  contract_address: 'string',
  contract_name: 'string',
});

const StxPostCondition = type({
  principal: PostConditionPrincipal,
  condition_code: StxConditionCode,
  amount: 'string',
  type: "'stx'",
});

const FungiblePostCondition = type({
  principal: PostConditionPrincipal,
  condition_code: StxConditionCode,
  amount: 'string',
  type: "'fungible'",
  asset: AssetInfo,
});

const NonFungiblePostCondition = type({
  principal: PostConditionPrincipal,
  condition_code: "'sent' | 'not_sent'",
  type: "'non_fungible'",
  asset_value: HexRepr,
  asset: AssetInfo,
});

const PostCondition = StxPostCondition.or(FungiblePostCondition).or(
  NonFungiblePostCondition
);

// Events
const SmartContractLogEvent = type({
  event_index: 'number',
  event_type: "'smart_contract_log'",
  tx_id: 'string',
  contract_log: {
    contract_id: 'string',
    topic: 'string',
    value: HexRepr,
  },
});

const StxLockEvent = type({
  event_index: 'number',
  event_type: "'stx_lock'",
  tx_id: 'string',
  stx_lock_event: {
    locked_amount: 'string',
    unlock_height: 'number',
    locked_address: 'string',
  },
});

const StxAssetEvent = type({
  event_index: 'number',
  event_type: "'stx_asset'",
  tx_id: 'string',
  asset: {
    asset_event_type: "'transfer' | 'mint' | 'burn'",
    sender: 'string',
    recipient: 'string',
    amount: 'string',
    'memo?': 'string',
  },
});

const FungibleTokenEvent = type({
  event_index: 'number',
  event_type: "'fungible_token_asset'",
  tx_id: 'string',
  asset: {
    asset_event_type: "'transfer' | 'mint' | 'burn'",
    asset_id: 'string',
    sender: 'string',
    recipient: 'string',
    amount: 'string',
  },
});

const NonFungibleTokenEvent = type({
  event_index: 'number',
  event_type: "'non_fungible_token_asset'",
  tx_id: 'string',
  asset: {
    asset_event_type: "'transfer' | 'mint' | 'burn'",
    asset_id: 'string',
    sender: 'string',
    recipient: 'string',
    value: HexRepr,
  },
});

const TxEvent = SmartContractLogEvent.or(StxLockEvent)
  .or(StxAssetEvent)
  .or(FungibleTokenEvent)
  .or(NonFungibleTokenEvent);

// === Base Transaction Fields ===

const BaseTxFields = type({
  tx_id: 'string',
  nonce: 'number',
  fee_rate: 'string',
  sender_address: 'string',
  'sponsor_nonce?': 'number',
  sponsored: 'boolean',
  'sponsor_address?': 'string',
  post_condition_mode: "'allow' | 'deny'",
  post_conditions: PostCondition.array(),
  anchor_mode: "'on_chain_only' | 'off_chain_only' | 'any'",
});

// === Confirmed Transaction Fields ===

const ConfirmedTxFields = type({
  block_hash: 'string',
  block_height: 'number',
  block_time: 'number',
  block_time_iso: 'string',
  burn_block_time: 'number',
  burn_block_height: 'number',
  burn_block_time_iso: 'string',
  parent_burn_block_time: 'number',
  parent_burn_block_time_iso: 'string',
  canonical: 'boolean',
  tx_index: 'number',
  tx_status: "'success' | 'abort_by_response' | 'abort_by_post_condition'",
  tx_result: HexRepr,
  event_count: 'number',
  parent_block_hash: 'string',
  is_unanchored: 'boolean',
  microblock_hash: 'string',
  microblock_sequence: 'number',
  microblock_canonical: 'boolean',
  execution_cost_read_count: 'number',
  execution_cost_read_length: 'number',
  execution_cost_runtime: 'number',
  execution_cost_write_count: 'number',
  execution_cost_write_length: 'number',
  vm_error: 'string | null',
  events: TxEvent.array(),
});

// === Pending Transaction Fields ===

const PendingTxStatus = type(
  "'pending' | 'dropped_replace_by_fee' | 'dropped_replace_across_fork' | 'dropped_too_expensive' | 'dropped_stale_garbage_collect' | 'dropped_problematic'"
);

const PendingTxFields = type({
  tx_status: PendingTxStatus,
  replaced_by_tx_id: 'string | null',
  receipt_time: 'number',
  receipt_time_iso: 'string',
});

// === Transaction Type Payloads ===

const TokenTransferPayload = type({
  tx_type: "'token_transfer'",
  token_transfer: {
    recipient_address: 'string',
    amount: 'string',
    memo: 'string',
  },
});

const SmartContractPayload = type({
  tx_type: "'smart_contract'",
  smart_contract: {
    clarity_version: 'number | null',
    contract_id: 'string',
    source_code: 'string',
  },
});

const ContractCallPayload = type({
  tx_type: "'contract_call'",
  contract_call: {
    contract_id: 'string',
    function_name: 'string',
    function_signature: 'string',
    'function_args?': type({
      hex: 'string',
      repr: 'string',
      name: 'string',
      type: 'string',
    }).array(),
  },
});

const PoisonMicroblockPayload = type({
  tx_type: "'poison_microblock'",
  poison_microblock: {
    microblock_header_1: 'string',
    microblock_header_2: 'string',
  },
});

const CoinbasePayload = type({
  tx_type: "'coinbase'",
  coinbase_payload: {
    data: 'string',
    'alt_recipient?': 'string | null',
    'vrf_proof?': 'string | null',
  },
});

const TenureChangePayload = type({
  tx_type: "'tenure_change'",
  tenure_change_payload: {
    tenure_consensus_hash: 'string',
    prev_tenure_consensus_hash: 'string',
    burn_view_consensus_hash: 'string',
    previous_tenure_end: 'string',
    previous_tenure_blocks: 'number',
    cause:
      "'block_found' | 'extended' | 'extended_runtime' | 'extended_read_count' | 'extended_read_length' | 'extended_write_count' | 'extended_write_length'",
    pubkey_hash: 'string',
  },
});

// === Confirmed Transactions ===

const ConfirmedTokenTransfer =
  BaseTxFields.and(ConfirmedTxFields).and(TokenTransferPayload);
const ConfirmedSmartContract =
  BaseTxFields.and(ConfirmedTxFields).and(SmartContractPayload);
const ConfirmedContractCall =
  BaseTxFields.and(ConfirmedTxFields).and(ContractCallPayload);
const ConfirmedPoisonMicroblock = BaseTxFields.and(ConfirmedTxFields).and(
  PoisonMicroblockPayload
);
const ConfirmedCoinbase =
  BaseTxFields.and(ConfirmedTxFields).and(CoinbasePayload);
const ConfirmedTenureChange =
  BaseTxFields.and(ConfirmedTxFields).and(TenureChangePayload);

const ConfirmedTransaction = ConfirmedTokenTransfer.or(ConfirmedSmartContract)
  .or(ConfirmedContractCall)
  .or(ConfirmedPoisonMicroblock)
  .or(ConfirmedCoinbase)
  .or(ConfirmedTenureChange);

// === Pending Transactions ===

const PendingTokenTransfer =
  BaseTxFields.and(PendingTxFields).and(TokenTransferPayload);
const PendingSmartContract =
  BaseTxFields.and(PendingTxFields).and(SmartContractPayload);
const PendingContractCall =
  BaseTxFields.and(PendingTxFields).and(ContractCallPayload);
const PendingPoisonMicroblock = BaseTxFields.and(PendingTxFields).and(
  PoisonMicroblockPayload
);
const PendingCoinbase = BaseTxFields.and(PendingTxFields).and(CoinbasePayload);
const PendingTenureChange =
  BaseTxFields.and(PendingTxFields).and(TenureChangePayload);

const PendingTransaction = PendingTokenTransfer.or(PendingSmartContract)
  .or(PendingContractCall)
  .or(PendingPoisonMicroblock)
  .or(PendingCoinbase)
  .or(PendingTenureChange);

// === Final Export ===

export const StacksTransaction = ConfirmedTransaction.or(PendingTransaction);
