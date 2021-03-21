'use strict';

import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

import { utils, mailer } from '../libs';

import { dsEventAttendant } from '../data';

const URL_UI: string = process.env.URL_UI || '';

export default class QRCodesService {
  public async getAttendant(id: string): Promise<Record<string, any>> {
    const attendant = await dsEventAttendant.findOne({ id });
    return attendant;
  }

  public async createAttendant(attendant: Record<string, any>): Promise<Record<string, any>> {
    const id: string = utils.uuid();
    attendant = Object.assign(attendant, { id });
    const newAttendant = await dsEventAttendant.create(attendant);
    const website: string = `${URL_UI}/qrcodes/info?id=${id}`;
    const url: string = await QRCode.toDataURL(website);
    const base64: string = url.replace('data:image/png;base64,', '');
    const location: string = path.join(__dirname, '../images', `${id}.png`);
    await fs.writeFileSync(location, Buffer.from(base64, 'base64'));
    const { email = '' } = newAttendant;
    const subject: string = 'Test Subject';
    const content: string = `<img src="${url}">`;
    const sendMailResponse = await mailer.sendMail([email], subject, content);
    console.log('sendMailResponse', sendMailResponse);
    return newAttendant;
  }
}
