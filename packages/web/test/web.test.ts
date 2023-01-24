import { projectFactory } from '@clarigen/core';
import { StacksMocknet } from 'micro-stacks/network';
import { MicroStacksClient } from '@micro-stacks/client';
import { ClarigenClient } from '../src';
import { project } from '../../../demo-project/esm';

const devnet = projectFactory(project, 'devnet');

const client = new ClarigenClient(new MicroStacksClient({ network: new StacksMocknet() }));

async function fakeRoApiJson() {
  const res = await client.ro(devnet.tester.mergeTuple({ i: { minHeight: 1n } }), {
    json: true,
  });
  return res;
}
async function fakeRoApi(json: boolean) {
  const res = await client.ro(devnet.tester.mergeTuple({ i: { minHeight: 1n } }), {
    json,
  });
  return res;
}

type ApiJson = Awaited<ReturnType<typeof fakeRoApiJson>>;
const mergeJson: ApiJson = {
  minHeight: '',
  maxHeight: '',
};
type ApiNorm = Awaited<ReturnType<typeof fakeRoApi>>;
const mergeNorm: ApiNorm = {
  minHeight: 1n,
  maxHeight: 1n,
};
