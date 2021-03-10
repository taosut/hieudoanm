'use strict';

import fs from 'fs';
import request from 'request';
import csvToJSON from 'csvtojson';
import { v4 as uuidv4 } from 'uuid';

export default class Utils {
  public median(arr: Array<number> = []): number {
    const arrSort = arr.sort();
    const len = arr.length;
    const mid = Math.ceil(len / 2);
    const median = len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
    return parseFloat(median.toFixed(2));
  }

  public isObjectEmpty(object: any = {}): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }

  public async waitFor(milliseconds: number = 0): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => resolve('DONE'), milliseconds);
    });
  }
  /**
   * Numbers
   */
  public addZero(i: number = 0): string {
    return i > 9 ? `${i}` : '0' + i.toString();
  }

  public numberFormatter(x: number = 0): string {
    const [whole, decimal] = x.toString().split('.');
    const updatedWhole: string = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${updatedWhole}.${decimal}` : updatedWhole;
  }
  /**
   * JSON
   */
  public async convertCSVtoJSON(csvFilePath: string = '', jsonFilePath: string = ''): Promise<any> {
    const json: any = await csvToJSON({ checkType: true }).fromFile(csvFilePath);
    const jsonString: string = JSON.stringify(json, null, 2);
    jsonFilePath && (await fs.writeFileSync(jsonFilePath, jsonString));
    return json;
  }
  /**
   * Time
   */
  public convertTimeToMilliseconds(time: number = 0, unit: string = ''): number {
    if (unit === 'seconds') return time * 1000;
    if (unit === 'minutes') return time * 1000 * 60;
    if (unit === 'hours') return time * 1000 * 60 * 60;
    if (unit === 'days') return time * 1000 * 60 * 60 * 24;
  }

  public async download(url: string = '', path: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      request.head(url, (error, res) => {
        if (error) reject(error);
        if (!res) reject('res is undefined');
        if (!res.headers) reject('headers is undefined');

        const { headers = {} } = res;
        const type = headers['content-type'] || '';
        const length = headers['content-length'] || '';
        console.log('CONTENT-TYPE:', type);
        console.log('CONTENT-LENGTH:', length);

        if (!type) reject('content type is undefined');
        if (!length) reject('content length is undefined');

        request(url)
          .pipe(fs.createWriteStream(path))
          .on('close', error => {
            if (error) reject(error);
            resolve('DONE');
          });
      });
    });
  }

  public async convertJSONtoCSV(list: Array<any>, path: string = ''): Promise<string> {
    try {
      const [first = {}] = list;
      const headers: Array<string> = Object.keys(first);
      const header: string = headers.join(',');
      const rows: string = list
        .map(item => {
          const row: string = headers
            .map(header => {
              const cell: string = (item[header] || '').toString();
              return cell.includes(',') ? `"${cell.replace(/"/g, "'")}"` : cell;
            })
            .join(',');
          return row;
        })
        .join('\n');
      const data: string = `${header}\n${rows}`;
      if (path) await fs.writeFileSync(path, data);
      return data;
    } catch (error) {
      const message = error.stack;
      console.error(message);
      return '';
    }
  }

  public detectBrowser(userAgent: string): string {
    if (userAgent.indexOf('Chrome') !== -1) return 'Google Chrome';
    if (userAgent.indexOf('Firefox') !== -1) return 'Mozilla Firefox';
    if (userAgent.indexOf('MSIE') !== -1) return 'Internet Exploder';
    if (userAgent.indexOf('Edge') !== -1) return 'Internet Exploder';
    if (userAgent.indexOf('Safari') !== -1) return 'Safari';
    if (userAgent.indexOf('Opera') !== -1) return 'Opera';
    if (userAgent.indexOf('YaBrowser') !== -1) return 'YaBrowser';
    return 'Others';
  }

  public parseJSON(string: string, fallback: any = {}) {
    try {
      return JSON.parse(string);
    } catch (error) {
      console.error(`parseJSON error`, error);
      return fallback;
    }
  }

  public uuid(): string {
    return uuidv4();
  }

  public processPublishedDate(publishedDate): Record<string, number> {
    const months: Array<string> = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const [day = '', dateTime = ''] = publishedDate.split(',').map((str: string) => str.trim());
    let [dateString = '0', monthString = '', yearString = '0', time = ''] = dateTime
      .split(' ')
      .map((str: string) => str.trim());
    const date: number = parseInt(dateString, 10);
    const month: number = (months.indexOf(monthString) || 0) + 1;
    const year: number = parseInt(yearString, 10);
    const [hoursString = '0', minutesString = '0', secondsString = '0'] = time
      .split(':')
      .map((str: string) => str.trim());
    const hours: number = parseInt(hoursString, 10);
    const minutes: number = parseInt(minutesString, 10);
    const seconds: number = parseInt(secondsString, 10);
    const timestamp: number = new Date(year, month - 1, date, hours, minutes, seconds, 0).getTime();
    return { year, month, date, hours, minutes, seconds, timestamp };
  }
}
