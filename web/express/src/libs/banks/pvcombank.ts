'use strict';

import fetch from 'node-fetch';
import xml2json from 'xml2json';

import Base from './base';

export default class PVcomBank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const url: string = 'https://www.pvcombank.com.vn/api/exchange-rate';
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.text())
        .then((body: string) => {
          console.log(body);
          try {
            const jsonString = xml2json.toJson(body);
            const data = this.parseJSON(jsonString, {});
            const { ExchangeRateResponse = {} } = data;
            const { ExchangeRateInfo = [] } = ExchangeRateResponse;
            const rates = ExchangeRateInfo.map(item => {
              const { Currency: code = '', ExchangeRate = [] } = item;
              const buyCash: number = parseFloat(ExchangeRate[0]['BuyRate']) || 0;
              const sellCash: number = parseFloat(ExchangeRate[0]['SellRate']) || 0;
              const buyTransfer: number = parseFloat(ExchangeRate[1]['BuyRate']) || 0;
              const sellTransfer: number = parseFloat(ExchangeRate[1]['SellRate']) || 0;
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
                  code &&
                  codes.includes(code) &&
                  (buyCash || buyTransfer) &&
                  (sellCash || sellTransfer)
                );
              })
              .sort((a, b) => (a.code > b.code ? 1 : -1));
            resolve(rates);
          } catch (error) {
            console.error(error);
          }
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
