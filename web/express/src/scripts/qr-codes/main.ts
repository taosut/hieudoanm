'use strict';

import QRCode from 'qrcode';
import fs from 'fs';

import { utils, mailer } from '../../libs';

const main = async () => {
  const id: string = utils.uuid();
  const name: string = 'Test';
  const email: string = 'hieumdoan@gmail.com';
  const organization: string = 'Google';

  const website: string = `https://vietnamdb.herokuapp.com/qrcodes/info?id=${id}`;

  const url: string = await QRCode.toDataURL(website);
  const base64 = url.replace('data:image/png;base64,', '');
  console.log('base64', base64);
  console.log(__dirname);
  await fs.writeFileSync(`./${id}.png`, Buffer.from(base64, 'base64'));
  // const res = await mailer.sendMail([email], 'Test Subject', '');
  // console.log(res);
};

main().catch(error => console.error(error));
