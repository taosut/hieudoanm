'use strict';

import fs from 'fs';
import fetch from 'node-fetch';
import { Parser } from 'json2csv';

export const convertJSONtoCSV = async (
  json: Record<string, any>,
  fields: Array<string>,
  path: string
) => {
  const parser = new Parser({ fields, delimiter: ';' });
  const csv = parser.parse(json);
  if (path) {
    await fs.writeFileSync(path, csv);
  }
  return csv;
};

export const fetch = (url: string) => {
  return new Promise(resolve => {
    fetch(url)
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
