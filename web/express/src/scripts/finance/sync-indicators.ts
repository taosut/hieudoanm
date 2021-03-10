'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { financeService } from '../../services';
import { logger, mongooseClient } from '../../libs';
import { dsFinanceStockIndicator, dsFinanceStockListedCompany } from '../../data';

const main = async () => {
  await mongooseClient.connect();

  const companies = await dsFinanceStockListedCompany.find({});
  logger.info(`${companies.length}`);

  const year = 2020;
  const period = 'quarterly';
  const list = await financeService.getPBbyCompanies(companies, { year, period });

  const key = 'PB';

  for (const item of list) {
    const { symbol } = item;
    const keys = Object.keys(item).filter(key => key !== 'symbol');
    for (const period of keys) {
      const [qq, yyyy] = period.split('-');
      const quarter = parseFloat(qq.toLowerCase().replace(/q/, ''));
      const year = parseInt(yyyy, 10);
      const value = item[period];
      logger.info(JSON.stringify({ symbol, key, value, quarter, year }));

      await dsFinanceStockIndicator.updateOne(
        { symbol, key, quarter, year },
        { symbol, key, quarter, year, value }
      );
    }
  }

  process.exit(0);
};

main().catch(error => logger.error(error));
