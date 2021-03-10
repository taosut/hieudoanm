'use strict';

import puppeteer from 'puppeteer';

import Base from './base';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

export default class MBBank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes = [] } = this;
    let browser = null;
    let rates: Array<Record<string, any>> = [];
    try {
      const headless: boolean = NODE_ENV !== 'development';
      browser = await puppeteer.launch({ headless, args: ['--no-sandbox', '--no-zygote'] });
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(300000);
      await page.setViewport({ width: 1280, height: 800 });
      const url: string = 'https://www.mbbank.com.vn/ExchangeRate';
      await page.goto(url, { waitUntil: 'networkidle0' });
      // await page.waitForNavigation({ waitUntil: 'networkidle0' });

      const data: Array<Array<string>> = await page.$$eval('table.table.table-fee tbody tr', rows =>
        rows.map((row: Record<string, any>) => {
          return row.innerText.split('\t');
        })
      );

      console.log('MBBank getForexRates() data', data);

      rates = data
        .map(cells => {
          const [
            codeCell = '',
            buyCashCell = '',
            buyTransferCell = '',
            sellCashCell = '',
            sellTransferCell = ''
          ] = cells;
          const code = codeCell.trim().slice(0, 3) || '';
          const regex: RegExp = /[&#,-]/g;
          const buyCash: number = parseFloat(buyCashCell.trim().replace(regex, '')) || 0;
          const buyTransfer: number = parseFloat(buyTransferCell.trim().replace(regex, '')) || 0;
          const sellCash: number = parseFloat(sellCashCell.trim().replace(regex, '')) || 0;
          const sellTransfer: number = parseFloat(sellTransferCell.trim().replace(regex, '')) || 0;
          return { code, buyCash, buyTransfer, sellCash, sellTransfer };
        })
        .filter(rate => {
          const { code = '', buyCash = 0, buyTransfer = 0, sellCash = 0, sellTransfer = 0 } = rate;
          return (
            code && codes.includes(code) && (buyCash || buyTransfer) && (sellCash || sellTransfer)
          );
        })
        .sort((a, b) => (a.code > b.code ? 1 : -1));

      console.log('MBBank getForexRates() rates', rates);
    } catch (error) {
      console.error(error);
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }

    return rates;
  }
}
