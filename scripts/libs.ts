'use strict';

import fs from 'fs';
import fetch from 'node-fetch';
import { Parser } from 'json2csv';

export const addZero = (i: number = 0): string => {
  return i > 9 ? `${i}` : `0${i}`;
};

export const convertJSONtoCSV = async (json: Record<string, any>, fields: Array<string>, path: string) => {
  const parser = new Parser({ fields, delimiter: ';' });
  const csv = parser.parse(json);
  if (path) {
    await fs.writeFileSync(path, csv);
  }
  return csv;
};

export const request = (url: string, method = 'GET') => {
  return new Promise(resolve => {
    fetch(url, { method })
      .then((res: any) => res.json())
      .then((res: any) => {
        resolve(res);
      })
      .catch(error => {
        console.error(error);
        resolve([]);
      });
  });
};

export const numberFormatter = (x: number = 0): string => {
  return x
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalize = (s: string = ''): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getTime = (timeZone: number = 7): Record<string, any> => {
  const timezoneOffset: number = new Date().getTimezoneOffset();
  const serverTimezone: number = timezoneOffset / -60;
  const timezoneDiff: number = timeZone - serverTimezone;
  const now: number = Date.now();
  const d: Date = new Date(now + timezoneDiff * 60 * 60 * 1000);
  const year: number = d.getFullYear();
  const month: number = d.getMonth() + 1;
  const date: number = d.getDate();
  const day: number = d.getDay();
  const hours: number = d.getHours();
  const minutes: number = d.getMinutes();
  const timestamp: number = d.getTime();

  return { year, month, date, day, hours, minutes, timestamp };
};
