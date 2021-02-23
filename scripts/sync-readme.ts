'use strict';

import { buildREADME } from './build-readme';

const main = async () => {
  console.log('Build README');
  await buildREADME();

  process.exit(0);
};

main().catch(error => console.error(error));
