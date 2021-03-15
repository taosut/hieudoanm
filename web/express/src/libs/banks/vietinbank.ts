'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import Base from './base';

export default class Vietinbank extends Base {
  private get(url: string): Promise<Array<any>> {
    const { codes } = this;
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: any = cheerio.load(body);
          const rates: Array<any> = $('table#hor-ex-b tbody tr')
            .get()
            .map(item => {
              const $item: any = $(item);
              const code: string = $item.find('td:nth-child(1)').text().trim() || '';
              const regex: RegExp = /[&#,-]/g;
              const buyCash: number =
                parseFloat($item.find('td:nth-child(3)').text().trim().replace(regex, '')) || 0;
              const buyTransfer: number =
                parseFloat($item.find('td:nth-child(4)').text().trim().replace(regex, '')) || 0;
              const sellCash: number =
                parseFloat($item.find('td:nth-child(5)').text().trim().replace(regex, '')) || 0;
              const sellTransfer: number = sellCash;
              return { code, buyCash, buyTransfer, sellCash, sellTransfer };
            })
            .filter(rate => {
              const {
                code = '',
                buyCash = 0,
                buyTransfer = 0,
                sellCash = 0,
                sellTransfer = 0
              } = rate;
              return (
                code &&
                codes.includes(code) &&
                (buyCash || buyTransfer) &&
                (sellCash || sellTransfer)
              );
            })
            .sort((a, b) => (a.code > b.code ? 1 : -1));
          resolve(rates);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getForexRates(): Promise<Array<any>> {
    const url1: string = 'https://www.vietinbank.vn/web/home/vn/ty-gia/';
    const url2: string = 'https://www.vietinbank.vn/web/home/en/doc/saving/exrate.html';
    const rates1: Array<any> = await this.get(url1);
    const rates2: Array<any> = await this.get(url2);
    const rates: Array<any> = rates1 || rates2;
    return rates;
  }
}
