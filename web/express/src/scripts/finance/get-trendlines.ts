'use strict';

import fs from 'fs';
import json2csv from 'json2csv';

const { parse } = json2csv;

import { utils, logger } from '../../libs';

const getTradingDays = async () => {
  const tradingDaysPath = `../data/finance/stock/trading-days.json`;
  const tradingDaysData = await fs.readFileSync(tradingDaysPath, 'utf-8');
  const data = JSON.parse(tradingDaysData);
  return data;
};

const getLastTradingDay = async () => {
  const d: Date = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const tradingDays: any = await getTradingDays();
  const index = tradingDays.findIndex(item => {
    return item.date === date && item.month === month && item.year === year;
  });
  const lastTradingDay = tradingDays[index - 1];
  let { year: yYear, month: yMonth, date: yDate } = lastTradingDay;
  yMonth = utils.addZero(yMonth);
  yDate = utils.addZero(yDate);
  return `${yYear}-${yMonth}-${yDate}`;
};

const getToday = () => {
  const d: Date = new Date();
  const tYear = d.getFullYear();
  const tMonth = utils.addZero(d.getMonth() + 1);
  const tDate = utils.addZero(d.getDate());
  return `${tYear}-${tMonth}-${tDate}`;
};

const getNextTradingDay = async () => {
  const d: Date = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const tradingDays: any = await getTradingDays();
  const index = tradingDays.findIndex(item => {
    return item.date === date && item.month === month && item.year === year;
  });
  const lastTradingDay = tradingDays[index + 1];
  let { year: nYear, month: nMonth, date: nDate } = lastTradingDay;
  nMonth = utils.addZero(nMonth);
  nDate = utils.addZero(nDate);
  return `${nYear}-${nMonth}-${nDate}`;
};

const linearRegression = (y, x) => {
  let n = y.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let sum_yy = 0;

  for (let i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += x[i] * y[i];
    sum_xx += x[i] * x[i];
    sum_yy += y[i] * y[i];
  }
  const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  const intercept = (sum_y - slope * sum_x) / n;
  const r2 = Math.pow(
    (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
    2
  );

  return { slope, intercept, r2 };
};

const savePrediction = async (trendlines, today, market) => {
  const trendlinesPath = `../data/finance/stock/prediction/${today}/${market}.json`;
  const trendlinesData = JSON.stringify(trendlines, null, 2);
  await fs.writeFileSync(trendlinesPath, trendlinesData);
  try {
    const csvPath = `../data/finance/stock/prediction/${today}/${market}.csv`;
    const fields = [
      'market',
      'name',
      'symbol',
      'slope',
      'direction',
      'last',
      'lastDate',
      'lastClose',
      'advice',
      'adviceFor'
    ];
    const csv = parse(trendlines, { fields });
    await fs.writeFileSync(csvPath, csv);
  } catch (err) {
    logger.error(err);
  }
};

const main = async () => {
  const groups = ['vn30', 'hnx30'];
  const today = getToday();
  const lastTradingDay = await getLastTradingDay();
  const nextTradingDay = await getNextTradingDay();
  for (const group of groups) {
    const path = `../data/finance/stock/companies/${group}.json`;
    const content = await fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(content);
    const list = data.map(item => {
      const { symbol, market, name } = item;
      return { symbol, market, name };
    });
    const trendlines = [];
    for (const item of list) {
      let { symbol, market, name } = item;
      market = market.toLowerCase();
      const path = `../data/finance/stock/history/files/json/${market}/${symbol}.json`;
      const exists = await fs.existsSync(path);
      if (!exists) continue;
      const content = await fs.readFileSync(path, 'utf-8');
      const history = JSON.parse(content);
      const last10 = history.slice(-5);
      const closeData = last10.map(item => item.close);
      const lastClose = closeData[closeData.length - 1];
      const xData = last10.map((item, index) => index);
      const lr: any = linearRegression(closeData, xData);
      const { slope } = lr;
      market = market.toUpperCase();
      const direction: string = slope < 0 ? 'downward' : 'upward';
      const advice: string = slope <= -0.3 ? 'buy' : '';
      const last = '10 days';
      trendlines.push({
        market,
        name,
        symbol,
        slope,
        direction,
        last,
        lastDate: lastTradingDay,
        lastClose,
        advice,
        adviceFor: nextTradingDay
      });
    }
    trendlines.sort((a, b) => a.slope - b.slope);
    logger.info(`${trendlines.length} ${JSON.stringify(trendlines)}`);
    await savePrediction(trendlines, today, group);
  }
};

main().catch(error => logger.error(error));
