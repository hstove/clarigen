import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { NETWORK, Network } from '@/lib/constants';
import { type ClarityAbiType, getTypeString } from '@clarigen/core';
import { cvToHex } from '@stacks/transactions';
import { request } from '@stacks/connect';
import { type } from 'arktype';
import { useAppForm } from '@/hooks/form';
import { fieldContext } from '@/hooks/form-context';
import { ClarityField } from '@/components/tx-builder';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useContractFunction } from '@/hooks/use-contract-abi';
import { useTxUrlState } from '@/hooks/use-tx-url-state';
import { useTransaction } from '@/hooks/use-transaction';
import { formValuesToFunctionArgs } from '@/lib/clarity-form-utils';
import { TransactionStatus } from '@/components/tx-builder/transaction-status';
import { Breadcrumbs } from '@/components/breadcrumbs';

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
        <p className="text-sm text-destructive">Failed to load contract data.</p>
      </div>
    );
  }

  if (!func) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-destructive">
          Function not found or not accessible on this contract.
        </p>
      </div>
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

  // Compute initial values only once based on URL state at mount time
  const initialValues = useMemo(() => {
    const values: Record<string, unknown> = {};
    for (const arg of func.args) {
      const urlValue = urlState[arg.name];
      values[arg.name] = urlValue !== undefined ? urlValue : getDefaultValue(arg.type);
    }
    return values;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only compute on mount
  }, [func.args, urlState]);

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
    return form.store.subscribe(() => {
      const formValues = form.store.state.values;
      setUrlState(formValues);
    });
  }, [form.store, setUrlState]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs network={network} contractId={contractId} functionName={func.name} />

        {/* Contract Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground">{func.access}</span>
          </div>
          <h1 className="font-mono text-lg font-medium tracking-tight">{contractId}</h1>
        </div>

        {/* Transaction Status */}
        {txid && (
          <div>
            {tx ? (
              <TransactionStatus tx={tx} network={network} />
            ) : txError ? (
              <div className="border border-destructive/30 bg-destructive/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                  <span>×</span>
                  <span>Transaction Status Unavailable</span>
                </div>
                <p className="text-xs font-mono break-all text-muted-foreground">{txid}</p>
                <a
                  href={`https://explorer.hiro.so/txid/${txid}?chain=${network}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline inline-block"
                >
                  → View on Explorer
                </a>
              </div>
            ) : (
              <div className="border border-border bg-muted/30 p-4 space-y-2 animate-pulse">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-muted-foreground">◌</span>
                  <span>Loading transaction...</span>
                </div>
                <p className="text-xs font-mono break-all text-muted-foreground">{txid}</p>
                <a
                  href={`https://explorer.hiro.so/txid/${txid}?chain=${network}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline inline-block"
                >
                  → View on Explorer
                </a>
              </div>
            )}
          </div>
        )}

        {/* Function Form */}
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
              <pre className="font-mono text-sm p-3 bg-background border border-border overflow-auto break-all">
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
                      <form.Field key={arg.name} name={arg.name as never}>
                        {field => (
                          <fieldContext.Provider value={field}>
                            <ClarityField
                              name={arg.name}
                              type={arg.type}
                              label={`${arg.name}: ${getTypeString(arg.type)}`}
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
                <form.Subscribe selector={state => state.isSubmitting}>
                  {(isSubmitting: boolean) => (
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting
                        ? 'Processing...'
                        : func.access === 'read_only'
                        ? 'Call Function'
                        : 'Build Transaction'}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </form.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
}
