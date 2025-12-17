import { createFileRoute, notFound } from '@tanstack/react-router';
import { useMemo } from 'react';
import { NETWORK, Network } from '@/lib/constants';
import { getContractAbi } from '@/lib/stacks-api';
import { type ClarityAbiType, getTypeString } from '@clarigen/core';
import { type } from 'arktype';
import { useAppForm } from '@/hooks/form';
import { fieldContext } from '@/hooks/form-context';
import { ClarityField } from '@/components/tx-builder';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

function parseNetwork(network: string): NETWORK | null {
  const result = Network(network);
  if (result instanceof type.errors) return null;
  if (result === 'devnet') return null;
  return result;
}

function parseContractAddress(contractAddress: string): { address: string; contractName: string } | null {
  const parts = contractAddress.split('.');
  if (parts.length !== 2) return null;
  const [address, contractName] = parts;
  if (!address || !contractName) return null;
  return { address, contractName };
}

export const Route = createFileRoute('/tx/$network/$contractAddress/$functionName')({
  loader: async ({ params }) => {
    const network = parseNetwork(params.network);
    if (!network) {
      throw notFound();
    }

    const contract = parseContractAddress(params.contractAddress);
    if (!contract) {
      throw notFound();
    }

    const abi = await getContractAbi(network, params.contractAddress);
    const func = abi.functions.find(
      (f) => f.name === params.functionName && f.access !== 'private'
    );

    if (!func) {
      throw notFound();
    }

    return {
      network,
      contractId: params.contractAddress,
      contract,
      func,
      abi,
    };
  },
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
  const { network, contractId, func } = Route.useLoaderData();

  const defaultValues = useMemo(() => {
    const values: Record<string, unknown> = {};
    for (const arg of func.args) {
      values[arg.name] = getDefaultValue(arg.type);
    }
    return values;
  }, [func.args]);

  const form = useAppForm({
    defaultValues,
    onSubmit: ({ value }) => {
      console.log('Form submitted:', value);
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {network}
          </span>
          <h1 className="text-2xl font-bold">{contractId}</h1>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            {func.name}
            <span className="ml-2 text-xs text-muted-foreground">
              ({func.access})
            </span>
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <FieldGroup>
                {func.args.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No arguments</p>
                ) : (
                  func.args.map((arg) => (
                    <form.Field key={arg.name} name={arg.name as never}>
                      {(field) => (
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

                <Button type="submit" className="w-full mt-4">
                  Build Transaction
                </Button>
              </FieldGroup>
            </form.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
}
