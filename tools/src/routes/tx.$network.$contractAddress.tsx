import { createFileRoute, Outlet } from '@tanstack/react-router';
import { NETWORK, Network } from '@/lib/constants';
import { type } from 'arktype';

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

export const Route = createFileRoute('/tx/$network/$contractAddress')({
  component: ContractLayout,
});

function ContractLayout() {
  const { network: networkParam, contractAddress } = Route.useParams();
  const network = parseNetwork(networkParam);
  const contract = parseContractAddress(contractAddress);

  if (!network || !contract) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <p className="text-sm text-destructive">Invalid contract URL.</p>
      </div>
    );
  }

  return <Outlet />;
}
