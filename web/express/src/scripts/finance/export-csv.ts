'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import fs from 'fs';
import json2csv from 'json2csv';
const { parse } = json2csv;

import { logger, mongooseClient } from '../../libs';
import { financeService } from '../../services';

const main = async () => {
  await mongooseClient.connect();

  let SYMBOL = process.env.SYMBOL || 'VIC';
  SYMBOL = SYMBOL.toUpperCase();
  const to = Date.now();
  const from = 0;
  const res = await financeService.getHistoryFromDB({ symbol: SYMBOL, from, to });
  const first = res[0];
  const { history = [] } = first;

  logger.info(`history ${history}`);

  history.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.date - b.date;
  });

  const csvPath = `../python/data.csv`;
  const fields = ['close', 'open', 'high', 'low', 'year', 'month', 'date'];
  const csv = parse(history, { fields });
  await fs.writeFileSync(csvPath, csv);

  process.exit(0);
};

main().catch(error => logger.error(error));
