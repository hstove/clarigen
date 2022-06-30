export const devnetDeployment = {
  id: 0,
  name: 'Devnet deployment',
  network: 'devnet',
  'stacks-node': 'http://localhost:20443',
  'bitcoin-node': 'http://devnet:devnet@localhost:18443',
  plan: {
    batches: [
      {
        id: 0,
        transactions: [
          {
            'requirement-publish': {
              'contract-id': 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.ft-trait',
              'remap-sender': 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              'remap-principals': {
                SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR:
                  'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              },
              cost: 8350,
              path: '.requirements/SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.ft-trait.clar',
            },
          },
          {
            'requirement-publish': {
              'contract-id': 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.restricted-token-trait',
              'remap-sender': 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              'remap-principals': {
                SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR:
                  'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              },
              cost: 5480,
              path: '.requirements/SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.restricted-token-trait.clar',
            },
          },
          {
            'requirement-publish': {
              'contract-id': 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin',
              'remap-sender': 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              'remap-principals': {
                SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR:
                  'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              },
              cost: 104220,
              path: '.requirements/SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin.clar',
            },
          },
          {
            'contract-publish': {
              'contract-name': 'tester',
              'expected-sender': 'ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
              cost: 6640,
              path: 'contracts/tester.clar',
            },
          },
        ],
      },
    ],
  },
} as const;