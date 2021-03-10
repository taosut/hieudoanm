'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { tanViet, logger } from '../../libs';

const main = async () => {
  const indicators = await tanViet.getFinancialIndicatores('BID', {
    year: 2020,
    period: 'quarterly',
    unit: 1000
  });

  logger.info(`indicators ${JSON.stringify(indicators, null, 2)}`);
};

main().catch(error => logger.error(error));
