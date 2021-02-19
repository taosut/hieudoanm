'use strict';

import { buildREADME } from './build-readme';
import { syncForexRates } from './sync-forex-rates';
import { syncGHN } from './sync-ghn';
import { syncStacks } from './sync-stacks';
import { syncStockHistory } from './sync-stock-history';
import { syncYouTubeVideoCategories } from './sync-youtube-video-categories';

const main = async () => {
  console.log('Build README');
  await buildREADME();
  console.log('Sync Forex Rates');
  await syncForexRates();
  console.log('Sync Giao Hang Nhanh');
  await syncGHN();
  console.log('Sync Stacks');
  await syncStacks();
  console.log('Sync Stock History');
  await syncStockHistory();
  console.log('Sync YouTube Video Categories');
  await syncYouTubeVideoCategories();

  process.exit(0);
};

main().catch(error => console.error(error));
