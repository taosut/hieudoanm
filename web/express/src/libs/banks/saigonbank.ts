'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import Base from './base';

export default class SaigonBank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const url: string = 'https://saigonbank.com.vn/vi/truy-cap-nhanh/ty-gia-ngoai-te';
    const timeout: number = 1000 * 60 * 6;
    return new Promise(resolve => {
      fetch(url, { timeout })
        .then(res => res.text())
        .then((body: string) => {
          const $: cheerio.Root = cheerio.load(body);
          const allRates = $('.j-paging-content table tbody tr.j-listitem')
            .get()
            .map(item => {
              const $item = $(item);
              const code: string =
                $item.find('td.j-listcell:nth-child(1)').text().trim().slice(0, 3) || '';
              const regex: RegExp = /[&#.-]/g;
              const buyCash: number =
                parseFloat(
                  $item
                    .find('td.j-listcell:nth-child(2)')
                    .text()
                    .trim()
                    .replace(regex, '')
                    .replace(/,/g, '.')
                ) || 0;
              const buyTransfer: number =
                parseFloat(
                  $item
                    .find('td.j-listcell:nth-child(3)')
                    .text()
                    .trim()
                    .replace(regex, '')
                    .replace(/,/g, '.')
                ) || 0;
              const sellCash: number =
                parseFloat(
                  $item
                    .find('td.j-listcell:nth-child(4)')
                    .text()
                    .trim()
                    .replace(regex, '')
                    .replace(/,/g, '.')
                ) || 0;
              const sellTransfer: number = sellCash;
              return { code, buyCash, buyTransfer, sellCash, sellTransfer };
            });
          const filterRates = allRates.filter(rate => {
            const {
              code = '',
              buyCash = 0,
              buyTransfer = 0,
              sellCash = 0,
              sellTransfer = 0
            } = rate;
            return (
              code && codes.includes(code) && (buyCash || buyTransfer) && (sellCash || sellTransfer)
            );
          });
          const _codes = filterRates
            .map(rate => rate.code)
            .filter((code, index, array) => array.indexOf(code) === index)
            .sort();
          const rates = _codes.map(code => filterRates.find(rate => rate.code === code));
          resolve(rates);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
