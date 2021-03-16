import nextConnect from 'next-connect';
import multer from 'multer';
import _ from 'lodash';
import Tesseract from 'tesseract.js';

const banks: Array<any> = [
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

const upload = multer({
  limits: { fileSize: 100000000, files: 1 },
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname)
  })
});

const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res.json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.use(upload.any());

apiRoute.post(async (req: any, res: any) => {
  const files = req.files;
  console.log('files', files);

  const [file = {}] = files;
  console.log('file', file);
  if (!file) {
    return res.json({ message: 'NO FILE', banksInfos: [] });
  }
  const { path = '' } = file;
  if (!path) {
    return res.json({ message: 'NO PATH', banksInfos: [] });
  }

  const text: string = await getTextFromImage(path);

  const banksInfos = await getBanksInfos(text);

  return res.json({ message: 'OK', banksInfos });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
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
