'use strict';

import { syncStacks } from './services/stacks';

const main = async () => {
  await syncStacks();
};

main().catch(error => console.error(error));
