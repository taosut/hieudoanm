'use strict';

import fs from 'fs';
import json2csv from 'json2csv';
const { parse } = json2csv;

import { calendar, utils } from '../../libs';

const main = async () => {
  const firstDayOf2022Time: number = new Date(2022, 0, 1, 0, 0, 0, 0).getTime();
  const firstDayOf2023Time: number = new Date(2023, 0, 1, 0, 0, 0, 0).getTime();
  const oneDay: number = 1000 * 60 * 60 * 24;

  const list = [];

  for (let time = firstDayOf2022Time; time < firstDayOf2023Time; time += oneDay) {
    const d: Date = new Date(time);
    const solarYear: number = d.getFullYear();
    const solarMonth: number = d.getMonth() + 1;
    const solarDate: number = d.getDate();
    const {
      year: lunarYear,
      month: lunarMonth,
      date: lunarDate
    } = await calendar.convertSolarToLunar(solarDate, solarMonth, solarYear);

    const canChiOfYear: string = calendar.getCanChiOfYear(lunarYear);
    const canChiOfMonth: string = calendar.getCanChiOfMonth(lunarMonth, lunarYear);
    const canChiOfDate: string = calendar.getCanChiOfDate(lunarDate, lunarMonth, lunarYear);
    const tietKhi: string = calendar.getTietKhi(lunarDate, lunarMonth, lunarYear);

    const solar = `${utils.addZero(solarYear)}-${utils.addZero(solarMonth)}-${utils.addZero(
      solarDate
    )}`;
    const lunar = `${utils.addZero(lunarYear)}-${utils.addZero(lunarMonth)}-${utils.addZero(
      lunarDate
    )}`;
    const canChi: string = `năm ${canChiOfYear} tháng ${canChiOfMonth} ngày ${canChiOfDate}`.toLowerCase();

    list.push({ solar, lunar, canChi, tietKhi });
  }

  const csvPath = `./2022.csv`;
  const fields = [
    { label: 'Dương', value: 'solar' },
    { label: 'Âm', value: 'lunar' },
    { label: 'Cân Chi', value: 'canChi' },
    { label: 'Tiết Khi', value: 'tietKhi' }
  ];
  const csv = parse(list, { fields });
  await fs.writeFileSync(csvPath, csv);
};

main().catch(error => console.error(error));
