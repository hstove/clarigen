import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { NETWORK, Network } from '@/lib/constants';
import { type ClarityAbiType, getTypeString } from '@clarigen/core';
import { cvToHex } from '@stacks/transactions';
import { request } from '@stacks/connect';
import { type } from 'arktype';
import { useAppForm } from '@/hooks/form';
import { fieldContext } from '@/hooks/form-context';
import { FocusedFieldProvider } from '@/hooks/use-focused-field';
import { ClarityField, NetworkMismatchBanner } from '@/components/tx-builder';
import { getClarityValidators } from '@/lib/clarity-validators';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useContractFunction, useContractFunctions } from '@/hooks/use-contract-abi';
import { useTxUrlState } from '@/hooks/use-tx-url-state';
import { useTransaction } from '@/hooks/use-transaction';
import { formValuesToFunctionArgs, txArgsToFormValues } from '@/lib/clarity-form-utils';
import { ContextPanel } from '@/components/tx-builder/context-panel';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Link } from '@tanstack/react-router';

function parseNetwork(network: string): NETWORK | null {
  const result = Network(network);
  if (result instanceof type.errors) return null;
  return result;
}

export const Route = createFileRoute('/tx/$network/$contractAddress/$functionName')({
  component: TxBuilderPage,
});

function getDefaultValue(type: ClarityAbiType): unknown {
  if (typeof type === 'string') {
    switch (type) {
      case 'bool':
        return false;
      case 'uint128':
      case 'int128':
      case 'principal':
      case 'trait_reference':
        return '';
      case 'none':
        return null;
    }
  }
  if ('buffer' in type) return '';
  if ('string-ascii' in type) return '';
  if ('string-utf8' in type) return '';
  if ('optional' in type) return { isNone: true, value: null };
  if ('list' in type) return [];
  if ('tuple' in type) {
    const obj: Record<string, unknown> = {};
    for (const member of type.tuple) {
      obj[member.name] = getDefaultValue(member.type);
    }
    return obj;
  }
  return '';
}

function TxBuilderPage() {
  const { network: networkParam, contractAddress, functionName } = Route.useParams();
  const network = parseNetwork(networkParam)!;

  return (
    <TxBuilderContent network={network} contractId={contractAddress} functionName={functionName} />
  );
}

type TxBuilderContentProps = {
  network: NETWORK;
  contractId: string;
  functionName: string;
};

function TxBuilderContent({ network, contractId, functionName }: TxBuilderContentProps) {
  const { data: func, isLoading, error } = useContractFunction(network, contractId, functionName);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-muted-foreground">Loading contract function…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <NetworkMismatchBanner
          network={network}
          contractId={contractId}
          functionName={functionName}
        />
        <p className="text-sm text-destructive">Failed to load contract data.</p>
      </div>
    );
  }

  if (!func) {
    return (
      <FunctionNotFound
        network={network}
        contractId={contractId}
        requestedFunction={functionName}
      />
    );
  }

  return (
    <TxBuilderForm
      key={`${network}-${contractId}-${func.name}`}
      network={network}
      contractId={contractId}
      func={func}
    />
  );
}

function FunctionNotFound({
  network,
  contractId,
  requestedFunction,
}: {
  network: NETWORK;
  contractId: string;
  requestedFunction: string;
}) {
  const { data: functions, isLoading } = useContractFunctions(network, contractId);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <NetworkMismatchBanner
        network={network}
        contractId={contractId}
        functionName={requestedFunction}
      />
      <div className="space-y-6 mb-6">
        <Breadcrumbs network={network} contractId={contractId} functionName={requestedFunction} />
        <div className="space-y-2">
          <h1 className="font-mono text-lg font-medium tracking-tight">{contractId}</h1>
          <p className="text-sm text-destructive font-mono">
            Function "{requestedFunction}" not found.
          </p>
        </div>
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="font-mono text-sm font-medium">Available Functions</h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground font-mono italic">Loading functions...</p>
          ) : !functions || functions.length === 0 ? (
            <p className="text-sm text-muted-foreground font-mono italic">No functions found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Public Functions
                </h3>
                <ul className="space-y-1">
                  {functions
                    .filter(f => f.access === 'public')
                    .map(f => (
                      <li key={f.name}>
                        <Link
                          to="/tx/$network/$contractAddress/$functionName"
                          params={{ network, contractAddress: contractId, functionName: f.name }}
                          className="text-sm font-mono text-primary hover:underline"
                        >
                          {f.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Read-Only Functions
                </h3>
                <ul className="space-y-1">
                  {functions
                    .filter(f => f.access === 'read_only')
                    .map(f => (
                      <li key={f.name}>
                        <Link
                          to="/tx/$network/$contractAddress/$functionName"
                          params={{ network, contractAddress: contractId, functionName: f.name }}
                          className="text-sm font-mono text-primary hover:underline"
                        >
                          {f.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type TxBuilderFormProps = {
  network: NETWORK;
  contractId: string;
  func: { name: string; access: string; args: { name: string; type: ClarityAbiType }[] };
};

function TxBuilderForm({ network, contractId, func }: TxBuilderFormProps) {
  const { urlState, setUrlState } = useTxUrlState(func.args);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const [readResult, setReadResult] = useState<{
    okay: boolean;
    result?: string;
    value?: any;
    clarity?: string;
    error?: string;
  } | null>(null);
  const txid = urlState.txid as string | undefined;

  const { data: tx, error: txError } = useTransaction(network, txid);

  const txValues = useMemo(() => {
    if (tx && 'contract_call' in tx && tx.contract_call.function_args) {
      return txArgsToFormValues(tx.contract_call.function_args);
    }
    return null;
  }, [tx]);

  // Compute initial values only once based on URL state or tx args
  const initialValues = useMemo(() => {
    if (txValues) return txValues;
    const values: Record<string, unknown> = {};
    for (const arg of func.args) {
      const urlValue = urlState[arg.name];
      values[arg.name] = urlValue !== undefined ? urlValue : getDefaultValue(arg.type);
    }
    return values;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only compute on mount or when tx loaded
  }, [func.args, urlState, txValues]);

  const form = useAppForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      setConversionError(null);
      setReadResult(null);
      try {
        if (func.access === 'read_only') {
          const query = new URLSearchParams();
          for (const arg of func.args) {
            const val = value[arg.name];
            if (val !== null && typeof val === 'object') {
              query.set(arg.name, JSON.stringify(val));
            } else {
              query.set(arg.name, String(val ?? ''));
            }
          }
          const response = await fetch(
            `/read/${network}/${contractId}/${func.name}?${query.toString()}`
          );
          const result = await response.json();
          setReadResult(result);
          if (!result.okay) {
            setConversionError(result.error || 'Failed to call function');
          }
        } else {
          const clarityArgs = formValuesToFunctionArgs(value, func.args);
          const response = await request('stx_callContract', {
            contract: contractId as `${string}.${string}`,
            functionName: func.name,
            functionArgs: clarityArgs.map(arg => cvToHex(arg)),
            postConditionMode: 'allow',
          });

          if (response.txid) {
            await setUrlState({ txid: response.txid });
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to submit transaction';
        setConversionError(message);
        console.error('Submission error:', error);
      }
    },
  });

  // Sync form changes to URL
  useEffect(() => {
    if (txid) return; // Don't sync to URL if we're viewing a transaction
    return form.store.subscribe(() => {
      const formValues = form.store.state.values;
      setUrlState(formValues);
    });
  }, [form.store, setUrlState, txid]);

  // Update form values if tx loaded
  useEffect(() => {
    if (txValues) {
      form.reset(txValues);
    }
  }, [txValues, form]);

  return (
    <FocusedFieldProvider>
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Network mismatch warning */}
        <NetworkMismatchBanner network={network} contractId={contractId} functionName={func.name} />

        {/* Header */}
        <div className="space-y-6 mb-6">
          <Breadcrumbs network={network} contractId={contractId} functionName={func.name} />
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground">{func.access}</span>
            </div>
            <h1 className="font-mono text-lg font-medium tracking-tight">{contractId}</h1>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Context Panel - shows first on mobile, second on desktop */}
          <div className="lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <ContextPanel txid={txid} tx={tx} txError={txError} network={network} />
          </div>

          {/* Primary: Function Form */}
          <div className="lg:order-1">
            <div className="border border-border bg-card">
              <div className="border-b border-border px-4 py-3 flex items-center justify-between">
                <h2 className="font-mono text-sm font-medium">{func.name}</h2>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                </span>
              </div>

              {readResult && readResult.okay && (
                <div className="border-b border-border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-600 dark:text-green-500 flex items-center gap-1.5">
                      <span>●</span> Result
                    </span>
                  </div>
                  <pre className="font-mono text-sm p-3 bg-background border border-border overflow-auto break-all whitespace-pre-wrap">
                    {readResult.clarity}
                  </pre>
                  {typeof readResult.value !== 'undefined' && (
                    <details className="group">
                      <summary className="text-[10px] text-muted-foreground font-medium uppercase cursor-pointer hover:text-foreground">
                        JSON Value
                      </summary>
                      <pre className="text-xs font-mono p-3 bg-background border border-border overflow-auto max-h-60 mt-2">
                        {JSON.stringify(readResult.value, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <form.AppForm>
                  <div className="p-4">
                    <FieldGroup>
                      {func.args.length === 0 ? (
                        <p className="text-sm text-muted-foreground font-mono">( no arguments )</p>
                      ) : (
                        func.args.map(arg => (
                          <form.Field
                            key={arg.name}
                            name={arg.name as never}
                            validators={getClarityValidators(arg.type)}
                          >
                            {field => (
                              <fieldContext.Provider value={field}>
                                <ClarityField
                                  name={arg.name}
                                  type={arg.type}
                                  label={`${arg.name}: ${getTypeString(arg.type)}`}
                                  disabled={!!txid}
                                />
                              </fieldContext.Provider>
                            )}
                          </form.Field>
                        ))
                      )}

                      {conversionError && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 font-mono">
                          {conversionError}
                        </div>
                      )}
                    </FieldGroup>
                  </div>

                  <div className="border-t border-border p-4 bg-muted/20">
                    {txid ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setUrlState({ txid: null })}
                      >
                        clone to new
                      </Button>
                    ) : (
                      <form.Subscribe
                        selector={state => ({
                          isSubmitting: state.isSubmitting,
                          canSubmit: state.canSubmit,
                        })}
                      >
                        {(state: { isSubmitting: boolean; canSubmit: boolean }) => (
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={state.isSubmitting || !state.canSubmit}
                          >
                            {state.isSubmitting
                              ? 'processing...'
                              : func.access === 'read_only'
                              ? 'call function'
                              : 'build transaction'}
                          </Button>
                        )}
                      </form.Subscribe>
                    )}
                  </div>
                </form.AppForm>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FocusedFieldProvider>
  );
}
