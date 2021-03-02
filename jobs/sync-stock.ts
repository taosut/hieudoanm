'use strict';

import { syncHighlights, syncPotentials } from './services/stock';

const main = async () => {
  await syncHighlights();
  await syncPotentials();
};

main().catch(error => console.error(error));
