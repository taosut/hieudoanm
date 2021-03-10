'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { dsFinanceStockHistoryData } from '../../data';
import { logger, mongooseClient } from '../../libs';

const main = async () => {
  await mongooseClient.connect();

  let SYMBOL = process.env.SYMBOL || '';
  const symbol = SYMBOL.toUpperCase();

  const deteleResponse = await dsFinanceStockHistoryData.delete({ symbol });
  logger.info(`deteleResponse ${deteleResponse}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
