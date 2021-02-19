'use strict';

import { syncGHN } from './sync-ghn';

const main = async () => {
  await syncGHN();

  process.exit(0);
};

main().catch(error => console.error(error));
