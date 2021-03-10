'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import json2csv from 'json2csv';
const { parse } = json2csv;

import { tanViet, logger, mongooseClient } from '../../libs';
import { dsFinanceStockListedCompany } from '../../data';

const main = async () => {
  await mongooseClient.connect();

  const companies = await dsFinanceStockListedCompany.find({ group: 'VN30' });

  const rows = [];
  let options = { year: 2020, period: 'quarterly', unit: 1000 };
  for (const company of companies) {
    let { symbol = '', industry } = company;
    industry = industry.toLowerCase() === 'ngân hàng' ? 'bank' : '';
    options = Object.assign(options, { industry });
    const res = await tanViet.getFinancialIndicator('P/E cơ bản', symbol, options);
    const row = { symbol };
    res.forEach(item => {
      let { period, value } = item;
      period = period.replace(' ', '-');
      row[period] = value;
    });
    logger.info(`symbol ${symbol} row ${JSON.stringify(row)}`);
    rows.push(row);
  }

  const fields = Object.keys(rows[0]);
  const csv = parse(rows, { fields });
  logger.info(`csv ${csv}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
