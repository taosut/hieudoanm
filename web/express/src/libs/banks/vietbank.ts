'use strict';

import fetch from 'node-fetch';

import Base from './base';

export default class VietBank extends Base {
  public async getForexRates(): Promise<Array<any>> {
    const { codes } = this;
    const d: Date = new Date();
    const dd: string = this.addZero(d.getDate());
    const mm: string = this.addZero(d.getMonth() + 1);
    const yyyy: string = d.getFullYear().toString();
    const date: string = `${mm}/${dd}/${yyyy}`;
    const counttime: string = await this.getCountTime(date);
    const url: string = `https://www.vietbank.com.vn/api/ApiSupport/getfiltercurrency?date=${date}&counttime=${counttime}`;
    console.log('VietBank getForexRates() url', url);
    return new Promise(resolve => {
      fetch(url)
        .then(res => res.json())
        .then((res = []) => {
          const rates = res
            .map((item: Record<string, any> = {}) => {
              const {
                currencyCode: code = '',
                buyCash = '',
                saleTransfer = '',
                buyTransfer = '',
                saleCash = ''
              } = item;
              const regex = /[&#,-]/g;
              const _buyCash = parseFloat(buyCash.replace(regex, '').trim()) || 0;
              const _buyTransfer = parseFloat(buyTransfer.replace(regex, '').trim()) || 0;
              const sellCash = parseFloat(saleCash.replace(regex, '').trim()) || 0;
              const sellTransfer = parseFloat(saleTransfer.replace(regex, '').trim()) || 0;
              return { code, buyCash: _buyCash, buyTransfer: _buyTransfer, sellCash, sellTransfer };
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
        .catch((error: Error) => {
          console.error(error);
          resolve([]);
        });
    });
  }

  private async getCountTime(date: string): Promise<string> {
    const url: string = `https://www.vietbank.com.vn/api/ApiSupport/getcountupdatecurrencywheredate?date=${date}`;
    const data: string = (await fetch(url).then(res => res.text())) || '0';
    return data;
  }
}
