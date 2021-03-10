'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { logger, postgreClient } from '../../libs';

const main = async () => {
  await postgreClient.connect();

  const table: string = 'technologies';
  const dropTableResponse = await postgreClient.dropTable(table);
  logger.info(`dropTableResponse ${JSON.stringify(dropTableResponse)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
