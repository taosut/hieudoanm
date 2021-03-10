'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default class Techcombank {
  public async getForexRates(): Promise<Array<any>> {
    const url: string =
      'https://www.techcombank.com.vn/tools-utilities/exchange-rate/foreign-exchange';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: cheerio.Root = cheerio.load(body);
          const allRates = $('.table-responsive table tbody tr')
            .get()
            .map(item => {
              const $item = $(item);
              const code: string =
                $item
                  .find('td:nth-child(1) strong')
                  .text()
                  .trim()
                  .slice(0, 3)
                  .replace(/[0-9]/g, '')
                  .toUpperCase() || '';
              const regex: RegExp = /[&#,-]/g;
              const buyCash: number =
                parseFloat($item.find('td:nth-child(2) strong').text().trim().replace(regex, '')) ||
                0;
              const buyTransfer: number =
                parseFloat($item.find('td:nth-child(3) strong').text().trim().replace(regex, '')) ||
                0;
              const sellCash: number =
                parseFloat($item.find('td:nth-child(4) strong').text().trim().replace(regex, '')) ||
                0;
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
                code !== 'GOL' &&
                code.length === 3 &&
                (buyCash || buyTransfer) &&
                (sellCash || sellTransfer)
              );
            });
          const codes = allRates
            .map(rate => rate.code)
            .filter((code, index, array) => array.indexOf(code) === index)
            .sort();
          const rates = codes.map(code => allRates.find(rate => rate.code === code));
          resolve(rates);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
