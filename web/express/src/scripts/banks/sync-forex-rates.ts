'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { logger, mongooseClient, redisClient } from '../../libs';
import { banksService } from '../../services';

const main = async () => {
  await redisClient.connect();
  await mongooseClient.connect();

  const ID: string = (process.env.ID || '').toLowerCase();

  ID && (await banksService.syncForexRatesById(ID));
  !ID && (await banksService.syncForexRates());

  process.exit(0);
};

main().catch(error => logger.error(error));
