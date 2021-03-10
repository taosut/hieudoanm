'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { mongooseClient, logger } from '../../libs';
import { financeService } from '../../services';

const main = async () => {
  await mongooseClient.connect();

  const SYMBOL = (process.env.SYMBOL || '').toUpperCase();

  SYMBOL && (await financeService.syncHistoryBySymbol(SYMBOL));
  !SYMBOL && (await financeService.syncHistoryBySymbols());

  process.exit(0);
};

main().catch(error => logger.error(error));
