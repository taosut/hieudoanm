'use strict';

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import Base from './base';

export default class DongABank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const url: string =
      'https://kinhdoanh.dongabank.com.vn/widget/temp/?p_p_id=DTSCDongaBankEView_WAR_DTSCDongaBankIERateportlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          const $: any = cheerio.load(body);
          const rates = $('#exchange-container table tbody tr')
            .get()
            .map(item => {
              const $item = $(item);
              const code = $item.find('td:nth-child(2)').text().trim().slice(0, 3) || '';
              const regex = /[&#.-]/g;
              const buyCash =
                parseFloat(
                  $item.find('td:nth-child(3)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const buyTransfer =
                parseFloat(
                  $item.find('td:nth-child(4)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const sellCash =
                parseFloat(
                  $item.find('td:nth-child(5)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              const sellTransfer =
                parseFloat(
                  $item.find('td:nth-child(6)').text().trim().replace(regex, '').replace(/,/g, '.')
                ) || 0;
              return { code, buyCash, buyTransfer, sellCash, sellTransfer };
            })
            .filter((rate: Record<string, any> = {}) => {
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
}
