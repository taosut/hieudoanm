'use strict';

import _ from 'lodash';
import { Request, Response } from 'express';

import { calendar, dateTime } from '../../../../libs';

export default async (req: Request, res: Response): Promise<Response<any>> => {
  const { year: nowYear, month: nowMonth, date: nowDate } = dateTime.getTime();
  console.log('NOW', nowYear, nowMonth, nowDate);
  const solarYear: number = parseInt(_.get(req, 'body.year', nowYear.toString()), 10);
  const solarMonth: number = parseInt(_.get(req, 'body.month', nowMonth.toString()), 10);
  const solarDate: number = parseInt(_.get(req, 'body.date', nowDate.toString()), 10);
  console.log('SOLAR', solarDate, solarMonth, solarDate);
  const { date, month, year } = calendar.convertSolarToLunar(solarDate, solarMonth, solarYear);
  console.log('LUNAR', year, month, date);
  return res.json({ date, month, year });
};
