'use strict';

import fetch from 'node-fetch';

import Base from './base';

export default class UOB extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const url: string = 'https://www.uob.com.vn/data-api-rates-vn/data-api/forex-vn?lang=en_VN';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then((res = {}) => {
          const { types = [] } = res;
          const rates = types
            .map(type => {
              const {
                code = '',
                currency: name = '',
                bankBuy = '',
                bankSell = '',
                bankBuyOD = ''
              } = type;
              const regex: RegExp = /[&#,-]/g;
              const buyCash: number = parseFloat(bankBuyOD.replace(regex, '').trim()) || 0;
              const buyTransfer: number = parseFloat(bankBuy.replace(regex, '').trim()) || 0;
              const sellCash: number = parseFloat(bankSell.replace(regex, '').trim()) || 0;
              const sellTransfer: number = sellCash;
              return { code, name, buyTransfer, buyCash, sellCash, sellTransfer };
            })
            .filter(rate => {
              const {
                code = '',
                buyTransfer = 0,
                sellCash = 0,
                buyCash = 0,
                sellTransfer = 0
              } = rate;
              return (
                code &&
                codes.includes(code) &&
                (buyTransfer || buyCash) &&
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
