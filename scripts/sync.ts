'use strict';

import { syncForexRates } from './sync-forex-rates';
import { syncGHN } from './sync-ghn';
import { syncStacks } from './sync-stacks';

const main = async () => {
  console.log('Sync Forex Rates');
  await syncForexRates();
  console.log('Sync Giao Hang Nhanh');
  await syncGHN();
  console.log('Sync Stacks');
  await syncStacks();

  process.exit(0);
};

main().catch(error => console.error(error));
