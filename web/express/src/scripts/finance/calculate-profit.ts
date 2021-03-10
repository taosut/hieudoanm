'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { logger } from '../../libs';
import { financeService } from '../../services';

const main = async () => {
  const buy = parseFloat(process.env.BUY) || 0;
  const sell = parseFloat(process.env.SELL) || 0;
  const volume = parseFloat(process.env.VOLUME) || 0;

  if (!buy || !sell) return;

  const profit = financeService.calculateProfit(buy, sell, volume);

  logger.info(`profit ${profit}`);
};

main().catch(error => logger.error(error));
