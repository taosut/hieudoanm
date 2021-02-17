'use strict';

import fs from 'fs';
import fetch from 'node-fetch';
import { Parser } from 'json2csv';

const convertJSONtoCSV = async (path: string, json: Record<string, any>, fields: Array<string>) => {
  const json2csvParser = new Parser({ fields, delimiter: ';' });
  const csv = json2csvParser.parse(json);
  await fs.writeFileSync(path, csv);
};

const fetch = (url: string) => {
  return new Promise(resolve => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.error(error);
        resolve([]);
      });
  });
};

const main = async () => {
  process.exit(0);
};

main().catch(error => console.error(error));
