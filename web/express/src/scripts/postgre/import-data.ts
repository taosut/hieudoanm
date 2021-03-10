'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { table, schema } from './data';
import { utils, logger, postgreClient } from '../../libs';

const main = async () => {
  await postgreClient.connect();

  const rows = await utils.convertCSVtoJSON('./nam.csv');

  const dropTableResponse = await postgreClient.dropTable(table);
  logger.info(`dropTableResponse ${JSON.stringify(dropTableResponse)}`);

  const createTableResponse = await postgreClient.createTable(table, schema);
  logger.info(`createTableResponse ${JSON.stringify(createTableResponse)}`);

  const insertManyResponse: any = await postgreClient.insertMany(table, rows);
  logger.info(`insertManyResponse ${JSON.stringify(insertManyResponse)}`);

  const allRows = await postgreClient.find(table);
  logger.info(`allRows ${JSON.stringify(allRows)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
