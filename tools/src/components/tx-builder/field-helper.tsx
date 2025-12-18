import { useState } from 'react';
import { useFocusedField, type FocusedField } from '@/hooks/use-focused-field';
import {
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiOptional,
  isClarityAbiList,
  isClarityAbiTuple,
  getTypeString,
} from '@clarigen/core';
import { UintHelper } from './helpers/uint-helper';
import { PrincipalHelper as PrincipalHelperComponent } from './helpers/principal-helper';
import { HistoryHelper } from './helpers/history-helper';
import { X } from 'lucide-react';
import type { NETWORK } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ClaridocFunction } from '@clarigen/docs';
import { DocText } from './doc-text';

function getFieldTypeCategory(field: FocusedField): string {
  const { type } = field;

  if (isClarityAbiPrimitive(type)) {
    switch (type) {
      case 'uint128':
      case 'int128':
        return 'number';
      case 'bool':
        return 'bool';
      case 'principal':
        return 'principal';
      case 'trait_reference':
        return 'trait';
      case 'none':
        return 'none';
    }
  }

  if (isClarityAbiBuffer(type)) return 'buffer';
  if (isClarityAbiStringAscii(type)) return 'string-ascii';
  if (isClarityAbiStringUtf8(type)) return 'string-utf8';
  if (isClarityAbiOptional(type)) return 'optional';
  if (isClarityAbiList(type)) return 'list';
  if (isClarityAbiTuple(type)) return 'tuple';

  return 'unknown';
}

function NumberHelper({ field }: { field: FocusedField }) {
  // Use UintHelper if setValue function is available
  if (field.setValue) {
    return <UintHelper field={field} onApply={field.setValue} />;
  }

  // Fallback to basic helper if no setValue available (shouldn't happen in normal flow)
  const isSigned = field.type === 'int128';
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {isSigned ? 'Signed' : 'Unsigned'} 128-bit integer
      </p>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Enter a whole number</p>
        {!isSigned && <p>• Must be non-negative</p>}
        <p>• For token amounts, remember decimals (e.g., 1 STX = 1000000)</p>
      </div>
    </div>
  );
}

function PrincipalHelper({
  field,
  network,
  contractId,
}: {
  field: FocusedField;
  network: NETWORK;
  contractId: string;
}) {
  // Use the enhanced helper if setValue is available
  if (field.setValue) {
    return (
      <PrincipalHelperComponent
        field={field}
        onApply={field.setValue}
        network={network}
        contractId={contractId}
      />
    );
  }

  // Fallback to basic helper
  const isContract = field.type === 'trait_reference';
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {isContract ? 'Contract principal' : 'Stacks address'}
      </p>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Mainnet: starts with SP...</p>
        <p>• Testnet: starts with ST...</p>
        {isContract && <p>• Format: address.contract-name</p>}
      </div>
    </div>
  );
}

function BufferHelper({ field }: { field: FocusedField }) {
  const maxLen = isClarityAbiBuffer(field.type) ? field.type.buffer.length : 0;
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Buffer (max {maxLen} bytes)</p>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Enter hex-encoded bytes</p>
        <p>• With or without 0x prefix</p>
        <p>• Example: 0x48454c4c4f</p>
      </div>
    </div>
  );
}

function StringHelper({ field }: { field: FocusedField }) {
  const isAscii = isClarityAbiStringAscii(field.type);
  const maxLen = isAscii
    ? (field.type as { 'string-ascii': { length: number } })['string-ascii'].length
    : (field.type as { 'string-utf8': { length: number } })['string-utf8'].length;

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {isAscii ? 'ASCII string' : 'UTF-8 string'} (max {maxLen} {isAscii ? 'chars' : 'bytes'})
      </p>
      <div className="text-xs text-muted-foreground space-y-1">
        {isAscii ? <p>• ASCII characters only (codes 0-127)</p> : <p>• Any valid UTF-8 text</p>}
      </div>
    </div>
  );
}

function BoolHelper() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Boolean value</p>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Toggle on for true</p>
        <p>• Toggle off for false</p>
      </div>
    </div>
  );
}

function DefaultHelper({ field }: { field: FocusedField }) {
  const category = getFieldTypeCategory(field);
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground capitalize">{category} field</p>
      <p className="text-xs text-muted-foreground">
        Type: <code className="bg-muted px-1 rounded">{getTypeString(field.type)}</code>
      </p>
    </div>
  );
}

function FieldHelperContent({
  field,
  network,
  contractId,
}: {
  field: FocusedField;
  network: NETWORK;
  contractId: string;
}) {
  const category = getFieldTypeCategory(field);

  switch (category) {
    case 'number':
      return <NumberHelper field={field} />;
    case 'principal':
    case 'trait':
      return <PrincipalHelper field={field} network={network} contractId={contractId} />;
    case 'buffer':
      return <BufferHelper field={field} />;
    case 'string-ascii':
    case 'string-utf8':
      return <StringHelper field={field} />;
    case 'bool':
      return <BoolHelper />;
    default:
      return <DefaultHelper field={field} />;
  }
}

function NoFieldFocused() {
  return <p className="text-xs text-muted-foreground">Focus a field to see contextual help.</p>;
}

type TabId = 'tools' | 'recent';

function TabButton({
  id,
  label,
  active,
  onClick,
}: {
  id: TabId;
  label: string;
  active: boolean;
  onClick: (id: TabId) => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        'px-3 py-1.5 font-mono text-xs transition-colors',
        active
          ? 'border-b-2 border-primary text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
}

interface FieldHelperProps {
  network: NETWORK;
  contractId: string;
  functionName: string;
  functionDoc?: ClaridocFunction;
}

export function FieldHelper({ network, contractId, functionName, functionDoc }: FieldHelperProps) {
  const { focusedField, setFocusedField } = useFocusedField();
  const [activeTab, setActiveTab] = useState<TabId>('tools');
  const paramDocs = focusedField
    ? functionDoc?.comments.params[focusedField.name]?.comments ?? []
    : [];
  const hasParamDocs = paramDocs.some(line => line.trim() !== '');

  return (
    <div className="border border-border bg-card h-full">
      <div className="border-b border-border px-4 py-3 bg-muted/30 flex items-center justify-between">
        <h3 className="font-mono text-sm font-medium text-muted-foreground">field helper</h3>
        {focusedField && (
          <button
            type="button"
            onClick={() => setFocusedField(null)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
            aria-label="Clear field helper"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {focusedField && (
        <div className="flex border-b border-border">
          <TabButton
            id="tools"
            label="tools"
            active={activeTab === 'tools'}
            onClick={setActiveTab}
          />
          <TabButton
            id="recent"
            label="recent"
            active={activeTab === 'recent'}
            onClick={setActiveTab}
          />
        </div>
      )}

      <div className="p-4">
        {focusedField ? (
          <div className="space-y-4">
            <div className="font-mono text-sm font-medium">{focusedField.name}</div>
            {hasParamDocs && (
              <div className="border border-border/60 bg-muted/30 p-3">
                <DocText text={paramDocs} />
              </div>
            )}
            {activeTab === 'tools' ? (
              <FieldHelperContent field={focusedField} network={network} contractId={contractId} />
            ) : (
              <HistoryHelper
                contractId={contractId}
                functionName={functionName}
                field={focusedField}
              />
            )}
          </div>
        ) : (
          <NoFieldFocused />
        )}
      </div>
    </div>
  );
}
