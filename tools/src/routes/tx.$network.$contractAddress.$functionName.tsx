import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { type NETWORK, Network } from '@/lib/constants';
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
import {
  useContractFunction,
  useContractFunctions,
} from '@/hooks/use-contract-abi';
import { useContractDocs } from '@/hooks/use-contract-docs';
import { useTxUrlState } from '@/hooks/use-tx-url-state';
import { usePostConditionsUrlState } from '@/hooks/use-post-conditions-url-state';
import { useTransaction } from '@/hooks/use-transaction';
import {
  formValuesToFunctionArgs,
  txArgsToFormValues,
} from '@/lib/clarity-form-utils';
import { buildPostConditions } from '@/lib/post-conditions';
import { saveFormHistory } from '@/lib/value-history';
import { addVisitedFunction } from '@/lib/visited-history';
import { ContextPanel } from '@/components/tx-builder/context-panel';
import { PostConditionsField } from '@/components/tx-builder/post-conditions-field';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Link } from '@tanstack/react-router';
import { DocText } from '@/components/tx-builder/doc-text';
import type { AnyFieldApi } from '@tanstack/react-form';

function serializeValueForHistory(value: unknown): string | null {
  if (value === null || value === undefined) return null;

  // Optional type with none selected - skip
  if (typeof value === 'object' && 'isNone' in value) {
    const optValue = value as { isNone: boolean; value: unknown };
    if (optValue.isNone) return null;
    return serializeValueForHistory(optValue.value);
  }

  // Skip complex types (arrays/lists, nested tuples)
  if (Array.isArray(value)) return null;
  if (typeof value === 'object') return null;

  // Primitives: convert to string
  const str = String(value);
  return str.trim() === '' ? null : str;
}

function parseNetwork(network: string): NETWORK | null {
  const result = Network(network);
  if (result instanceof type.errors) return null;
  return result;
}

export const Route = createFileRoute(
  '/tx/$network/$contractAddress/$functionName'
)({
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
  const {
    network: networkParam,
    contractAddress,
    functionName,
  } = Route.useParams();
  const network = parseNetwork(networkParam)!;

  return (
    <TxBuilderContent
      contractId={contractAddress}
      functionName={functionName}
      network={network}
    />
  );
}

type TxBuilderContentProps = {
  network: NETWORK;
  contractId: string;
  functionName: string;
};

function TxBuilderContent({
  network,
  contractId,
  functionName,
}: TxBuilderContentProps) {
  const {
    data: func,
    isLoading,
    error,
  } = useContractFunction(network, contractId, functionName);

  useEffect(() => {
    addVisitedFunction(contractId, functionName, network);
  }, [contractId, functionName, network]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <p className="text-muted-foreground text-sm">
          Loading contract function…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <NetworkMismatchBanner
          contractId={contractId}
          functionName={functionName}
          network={network}
        />
        <p className="text-destructive text-sm">
          Failed to load contract data.
        </p>
      </div>
    );
  }

  if (!func) {
    return (
      <FunctionNotFound
        contractId={contractId}
        network={network}
        requestedFunction={functionName}
      />
    );
  }

  return (
    <TxBuilderForm
      contractId={contractId}
      func={func}
      key={`${network}-${contractId}-${func.name}`}
      network={network}
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
  const { data: functions, isLoading } = useContractFunctions(
    network,
    contractId
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <NetworkMismatchBanner
        contractId={contractId}
        functionName={requestedFunction}
        network={network}
      />
      <div className="mb-6 space-y-6">
        <Breadcrumbs
          contractId={contractId}
          functionName={requestedFunction}
          network={network}
        />
        <div className="space-y-2">
          <h1 className="font-medium font-mono text-lg tracking-tight">
            {contractId}
          </h1>
          <p className="font-mono text-destructive text-sm">
            Function "{requestedFunction}" not found.
          </p>
        </div>
      </div>

      <div className="border border-border bg-card">
        <div className="border-border border-b px-4 py-3">
          <h2 className="font-medium font-mono text-sm">Available Functions</h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <p className="font-mono text-muted-foreground text-sm italic">
              Loading functions...
            </p>
          ) : !functions || functions.length === 0 ? (
            <p className="font-mono text-muted-foreground text-sm italic">
              No functions found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  Public Functions
                </h3>
                <ul className="space-y-1">
                  {functions
                    .filter((f) => f.access === 'public')
                    .map((f) => (
                      <li key={f.name}>
                        <Link
                          className="font-mono text-primary text-sm hover:underline"
                          params={{
                            network,
                            contractAddress: contractId,
                            functionName: f.name,
                          }}
                          to="/tx/$network/$contractAddress/$functionName"
                        >
                          {f.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  Read-Only Functions
                </h3>
                <ul className="space-y-1">
                  {functions
                    .filter((f) => f.access === 'read_only')
                    .map((f) => (
                      <li key={f.name}>
                        <Link
                          className="font-mono text-primary text-sm hover:underline"
                          params={{
                            network,
                            contractAddress: contractId,
                            functionName: f.name,
                          }}
                          to="/tx/$network/$contractAddress/$functionName"
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
  func: {
    name: string;
    access: string;
    args: { name: string; type: ClarityAbiType }[];
  };
};

function TxBuilderForm({ network, contractId, func }: TxBuilderFormProps) {
  const { urlState, setUrlState } = useTxUrlState(func.args);
  const { postConditions, setPostConditions } = usePostConditionsUrlState();
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
  const { data: contractDocs } = useContractDocs(network, contractId);
  const functionDoc = useMemo(
    () => contractDocs?.functions.find((doc) => doc.abi.name === func.name),
    [contractDocs, func.name]
  );
  const functionDocText = functionDoc?.comments.text ?? [];
  const hasFunctionDocs = functionDocText.some((line) => line.trim() !== '');

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
      values[arg.name] =
        urlValue !== undefined ? urlValue : getDefaultValue(arg.type);
    }
    return values;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only compute on mount or when tx loaded
  }, [func.args, urlState, txValues]);

  const form = useAppForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      setConversionError(null);
      setReadResult(null);

      const saveHistory = () => {
        const argsToSave = func.args
          .map((arg) => {
            const serialized = serializeValueForHistory(value[arg.name]);
            if (serialized === null) return null;
            return {
              name: arg.name,
              type: getTypeString(arg.type),
              value: serialized,
            };
          })
          .filter((arg): arg is NonNullable<typeof arg> => arg !== null);

        saveFormHistory(contractId, func.name, argsToSave);
      };

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
          if (result.okay) {
            saveHistory();
          } else {
            setConversionError(result.error || 'Failed to call function');
          }
        } else {
          const clarityArgs = formValuesToFunctionArgs(value, func.args);
          const builtPostConditions = buildPostConditions(
            postConditions.conditions
          );
          const response = await request('stx_callContract', {
            contract: contractId as `${string}.${string}`,
            functionName: func.name,
            functionArgs: clarityArgs.map((arg) => cvToHex(arg)),
            postConditionMode: postConditions.mode,
            postConditions: builtPostConditions,
          });

          if (response.txid) {
            saveHistory();
            await setUrlState({ txid: response.txid });
          }
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to submit transaction';
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
        <NetworkMismatchBanner
          contractId={contractId}
          functionName={func.name}
          network={network}
        />

        {/* Header */}
        <div className="mb-6 space-y-6">
          <Breadcrumbs
            contractId={contractId}
            functionName={func.name}
            network={network}
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground">{func.access}</span>
            </div>
            <h1 className="font-medium font-mono text-lg tracking-tight">
              {contractId}
            </h1>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Context Panel - shows first on mobile, second on desktop */}
          <div className="lg:sticky lg:top-6 lg:order-2 lg:self-start">
            <ContextPanel
              contractId={contractId}
              functionDoc={functionDoc}
              functionName={func.name}
              network={network}
              tx={tx}
              txError={txError}
              txid={txid}
            />
          </div>

          {/* Primary: Function Form */}
          <div className="lg:order-1">
            <div className="border border-border bg-card">
              <div className="flex items-center justify-between border-border border-b px-4 py-3">
                <h2 className="font-medium font-mono text-sm">{func.name}</h2>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  {func.args.length} {func.args.length === 1 ? 'arg' : 'args'}
                </span>
              </div>

              {hasFunctionDocs && (
                <div className="border-border border-b bg-muted/20 px-4 py-3">
                  <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Documentation
                  </div>
                  <DocText text={functionDocText} />
                </div>
              )}

              {readResult?.okay && (
                <div className="space-y-3 border-border border-b bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium text-green-600 text-xs dark:text-green-500">
                      <span>●</span> Result
                    </span>
                  </div>
                  <pre className="overflow-auto whitespace-pre-wrap break-all border border-border bg-background p-3 font-mono text-sm">
                    {readResult.clarity}
                  </pre>
                  {typeof readResult.value !== 'undefined' && (
                    <details className="group">
                      <summary className="cursor-pointer font-medium text-[10px] text-muted-foreground uppercase hover:text-foreground">
                        JSON Value
                      </summary>
                      <pre className="mt-2 max-h-60 overflow-auto border border-border bg-background p-3 font-mono text-xs">
                        {JSON.stringify(readResult.value, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <form.AppForm>
                  <div className="p-4">
                    <FieldGroup>
                      {func.args.length === 0 ? (
                        <p className="font-mono text-muted-foreground text-sm">
                          ( no arguments )
                        </p>
                      ) : (
                        func.args.map((arg) => (
                          <form.Field
                            key={arg.name}
                            name={arg.name as never}
                            validators={getClarityValidators(arg.type)}
                          >
                            {(field) => (
                              <fieldContext.Provider
                                value={field as unknown as AnyFieldApi}
                              >
                                <ClarityField
                                  disabled={!!txid}
                                  label={`${arg.name}: ${getTypeString(arg.type)}`}
                                  name={arg.name}
                                  type={arg.type}
                                />
                              </fieldContext.Provider>
                            )}
                          </form.Field>
                        ))
                      )}

                      {conversionError && (
                        <div className="border border-destructive/20 bg-destructive/10 p-3 font-mono text-destructive text-sm">
                          {conversionError}
                        </div>
                      )}
                    </FieldGroup>
                  </div>

                  {/* Post-conditions section - only for public functions */}
                  {func.access === 'public' && (
                    <details className="border-border border-t">
                      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-muted/30">
                        <span className="font-medium font-mono text-xs">
                          Post-Conditions
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {postConditions.conditions.length} defined
                        </span>
                      </summary>
                      <div className="px-4 pb-4">
                        <PostConditionsField
                          disabled={!!txid}
                          onChange={setPostConditions}
                          value={postConditions}
                        />
                      </div>
                    </details>
                  )}

                  <div className="border-border border-t bg-muted/20 p-4">
                    {txid ? (
                      <Button
                        className="w-full"
                        onClick={() => setUrlState({ txid: null })}
                        type="button"
                        variant="outline"
                      >
                        clone to new
                      </Button>
                    ) : (
                      <form.Subscribe
                        selector={(state) => ({
                          isSubmitting: state.isSubmitting,
                          canSubmit: state.canSubmit,
                        })}
                      >
                        {(state: {
                          isSubmitting: boolean;
                          canSubmit: boolean;
                        }) => (
                          <Button
                            className="w-full"
                            disabled={state.isSubmitting || !state.canSubmit}
                            type="submit"
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
