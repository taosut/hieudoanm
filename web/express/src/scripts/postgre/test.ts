'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { logger, postgreClient } from '../../libs';
import { AdministrativeDivisionsProvince } from '../../models';

const main = async () => {
  await postgreClient.connect();
  const table: string = 'maps_provinces';
  // Drop Table
  const dropTableResponse = await postgreClient.dropTable(table);
  logger.info(`dropTableResponse ${dropTableResponse}`);
  // Create Table
  const createTableResponse = await postgreClient.createTable(
    table,
    AdministrativeDivisionsProvince
  );
  logger.info(`createTableResponse ${createTableResponse}`);
  // Get Tables
  const tables: any = await postgreClient.getTables();
  logger.info(`tables ${tables}`);
  // Add Row
  const newRow = {
    name: 'An Giang',
    capital: 'Long Xuyên',
    level: 'tỉnh',
    macro_region: 'nam bộ',
    region: 'đồng bằng sông cửu long'
  };
  const insertResponse: any = await postgreClient.insert(table, newRow);
  logger.info(`insertResponse ${JSON.stringify(insertResponse)}`);
  // Find
  const rows = await postgreClient.find(table);
  logger.info(`rows ${JSON.stringify(rows)}`);
  // Update
  const updatedRow = { level: 'thành phố' };
  const updateResponse: any = await postgreClient.update(table, updatedRow);
  logger.info(`updateResponse ${JSON.stringify(updateResponse)}`);
  // Find 2
  const rows2 = await postgreClient.find(table);
  logger.info(`rows2 ${JSON.stringify(rows2)}`);
  // Update
  const deleteResponse: any = await postgreClient.delete(table);
  logger.info(`deleteResponse ${JSON.stringify(deleteResponse)}`);
  // Find 3
  const rows3 = await postgreClient.find(table);
  logger.info(`rows3 ${JSON.stringify(rows3)}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
