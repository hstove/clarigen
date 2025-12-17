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
import { formValuesToFunctionArgs } from '@/lib/clarity-form-utils';

function parseNetwork(network: string): NETWORK | null {
  const result = Network(network);
  if (result instanceof type.errors) return null;
  return result;
}

function parseContractAddress(
  contractAddress: string
): { address: string; contractName: string } | null {
  const parts = contractAddress.split('.');
  if (parts.length !== 2) return null;
  const [address, contractName] = parts;
  if (!address || !contractName) return null;
  return { address, contractName };
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
  const network = parseNetwork(networkParam);
  const contract = parseContractAddress(contractAddress);

  if (!network || !contract) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-destructive">Invalid transaction URL.</p>
      </div>
    );
  }

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
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{network}</span>
          <h1 className="text-2xl font-bold">{contractId}</h1>
        </div>

        {txid && (
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Transaction Submitted
            </h3>
            <p className="text-xs font-mono break-all text-blue-800 dark:text-blue-200">{txid}</p>
            <a
              href={`https://explorer.hiro.so/txid/${txid}?chain=${network}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 underline mt-2 inline-block font-medium hover:text-blue-800 dark:hover:text-blue-300"
            >
              View on Explorer
            </a>
          </div>
        )}

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            {func.name}
            <span className="ml-2 text-xs text-muted-foreground">({func.access})</span>
          </h2>

          {readResult && readResult.okay && (
            <div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Function Result</h3>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Success
                </span>
              </div>
              <div className="font-mono text-sm p-3 bg-background border rounded-md break-all shadow-sm">
                {readResult.clarity}
              </div>
              {typeof readResult.value !== 'undefined' && (
                <div className="space-y-1">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase">
                    JSON Value
                  </span>
                  <pre className="text-xs p-3 bg-background border rounded-md overflow-auto max-h-60 shadow-sm">
                    {JSON.stringify(readResult.value, null, 2)}
                  </pre>
                </div>
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
              <FieldGroup>
                {func.args.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No arguments</p>
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
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    {conversionError}
                  </div>
                )}

                <form.Subscribe selector={state => state.isSubmitting}>
                  {(isSubmitting: boolean) => (
                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                      {isSubmitting
                        ? 'Processing...'
                        : func.access === 'read_only'
                        ? 'Call Function'
                        : 'Build Transaction'}
                    </Button>
                  )}
                </form.Subscribe>
              </FieldGroup>
            </form.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
}
