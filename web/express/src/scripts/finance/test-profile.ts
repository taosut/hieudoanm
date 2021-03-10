'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { ssi, logger } from '../../libs';

const main = async () => {
  const profile = await ssi.getStockProfile('FPT');
  logger.info(`profile ${JSON.stringify(profile)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
