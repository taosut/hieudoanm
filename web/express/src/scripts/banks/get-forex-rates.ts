'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { banks, logger } from '../../libs';

const main = async () => {
  const ID: string = process.env.ID;
  const rates = await banks[ID].getForexRates();
  logger.info(`ID ${ID} rates ${JSON.stringify(rates)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
