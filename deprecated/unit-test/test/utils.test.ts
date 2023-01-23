import { NativeClarityBinProvider } from '@clarigen/native-bin';
import { TestProvider, createClarityBin, getBlockHeight, mineBlocks, getStxBalance } from '../src';

let clarityBin: NativeClarityBinProvider;
let t: TestProvider;
const alice = 'ST1ESYCGJB5Z5NBHS39XPC70PGC14WAQK5XXNQYDW';

const bigBalance = 1000000n * 2100000n * 1000000n;

async function deploy() {
  clarityBin = await createClarityBin({
    allocations: [{ principal: alice, amount: bigBalance }],
    testnet: true,
  });
  const setup = await TestProvider.fromContracts({}, { clarityBin });
  t = setup.provider;
}

beforeAll(async () => {
  await deploy();
});

test('can get block height and mine blocks', async () => {
  const startHeight = await getBlockHeight(clarityBin);
  expect(startHeight).toEqual(3n);
  await mineBlocks(5, clarityBin);
  expect(await getBlockHeight(clarityBin)).toEqual(8n);
});

test('can get balance of user', async () => {
  const balance = await getStxBalance(clarityBin, alice);
  expect(balance).toEqual(bigBalance);
});

test('can use utils with TestProvider api', async () => {
  const balance = await getStxBalance(t, alice);
  expect(balance).toEqual(bigBalance);
});
