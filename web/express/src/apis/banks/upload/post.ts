'use strict';

import _ from 'lodash';
import { Response } from 'express';
import Tesseract from 'tesseract.js';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

const banks = [
  { names: ['abbank'] },
  { names: ['acb'], prefixes: ['20', '24'] },
  { names: ['agribank', 'agri'], prefixes: ['130', '490', '318'], length: 13 },
  { names: ['baovietbank', 'bvb'] },
  { names: ['bidv'], prefixes: ['581', '125', '601', '213'], length: 14 },
  { names: ['cbbank', 'cb'] },
  { names: ['dongabank'] },
  { names: ['eximbank'] },
  { names: ['gpbank', 'gpb'] },
  { names: ['hdbank', 'hdb'] },
  { names: ['kienlongbank'] },
  { names: ['lienvietpostbank', 'lpb'] },
  { names: ['mbbank', 'mb'], prefixes: ['068', '0801', '0050'], length: 13 },
  { names: ['msb'] },
  { names: ['namabank'] },
  { names: ['ncb'] },
  { names: ['ocb'] },
  { names: ['oceanbank'] },
  { names: ['pgbank'] },
  { names: ['pvcombank'] },
  { names: ['sacombank'], prefixes: ['020', '5611', '0400', '1234'], length: 12 },
  { names: ['saigonbank'] },
  { names: ['scb'] },
  { names: ['seabank'] },
  { names: ['shb'] },
  { names: ['techcombank'], prefixes: ['102', '196', '140', '191', '1903'], length: 14 },
  { names: ['tpbank'], prefixes: ['020'] },
  { names: ['uob'] },
  { names: ['vib'], prefixes: ['601', '025'], length: 15 },
  { names: ['vietabank'] },
  { names: ['vietbank'] },
  { names: ['vietcapitalbank'] },
  { names: ['vietcombank', 'vcb'], prefixes: ['007', '004', '0491', '001'], length: 13 },
  { names: ['vietinbank'], prefixes: ['10'], length: 12 },
  { names: ['vpbank'], prefixes: ['15'] }
];

export default async (req: any, res: Response): Promise<Response<any>> => {
  const files = req.files;
  console.log('files', files);

  const images = [];
  for (const file of files) {
    const { path = '', size = 0 } = file;
    if (!path || size < 10000) {
      images.push({ path });
      continue;
    }
    const quality: number = 10000 / size;
    console.log('quality', quality);
    const [image = {}] = await imagemin([path], {
      destination: 'compressed-images',
      plugins: [imageminMozjpeg({ quality })]
    });
    console.log('image', image);
    const { destinationPath = '' } = image;
    images.push({ path: destinationPath });
  }
  console.log('images', images);

  const [image = {}] = images;
  console.log('image', image);
  if (!image) {
    return res.json({ message: 'NO FILE', banksInfos: [] });
  }
  const { path = '' } = image;
  if (!path) {
    return res.json({ message: 'NO PATH', banksInfos: [] });
  }

  const text: string = await getTextFromImage(path);

  const banksInfos = await getBanksInfos(text);

  return res.json({ message: 'OK', banksInfos });
};

const getTextFromImage = async (path: string): Promise<string> => {
  return new Promise(resolve => {
    Tesseract.recognize(path, 'eng', {
      logger: (message: string) => console.log('message', message)
    })
      .then(({ data: { text } }) => {
        return resolve(text);
      })
      .catch((error: any) => {
        console.error(error);
        return resolve('');
      });
  });
};

const getBanksInfos = (text: string): Array<Record<string, any>> => {
  console.log('text', text);
  const lines: Array<string> = text
    .split('\n')
    .map((line: string) => line.trim().toLowerCase())
    .filter((line: string) => line);
  console.log('lines', lines);
  const allNumbers: Array<Array<string>> = lines.map((line: string) => {
    const numbers = line
      .replace(/\D/g, ' ')
      .split('  ')
      .map((number: string) => number.trim());
    return numbers;
  });
  const bankNumbers = _.flattenDeep(allNumbers)
    .filter((line: string) => !isNaN(parseInt(line, 10)))
    .filter((line: string) => line.length > 8);
  const bankNames: Array<string> = lines
    .map((line: string) => {
      const filterBanks = banks.filter((bank: any) => {
        const { names = [] } = bank;
        return names.some((name: string) => line.includes(name));
      });
      const [first = { names: [] }] = filterBanks;
      const { names = [] } = first;
      const [name = ''] = names;
      return name.toLowerCase();
    })
    .filter((name: string) => name);
  console.log('bankNumbers', bankNumbers);
  console.log('bankNames', bankNames);
  const length: number = bankNumbers.length;
  const banksInfos = [];
  for (let i = 0; i < length; i++) {
    const name: string = bankNames[i] || '';
    const number: string = bankNumbers[i] || '';
    if (!name || !number) continue;
    banksInfos.push({ name, number });
  }
  console.log('banksInfos', banksInfos);
  return banksInfos;
};
