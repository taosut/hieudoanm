'use strict';

import { Request, Response } from 'express';
import Tesseract from 'tesseract.js';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';

const banks = [
  {
    name: 'vietcombank',
    prefixes: ['007', '004', '0491', '001'],
    length: 13
  },
  {
    name: 'sacombank',
    prefixes: ['020', '5611', '0400', '1234'],
    length: 12
  },
  {
    name: 'vietinbank',
    prefixes: ['10'],
    length: 12
  },
  {
    name: 'agribank',
    prefixes: ['130', '490', '318'],
    length: 13
  },
  {
    name: 'techcombank',
    prefixes: ['102', '196', '140', '191', '1903'],
    length: 14
  },
  {
    name: 'bidv',
    prefixes: ['581', '125', '601', '213'],
    length: 14
  },
  {
    name: 'mb',
    prefixes: ['068', '0801', '0050'],
    length: 13
  },
  {
    name: 'vib',
    prefixes: ['601', '025'],
    length: 15
  },
  {
    name: 'acb',
    prefixes: ['20', '24']
  },
  {
    name: 'vpbank',
    prefixes: ['15']
  },
  {
    name: 'tpbank',
    prefixes: ['020']
  }
];

export default async (req: any, res: Response): Promise<Response<any>> => {
  const files = req.files;
  console.log('files', files);

  const images = [];
  for (const file of files) {
    const { path = '', size = 0 } = file;
    if (!path || size < 1000000) {
      images.push(file);
      continue;
    }
    const image = await imagemin([path], {
      destination: 'compressed-images',
      plugins: [imageminMozjpeg({ quality: 50 })]
    });
    images.push(image);
  }
  console.log('images', images);

  const [image] = images;
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
      logger: (message: string) => console.log(message)
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
  console.log(text);
  const lines: Array<string> = text
    .split('\n')
    .map((line: string) => line.trim().toLowerCase())
    .filter((line: string) => line);
  console.log(lines);
  const bankAccountNumbers: Array<string> = lines
    .map((line: string) => line.replace(/\D/g, ''))
    .filter((line: string) => !isNaN(parseInt(line, 10)));
  const bankNames: Array<string> = lines
    .filter((line: string) => {
      const [name = ''] = banks.filter((bank: any) => {
        const { name = '' } = bank;
        return line.includes(name);
      });
      return name;
    })
    .filter((name: string) => name);
  console.log('bankAccountNumbers', bankAccountNumbers);
  console.log('bankNames', bankNames);
  const length: number = bankAccountNumbers.length;
  const banksInfos = [];
  for (let i = 0; i < length; i++) {
    const name: string = bankNames[i] || '';
    const number: string = bankAccountNumbers[i] || '';
    if (!name || !number) continue;
    banksInfos.push({ name, number });
  }
  console.log('banksInfos', banksInfos);
  return banksInfos;
};
