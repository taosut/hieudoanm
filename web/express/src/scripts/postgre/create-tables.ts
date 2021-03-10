'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '../../environments/dev.env' });

import { postgreClient, logger } from '../../libs';

const main = async () => {
  await postgreClient.connect();
  const listOfTables: Array<any> = Object.values({});
  for (const table of listOfTables) {
    const { name, schema } = table;
    logger.info(`${name} ${JSON.stringify(schema)}`);
    // Drop Table
    const dropTableResponse = await postgreClient.dropTable(name);
    logger.info(`dropTableResponse ${name} ${JSON.stringify(dropTableResponse)}`);
    // Create Table
    const createTableResponse = await postgreClient.createTable(name, schema);
    logger.info(`createTableResponse ${name} ${JSON.stringify(createTableResponse)}`);
  }

  // Get Tables
  const _tables: any = await postgreClient.getTables();
  logger.info(`tables ${JSON.stringify(_tables)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
