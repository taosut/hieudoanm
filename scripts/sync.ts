'use strict';

import { syncForexRates } from './sync-forex-rates';
import { syncGHN } from './sync-ghn';
import { syncStacks } from './sync-stacks';
import { syncStockHistory } from './sync-stock-history';

const main = async () => {
  console.log('Sync Forex Rates');
  await syncForexRates();
  console.log('Sync Giao Hang Nhanh');
  await syncGHN();
  console.log('Sync Stacks');
  await syncStacks();
  console.log('Sync Stock History');
  await syncStockHistory();

  process.exit(0);
};

main().catch(error => console.error(error));
