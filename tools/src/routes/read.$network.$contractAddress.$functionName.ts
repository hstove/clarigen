import { createFileRoute } from '@tanstack/react-router';
import { getContractAbi, getStacksApiUrl } from '@/lib/stacks-api';
import { Network, type NETWORK } from '@/lib/constants';
import { type } from 'arktype';
import {
  callReadOnlyFunction,
  queryToFunctionArgs,
  cvToJSON,
  cvToString,
  cvToHex,
} from '@clarigen/core';

export const Route = createFileRoute(
  '/read/$network/$contractAddress/$functionName'
)({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const { network: networkParam, contractAddress, functionName } = params;

        const networkResult = Network(networkParam);
        if (networkResult instanceof type.errors) {
          return new Response('Invalid network', { status: 400 });
        }
        const network = networkResult as NETWORK;

        try {
          const abi = await getContractAbi(network, contractAddress);
          const func = abi.functions.find((f) => f.name === functionName);

          if (!func) {
            return new Response('Function not found', { status: 404 });
          }

          if (func.access !== 'read_only') {
            return new Response('Function is not read-only', { status: 400 });
          }

          const url = new URL(request.url);
          const query: Record<string, string> = {};
          url.searchParams.forEach((value, key) => {
            query[key] = value;
          });

          const args = queryToFunctionArgs(query, func.args);

          const [address, name] = contractAddress.split('.');
          const rpcUrl = getStacksApiUrl(network);

          const result = await callReadOnlyFunction({
            contractAddress: address,
            contractName: name,
            functionName,
            functionArgs: args,
            url: rpcUrl,
          });

          return Response.json({
            okay: true,
            result: cvToHex(result),
            value: cvToJSON(result, true),
            clarity: cvToString(result),
          });
        } catch (error) {
          console.error('Read-only error:', error);
          return new Response(
            JSON.stringify({
              okay: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
      },
    },
  },
});
