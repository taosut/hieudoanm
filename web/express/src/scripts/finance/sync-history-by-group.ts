'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { dsFinanceStockListedCompany } from '../../data';
import { financeService } from '../../services';
import { logger, mongooseClient } from '../../libs';

const main = async () => {
  await mongooseClient.connect();

  let GROUP = process.env.GROUP || '';
  GROUP = GROUP.toUpperCase();

  logger.info(`GROUP ${GROUP}`);

  const companies = await dsFinanceStockListedCompany.find(
    { group: GROUP },
    { sort: { symbol: 1 } }
  );

  for (const company of companies) {
    const { symbol } = company;
    logger.info(`symbol ${symbol}`);
    await financeService.syncHistoryBySymbol(symbol);
  }

  process.exit(0);
};

main().catch(error => logger.error(error));
