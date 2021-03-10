'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { dsFinanceStockListedCompany, dsFinanceStockHistoryData } from '../../data';
import { ssi, mongooseClient, logger } from '../../libs';

const getHistory = async (symbol: string) => {
  const from = await getFromTime();
  const to = Math.floor(Date.now() / 1000);
  const resolution = '1D';
  const data: any = await ssi.getStockHistory(symbol, { from, to, resolution });
  return data;
};

const getFromTime = async (symbol: string = '') => {
  const from: number = new Date(2000, 0, 1, 0, 0, 0, 0).getTime();
  if (!symbol) return Math.floor(from / 1000);
  const query = { symbol };
  const options = { sort: { timestamp: -1 } };
  let { timestamp = from } = await dsFinanceStockHistoryData.findOne(query, options);
  const oneDay = 24 * 60 * 60 * 1000;
  timestamp -= 5 * oneDay;
  return Math.floor(timestamp / 1000);
};

const syncHistory = async (history: Array<any> = [], symbol: string, i: number = 1) => {
  const len = history.length;
  const res = await dsFinanceStockHistoryData.delete({ symbol });
  logger.info(`${JSON.stringify(res)}`);
  let j = 0;
  for (const item of history) {
    const { year, month, date, close, open, high, low, timestamp } = item;
    const doc = { symbol, year, month, date, timestamp, close, open, high, low };
    await dsFinanceStockHistoryData.create(doc);
    j++;
    const percentage = parseFloat(((j / len) * 100).toFixed(2));
    logger.info(`${i} ${symbol} ${percentage}`);
  }
};

const syncHistoryBySymbol = async (symbol, i) => {
  let history = await getHistory(symbol);
  logger.info(`${i} ${symbol} ${history.length}`);
  if (!history.length) return;
  console.time('sync');
  await syncHistory(history, symbol, i);
  console.timeEnd('sync');
};

const main = async () => {
  await mongooseClient.connect();

  const companies = await dsFinanceStockListedCompany.find({}, { sort: { listingDate: 1 } });
  logger.info(`${companies.length}`);

  let i = 1;
  for (const company of companies) {
    const { symbol = '' } = company;
    if (!symbol) continue;
    const count = await dsFinanceStockHistoryData.count({ symbol });
    logger.info(`${i} ${symbol} ${count}`);
    i++;
    if (count > 0) continue;
    await syncHistoryBySymbol(symbol, i);
  }

  process.exit(0);
};

main().catch(error => logger.error(error));
