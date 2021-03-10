'use strict';

import fetch from 'node-fetch';

import Base from './base';

export default class SeABank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const d: Date = new Date();
    const cacheBuster: number = d.getTime();
    const url: string = `https://microservices01.seabank.com.vn/microserviceWebsite/web-api/getRate?cacheBuster=${cacheBuster}`;
    console.log('SeABank getForexRates() url', url);
    return new Promise(resolve => {
      fetch(url, { headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then((res = {}) => {
          const { rates = [] } = res;
          const _rates = rates
            .map(rate => {
              const {
                ccy: code,
                nameVI = '',
                nameEN = '',
                buyRateCash = '',
                buyRateTrans = '',
                sellRateCash = '',
                sellRateTrans = ''
              } = rate;
              const name: string = nameVI || nameEN;
              const buyCash: number = parseFloat(buyRateCash) || 0;
              const buyTransfer: number = parseFloat(buyRateTrans) || 0;
              const sellCash: number = parseFloat(sellRateCash) || 0;
              const sellTransfer: number = parseFloat(sellRateTrans) || 0;
              return { code, name, buyCash, buyTransfer, sellCash, sellTransfer };
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
          resolve(_rates);
        })
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
