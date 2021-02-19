'use strict';

import { syncForexRates } from './sync-forex-rates';
import { syncGHN } from './sync-ghn';

const main = async () => {
  await syncForexRates();
  await syncGHN();

  process.exit(0);
};

main().catch(error => console.error(error));
