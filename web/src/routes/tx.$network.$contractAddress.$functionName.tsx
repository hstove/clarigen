import { createFileRoute, notFound } from '@tanstack/react-router';
import { NETWORK, Network } from '@/lib/constants';
import { getContractAbi } from '@/lib/stacks-api';
import { type ClarityAbiType, getTypeString } from '@clarigen/core';
import { type } from 'arktype';

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

function TxBuilderPage() {
  const { network, contractId, func } = Route.useLoaderData();

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
          <h2 className="text-lg font-semibold mb-2">
            {func.name}
            <span className="ml-2 text-xs text-muted-foreground">
              ({func.access})
            </span>
          </h2>

          {func.args.length === 0 ? (
            <p className="text-sm text-muted-foreground">No arguments</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium">Arguments:</p>
              <ul className="space-y-1 text-sm">
                {func.args.map((arg) => (
                  <li key={arg.name} className="font-mono">
                    {arg.name}: <TypeDisplay type={arg.type} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypeDisplay({ type: abiType }: { type: ClarityAbiType }) {
  return (
    <span className="text-muted-foreground">{getTypeString(abiType)}</span>
  );
}
