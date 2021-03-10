'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { logger, postgreClient } from '../../libs';

const main = async () => {
  await postgreClient.connect();

  const dropAllResponse = await postgreClient.dropAll();
  logger.info(`dropAllResponse ${JSON.stringify(dropAllResponse)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
