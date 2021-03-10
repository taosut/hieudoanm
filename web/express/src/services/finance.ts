'use strict';

import _ from 'lodash';

import { ssi, tanViet, utils, taskQueueProcessor, logger, telegramClient } from './../libs';
import {
  dsFinanceStockListedCompany,
  dsFinanceStockHistoryData,
  dsFinanceStockIndicator
} from '../data';

const TELEGRAM_CHAT_ID: number = parseInt(process.env.TELEGRAM_CHAT_ID || '0', 10) || 0;

export default class FinanceService {
  public async getTopRealTimeStock(): Promise<Array<Record<string, any>>> {
    const markets = ['VN30', 'HNX30'];
    let data: Array<Record<string, any>> = [];
    for (const market of markets) {
      let _data: Array<Record<string, any>> = await ssi.getRealTimeStockByGroup(market);
      _data = _data.map(item => {
        Object.assign(item, { market });
        return item;
      });
      data = data.concat(_data);
    }
    return data.sort((a, b) => (a.stockSymbol > b.stockSymbol ? 1 : -1));
  }

  private async getFromTime(symbol: string = ''): Promise<any> {
    const from: number = new Date(2000, 0, 1, 0, 0, 0, 0).getTime();
    if (!symbol) return Math.floor(from / 1000);
    const query = { symbol };
    const options = { sort: { timestamp: -1 } };
    let { timestamp = from } = await dsFinanceStockHistoryData.findOne(query, options);
    const oneDay = 24 * 60 * 60 * 1000;
    timestamp -= 14 * oneDay;
    return Math.floor(timestamp / 1000);
  }

  public async getHistoryFromDB(options: any = {}): Promise<any> {
    const now = Date.now();
    const defaultFrom = now - 60 * 60 * 24 * 365 * 1000;
    const defaultTo = now;
    const { symbol = '', from = defaultFrom, to = defaultTo } = options;
    const selectedFields = ['symbol', 'group', 'name', 'industry', 'subsector'];
    const companiesQuery = symbol ? { symbol } : {};
    const companies = await dsFinanceStockListedCompany.find(companiesQuery, {
      sort: { symbol: 1 },
      selectedFields
    });
    let symbols = companies.map(company => company.symbol);

    const query = { symbol: { $in: symbols }, timestamp: { $gte: from, $lte: to } };
    const mongoOptions = { sort: { from: 1 } };
    const docs: Array<any> = await dsFinanceStockHistoryData.find(query, mongoOptions);

    const data = symbols.map(symbol => {
      const { group = '', name = '', industry = '', subsector = '' } =
        companies.find(company => company.symbol === symbol) || {};
      const history = docs.filter(doc => doc.symbol === symbol);
      return { symbol, group, history, name, industry, subsector };
    });

    return data;
  }

  public async processHighlights(options: any): Promise<Array<any>> {
    const self = this;

    const now = Date.now();
    const defaultFrom = now - 1000 * 60 * 60 * 24 * 30;
    const defaultTo = now;
    const { from = defaultFrom, to = defaultTo } = options;
    const data: Array<any> = await self.getHistoryFromDB({ from, to });

    return data
      .map(item => {
        const {
          symbol = '',
          group = '',
          history = [],
          name = '',
          industry = '',
          subsector = ''
        } = item;
        if (!history.length) return {};

        const numberOfDates = history.length;
        history.sort((a: any, b: any) => a.timestamp - b.timestamp);

        const closeData: Array<number> = history.map((i: any) => i.close);

        const startItem = history[0] || {};
        const {
          close: start = 0,
          year: _startYear,
          month: _startMonth,
          date: _startDate
        } = startItem;
        const startDate = `${_startYear}-${utils.addZero(_startMonth)}-${utils.addZero(
          _startDate
        )}`;

        const {
          close: latest = 0,
          year: _latestYear,
          month: _latestMonth,
          date: _latestDate
        } = history[history.length - 1];
        const latestDate = `${_latestYear}-${utils.addZero(_latestMonth)}-${utils.addZero(
          _latestDate
        )}`;
        const average = parseFloat(
          (closeData.reduce((a, b) => a + b) / closeData.length).toFixed(2)
        );
        const median = utils.median(closeData);
        const max = Math.max(...closeData);
        const { year: _maxYear, month: _maxMonth, date: _maxDate } = history.find(
          item => item.close === max
        );
        const maxDate = `${_maxYear}-${utils.addZero(_maxMonth)}-${utils.addZero(_maxDate)}`;
        const min = Math.min(...closeData);
        const { year: _minYear, month: _minMonth, date: _minDate } = history.find(
          item => item.close === min
        );
        const minDate = `${_minYear}-${utils.addZero(_minMonth)}-${utils.addZero(_minDate)}`;
        const diff = parseFloat((max - min).toFixed(2));

        const diffToMin = parseFloat((latest - min).toFixed(2));
        const diffToMax = parseFloat((max - latest).toFixed(2));

        const low = latest < average;

        return {
          symbol,
          name,
          industry,
          subsector,
          group,
          latest,
          start,
          latestDate,
          startDate,
          diffToMin,
          diffToMax,
          diff,
          min,
          minDate,
          median,
          average,
          max,
          maxDate,
          low,
          numberOfDates
        };
      })
      .filter(item => !utils.isObjectEmpty(item));
  }

  public async processPotentials(options: any = {}): Promise<Array<any>> {
    const self = this;

    const now = Date.now();
    const defaultFrom = now - 1000 * 60 * 60 * 24 * 30;
    const defaultTo = now;
    const { from = defaultFrom, to = defaultTo } = options;

    const highlights: Array<any> = await self.processHighlights({ from, to });

    const numberOfDates = highlights
      .map((item: any) => item.numberOfDates || 0)
      .sort((a: number, b: number) => a - b)
      .reverse();
    const max: number = Math.max(...numberOfDates);
    const min = max - 2;

    const filterHighlights = highlights.filter(item => {
      const { numberOfDates = 0 } = item;
      return numberOfDates <= max || numberOfDates >= min;
    });

    const potentials = filterHighlights.filter(item => {
      const { diff, diffToMin } = item;
      return diffToMin <= 0.5 && diff >= 3;
    });

    return potentials;
  }

  private async getHistoryFromSSI(symbol: string): Promise<any> {
    const self = this;
    const from = await self.getFromTime(symbol);
    // const from = 0;
    const to = Math.floor(Date.now() / 1000);
    const resolution = '1D';
    const data: any = await ssi.getStockHistory(symbol, { from, to, resolution });
    return data;
  }

  public async importHistoryToDB(history: Array<any> = [], symbol: string): Promise<any> {
    const operations = history.map(item => {
      const { year, month, date, close, open, high, low, timestamp, volume } = item;
      const filter = { symbol, year, month, date };
      const update = { symbol, year, month, date, timestamp, close, open, high, low, volume };
      return { updateOne: { filter, update, upsert: true } };
    });
    await dsFinanceStockHistoryData.bulkWrite(operations);
  }

  public async syncHistoryBySymbol(symbol: string = ''): Promise<any> {
    const self = this;
    if (!symbol) return;
    let history = await self.getHistoryFromSSI(symbol);
    const len = history.length;
    if (!history.length) {
      const message = `\`${symbol}\` - (${len})`;
      return await telegramClient.sendMarkdownMessage(TELEGRAM_CHAT_ID, message);
    }
    await self.importHistoryToDB(history, symbol);
    const last: Record<string, any> = _.last(history);
    const first: Record<string, any> = _.first(history);
    const { year: lyear, month: lmonth, date: ldate } = last;
    const { year: fyear, month: fmonth, date: fdate } = first;
    const ld = `${lyear}-${utils.addZero(lmonth)}-${utils.addZero(ldate)}`;
    const fd = `${fyear}-${utils.addZero(fmonth)}-${utils.addZero(fdate)}`;
    const message = `\`${symbol}\` - (${fd} - ${ld}) (${len})`;
    await telegramClient.sendMarkdownMessage(TELEGRAM_CHAT_ID, message);
  }

  public async syncHistoryBySymbols(): Promise<void> {
    const self = this;

    const sort: any = { symbol: 1 };
    const selectedFields: Array<string> = ['symbol'];

    const companies: Array<any> = await dsFinanceStockListedCompany.find(
      {},
      { sort, selectedFields }
    );

    const max = 100;
    const concurrent = max / 2;
    await taskQueueProcessor.run(concurrent, max, () => {
      const company = companies.shift() || {};
      const { symbol = '' } = company;
      if (!symbol) return;
      logger.info(`companies left: ${companies.length}`);
      return self.syncHistoryBySymbol(symbol);
    });

    await self.sendPotentialStocks();
  }

  public async sendPotentialStocks(): Promise<void> {
    const self = this;
    const to = Date.now();
    const from = to - 1000 * 60 * 60 * 24 * 30;
    const potentials: Array<any> = await self.processPotentials({ from, to });
    potentials.sort((a, b) => (a.group > b.group ? 1 : -1));

    const message = potentials
      .map(({ symbol, group, latest, min, max }) => {
        return `${group} - ${symbol} - ${latest} - ${min} - ${max}`;
      })
      .join('\n');

    await telegramClient.sendMarkdownMessage(TELEGRAM_CHAT_ID, message);
  }

  public calculateProfit(buy: number = 0, sell: number = 0, volume: number = 0): number {
    return (sell - buy) * volume - (sell + buy) * volume * 0.0025 - sell * 0.1;
  }

  public async getBasicBEbyCompanies(
    companies: Array<any>,
    options: Record<string, any>
  ): Promise<any> {
    const self = this;
    const key = 'P/E cơ bản';
    return await self.getFinancialIndicatorByCompanies(key, companies, options);
  }

  public async getDilutedPEbyCompanies(
    companies: Array<any>,
    options: Record<string, any>
  ): Promise<any> {
    const self = this;
    const key = 'P/E pha loãng';
    return await self.getFinancialIndicatorByCompanies(key, companies, options);
  }

  public async getPBbyCompanies(companies: Array<any>, options: Record<string, any>): Promise<any> {
    const self = this;
    const key = 'Hệ số Giá Cổ phiếu/Trị giá Sổ sách (P/B)';
    return await self.getFinancialIndicatorByCompanies(key, companies, options);
  }

  public async getPSbyCompanies(companies: Array<any>, options: Record<string, any>): Promise<any> {
    const self = this;
    const key = 'Hệ số Giá Cổ phiếu/Doanh số trên cổ phiếu (P/S)';
    return await self.getFinancialIndicatorByCompanies(key, companies, options);
  }

  private async getFinancialIndicatorByCompanies(
    key: string,
    companies: Array<any>,
    options: Record<string, any>
  ): Promise<any> {
    return new Promise(resolve => {
      Promise.all(
        companies.map(async company => {
          let { symbol = '', industry } = company;
          industry = industry.toLowerCase() === 'ngân hàng' ? 'bank' : '';
          Object.assign(options, { industry });
          const res = await tanViet.getFinancialIndicator(key, symbol, options);
          const row = { symbol };
          res.forEach(item => {
            let { period, value } = item;
            period = period.replace(' ', '-');
            row[period] = value;
          });
          return row;
        })
      )
        .then(rows => {
          resolve(rows);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getStockIndicators(): Promise<any> {
    const d: Date = new Date();
    const month: number = d.getMonth() + 1;
    const quarter: number = month % 3 === 0 ? month / 3 - 1 : month % 3;
    const year: number = d.getFullYear();
    const list: Array<any> = await dsFinanceStockIndicator.find({ year, quarter });

    const keys: Array<string> = _.uniq(list.map(item => item.key)).sort();
    const symbols: Array<string> = _.uniq(list.map(item => item.symbol)).sort();

    return symbols.map((symbol: string) => {
      const o = { symbol };
      for (const key of keys) {
        const { value = 0 } = list.find(item => item.symbol === symbol && item.key === key) || {};
        o[key] = value;
      }
      return o;
    });
  }

  public async getCompanies(): Promise<any> {
    const self = this;
    const sort = { symbol: 1, group: 1, market: 1 };
    const selectedFields: Array<string> = [
      'symbol',
      'group',
      'market',
      'name',
      'industry',
      'sector',
      'supersector',
      'subsector',
      'listingDate'
    ];
    const excludedFields: Array<string> = ['_id'];
    const companies: Array<any> = await dsFinanceStockListedCompany.find(
      {},
      { sort, selectedFields, excludedFields }
    );
    const allIndicators = await self.getStockIndicators();

    return companies.map(company => {
      const { symbol } = company;
      const indicators = allIndicators.find(item => item.symbol === symbol) || {};
      return Object.assign(company, indicators);
    });
  }
}
