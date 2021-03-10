'use strict';

import puppeteer from 'puppeteer';

import Base from './base';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

export default class NCB extends Base {
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
      const url: string = 'https://www.ncb-bank.vn/vi/ty-gia-tien-te';
      await page.goto(url, { waitUntil: 'networkidle0' });
      // await page.waitForNavigation({ waitUntil: 'networkidle0' });

      const data = await page.$$eval('.tb-tygia table.tb-content tbody tr', rows =>
        rows.map((row: Record<string, any>) => {
          return row.innerText.split('\t');
        })
      );

      rates = data
        .map(cells => {
          const [
            nameCell = '',
            codeCell = '',
            buyCashCell = '',
            buyTransferCell = '',
            sellTransferCell = '',
            sellCashCell = ''
          ] = cells;
          const code = codeCell.trim().slice(0, 3) || '';
          const regex = /[&#.-]/g;
          const buyCash = parseFloat(buyCashCell.trim().replace(regex, '').replace(/,/g, '.')) || 0;
          const buyTransfer =
            parseFloat(buyTransferCell.trim().replace(regex, '').replace(/,/g, '.')) || 0;
          const sellTransfer =
            parseFloat(sellTransferCell.trim().replace(regex, '').replace(/,/g, '.')) || 0;
          const sellCash =
            parseFloat(sellCashCell.trim().replace(regex, '').replace(/,/g, '.')) || 0;
          return { code, buyCash, buyTransfer, sellCash, sellTransfer };
        })
        .filter(rate => {
          const { code = '', buyCash = 0, buyTransfer = 0, sellCash = 0, sellTransfer = 0 } = rate;
          return (
            code && codes.includes(code) && (buyCash || buyTransfer) && (sellCash || sellTransfer)
          );
        })
        .sort((a, b) => (a.code > b.code ? 1 : -1));

      console.log('MCB getForexRates() rates', rates);
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
