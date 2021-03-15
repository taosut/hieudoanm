'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import Base from './base';

export default class OCB extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const d: Date = new Date();
    const date: number = d.getDate();
    const month: number = d.getMonth() + 1;
    const year: number = d.getFullYear();
    const time: number = d.getTime();
    const url: string = `https://www.ocb.com.vn/vi/callchangerate?date=${date}&month=${month}&year=${year}&_=${time}`;
    console.log(`OCB getForexRates() url ${url}`);
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: any = cheerio.load(body);
          const rates = $('.content-table table tbody tr')
            .get()
            .map(item => {
              const $item = $(item);
              const code =
                $item.find('td:nth-child(1)').text().trim().slice(0, 3).toUpperCase() || '';
              const regex: RegExp = /[&#,-]/g;
              const buyCash: number =
                parseFloat(
                  $item.find('td:nth-child(2)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const buyTransfer: number =
                parseFloat(
                  $item.find('td:nth-child(3)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const sellTransfer: number =
                parseFloat(
                  $item.find('td:nth-child(4)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const sellCash =
                parseFloat(
                  $item.find('td:nth-child(5)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              return { code, buyCash, buyTransfer, sellCash, sellTransfer };
            })
            .filter(rate => {
              const {
                code = '',
                buyCash = 0,
                sellCash = 0,
                buyTransfer = 0,
                sellTransfer = 0
              } = rate;
              return (
                code !== 'GOL' &&
                code &&
                codes.includes(code) &&
                (buyCash || buyTransfer) &&
                (sellCash || sellTransfer)
              );
            })
            .sort((a, b) => (a.code > b.code ? 1 : -1));
          resolve(rates);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
