'use strict';

import cheerio from 'cheerio';
import fetch, { Response } from 'node-fetch';

import { ITanVietOptions } from '../../models/interfaces';

export default class TanViet {
  private periods = { yearly: 1, quarterly: 2 };

  public async getFinancialIndicatores(symbol: string, options: ITanVietOptions): Promise<any> {
    const self = this;
    const { periods } = self;
    const d: Date = new Date();
    const currentYear: number = d.getFullYear();
    const now: number = d.getTime();
    const { year = currentYear, industry = '', period = 'yearly', unit = 1000 } = options;
    const endpoint = industry === 'bank' ? 'chitieutaichinhbank' : 'chitieutaichinh';
    const p = periods[period];
    const queryParams = `symbol=${symbol}&YearView=${year}&period=${p}&donvi=${unit}&_=${now}`;
    const url = `https://finance.tvsi.com.vn/Enterprises/${endpoint}?${queryParams}`;
    const data: Response = await fetch(url);
    const $ = cheerio.load(await data.text());

    const table = $('table tbody tr')
      .get()
      .map(item => {
        const cells: Array<any> = $(item)
          .find('td')
          .get()
          .map(cell => {
            const text: string = $(cell).text().trim();
            if (isNaN(parseFloat(text))) return text;
            return parseFloat(text);
          });
        return cells;
      });

    if (!table.length) return { keys: [], indexes: [] };

    const tableHeaders = table[0];

    const tableRows = table.splice(1);

    const chosenPeriod = period;
    const indexes = tableRows
      .map(row => {
        const key: string = row[0];
        const rowContent = row.splice(1);
        const headerContent = tableHeaders.slice(1);
        const data = rowContent
          .map((value, index) => {
            const period = headerContent[index];
            return { period, value };
          })
          .filter(item => {
            const { period, value } = item;
            return period && value;
          })
          .map(item => {
            const { period, value } = item;
            let quarter = 0;
            let year = 0;
            if (chosenPeriod === 'yearly') {
              year = parseInt(period, 10);
            } else if (chosenPeriod === 'quarterly') {
              const [qq, yyyy] = period.split(' ');
              quarter = parseInt(qq[1], 10) || 0;
              year = parseInt(yyyy, 10);
            }
            if (period) return { period, year, quarter, value };
          });

        return { key, data };
      })
      .filter(row => {
        const { data } = row;
        return data.length;
      });

    const keys = indexes.map(row => row.key);

    return { keys, indexes };
  }

  public async getFinancialIndicator(key: string, symbol: string, options: ITanVietOptions = {}) {
    const self = this;
    const { keys, indexes } = await self.getFinancialIndicatores(symbol, options);
    if (!keys.includes(key)) return [];
    const { data } = indexes.find(index => index.key === key);
    return data;
  }
}
