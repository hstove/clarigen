/** biome-ignore-all lint/style/useTrimStartEnd: suppressed */
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
    // biome-ignore lint/style/useDefaultSwitchClause: ignored using `--suppress`
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
      <p className="text-muted-foreground text-xs">
        {isSigned ? 'Signed' : 'Unsigned'} 128-bit integer
      </p>
      <div className="space-y-1 text-muted-foreground text-xs">
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
        contractId={contractId}
        field={field}
        network={network}
        onApply={field.setValue}
      />
    );
  }

  // Fallback to basic helper
  const isContract = field.type === 'trait_reference';
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">
        {isContract ? 'Contract principal' : 'Stacks address'}
      </p>
      <div className="space-y-1 text-muted-foreground text-xs">
        <p>• Mainnet: starts with SP...</p>
        <p>• Testnet: starts with ST...</p>
        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {isContract && <p>• Format: address.contract-name</p>}
      </div>
    </div>
  );
}

function BufferHelper({ field }: { field: FocusedField }) {
  const maxLen = isClarityAbiBuffer(field.type) ? field.type.buffer.length : 0;
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">
        Buffer (max {maxLen} bytes)
      </p>
      <div className="space-y-1 text-muted-foreground text-xs">
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
    ? (field.type as { 'string-ascii': { length: number } })['string-ascii']
        .length
    : (field.type as { 'string-utf8': { length: number } })['string-utf8']
        .length;

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">
        {isAscii ? 'ASCII string' : 'UTF-8 string'} (max {maxLen}{' '}
        {isAscii ? 'chars' : 'bytes'})
      </p>
      <div className="space-y-1 text-muted-foreground text-xs">
        {isAscii ? (
          <p>• ASCII characters only (codes 0-127)</p>
        ) : (
          <p>• Any valid UTF-8 text</p>
        )}
      </div>
    </div>
  );
}

function BoolHelper() {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">Boolean value</p>
      <div className="space-y-1 text-muted-foreground text-xs">
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
      <p className="text-muted-foreground text-xs capitalize">
        {category} field
      </p>
      <p className="text-muted-foreground text-xs">
        Type:{' '}
        <code className="rounded bg-muted px-1">
          {getTypeString(field.type)}
        </code>
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
      return (
        <PrincipalHelper
          contractId={contractId}
          field={field}
          network={network}
        />
      );
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
  return (
    <p className="text-muted-foreground text-xs">
      Focus a field to see contextual help.
    </p>
  );
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
      className={cn(
        'px-3 py-1.5 font-mono text-xs transition-colors',
        active
          ? 'border-primary border-b-2 text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
      onClick={() => onClick(id)}
      type="button"
    >
      {label}
    </button>
  );
}

type FieldHelperProps = {
  network: NETWORK;
  contractId: string;
  functionName: string;
  functionDoc?: ClaridocFunction;
};

export function FieldHelper({
  network,
  contractId,
  functionName,
  functionDoc,
}: FieldHelperProps) {
  const { focusedField, setFocusedField } = useFocusedField();
  const [activeTab, setActiveTab] = useState<TabId>('tools');
  const paramDocs = focusedField
    ? (functionDoc?.comments.params[focusedField.name]?.comments ?? [])
    : [];
  const hasParamDocs = paramDocs.some((line) => line.trim() !== '');

  return (
    <div className="h-full border border-border bg-card">
      <div className="flex items-center justify-between border-border border-b bg-muted/30 px-4 py-3">
        <h3 className="font-medium font-mono text-muted-foreground text-sm">
          field helper
        </h3>
        {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
        {focusedField && (
          <button
            aria-label="Clear field helper"
            className="-m-1 p-1 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setFocusedField(null)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
      {focusedField && (
        <div className="flex border-border border-b">
          <TabButton
            active={activeTab === 'tools'}
            id="tools"
            label="tools"
            onClick={setActiveTab}
          />
          <TabButton
            active={activeTab === 'recent'}
            id="recent"
            label="recent"
            onClick={setActiveTab}
          />
        </div>
      )}

      <div className="p-4">
        {focusedField ? (
          <div className="space-y-4">
            <div className="font-medium font-mono text-sm">
              {focusedField.name}
            </div>
            {/** biome-ignore lint/nursery/noLeakedRender: ignored using `--suppress` */}
            {hasParamDocs && (
              <div className="border border-border/60 bg-muted/30 p-3">
                <DocText text={paramDocs} />
              </div>
            )}
            {activeTab === 'tools' ? (
              <FieldHelperContent
                contractId={contractId}
                field={focusedField}
                network={network}
              />
            ) : (
              <HistoryHelper
                contractId={contractId}
                field={focusedField}
                functionName={functionName}
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
