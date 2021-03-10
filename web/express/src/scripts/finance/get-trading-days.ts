'use strict';

import fs from 'fs';
import json2csv from 'json2csv';
const { parse } = json2csv;

import { logger } from '../../libs';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const publicHolidays = [
  { year: 2020, month: 1, date: 1 },
  { year: 2020, month: 1, date: 23 },
  { year: 2020, month: 1, date: 24 },
  { year: 2020, month: 1, date: 25 },
  { year: 2020, month: 1, date: 26 },
  { year: 2020, month: 1, date: 27 },
  { year: 2020, month: 1, date: 28 },
  { year: 2020, month: 1, date: 29 },
  { year: 2020, month: 4, date: 2 },
  { year: 2020, month: 4, date: 30 },
  { year: 2020, month: 5, date: 1 },
  { year: 2020, month: 9, date: 2 },
  { year: 2021, month: 1, date: 1 },
  { year: 2021, month: 4, date: 21 },
  { year: 2021, month: 4, date: 30 },
  { year: 2021, month: 5, date: 1 },
  { year: 2021, month: 9, date: 2 }
];

const main = async () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const dates = [];
  let startTime: number = new Date(2020, 1 - 1, 1, 0, 0, 0, 0).getTime();
  const endTime: number = new Date(2021, 12 - 1, 31, 23, 59, 59, 999).getTime();

  while (startTime < endTime) {
    const d: Date = new Date(startTime);
    const dayIndex = d.getDay();
    startTime += oneDay;
    if (dayIndex === 0 || dayIndex === 6) continue;
    const day = days[dayIndex];
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const publicHolidayFlag = publicHolidays.some(item => {
      return item.date === date && item.month === month && item.year === year;
    });
    if (publicHolidayFlag) continue;
    dates.push({ year, month, date, day });
    logger.info(`${year} ${month} ${date} ${day}`);
  }
  const jsonPath = `../data/finance/stock/trading-days.json`;
  const data = JSON.stringify(dates, null, 2);
  await fs.writeFileSync(jsonPath, data);

  const csvPath = `../data/finance/stock/trading-days.csv`;
  const fields = ['year', 'month', 'date', 'day'];
  const csv = parse(dates, { fields });
  await fs.writeFileSync(csvPath, csv);
};

main().catch(error => logger.error(error));
