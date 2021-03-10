'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import Base from './base';

export default class Sacombank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const url: string = 'https://www.sacombank.com.vn/company/Pages/ty-gia.aspx';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: cheerio.Root = cheerio.load(body);
          const rates = $('.table-responsive table.table tbody tr.tr-items')
            .get()
            .map(item => {
              const $item = $(item);
              const code: string = $item.find('td:nth-child(1)').text().trim() || '';
              const regex: RegExp = /[&#.-]/g;
              const buyCash =
                parseFloat(
                  $item.find('td:nth-child(2)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const buyTransfer =
                parseFloat(
                  $item.find('td:nth-child(3)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const sellTransfer = parseFloat(
                $item.find('td:nth-child(4)').text().trim().replace(regex, '').replace(/,/g, '.')
              );
              const sellCash =
                parseFloat(
                  $item.find('td:nth-child(5)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              return { code, buyCash, buyTransfer, sellTransfer, sellCash };
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
                (sellTransfer || sellCash)
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
