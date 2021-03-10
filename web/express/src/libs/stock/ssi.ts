'use strict';

import fetch from 'node-fetch';

import { IStockCompany } from '../../models/interfaces';

interface IPagination {
  offset?: number;
  size?: number;
}

interface IHistoryOptions {
  from?: number;
  to?: number;
  resolution?: string;
}

export default class SSI {
  private graphql: string = 'https://iboard.ssi.com.vn/gateway/graphql';

  public async getListedCompanies(): Promise<Array<IStockCompany>> {
    const self = this;
    const { graphql = '' } = self;
    const fields = [
      'stockNo',
      'stockSymbol',
      'exchange',
      'stockType',
      'refPrice',
      'avgPrice',
      'openPrice',
      'ceiling',
      'floor'
    ].join(' ');
    const markets = ['hose', 'hnx', 'upcom']; // options: fu
    const query = markets
      .map(market => {
        return `${market}: stockRealtimes(exchange: "${market}") { ${fields} }`;
      })
      .join(' ');
    const graphqlOptions = { operationName: null, query: `{ ${query} }`, variables: {} };
    return new Promise(resolve => {
      fetch(graphql, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {}, errors = [] } = res;
          if (errors.length) {
            console.error(errors);
            return resolve([]);
          }
          const keys = Object.keys(data).sort();
          let companies = [];
          for (const key of keys) {
            const list = data[key];
            companies = companies.concat(list);
          }
          companies = companies
            .filter(company => company.stockType === 's')
            .map(company => {
              let {
                stockNo,
                stockSymbol,
                exchange,
                stockType,
                refPrice = 0,
                avgPrice = 0,
                openPrice = 0,
                floor = 0,
                ceiling = 0
              } = company;
              avgPrice = avgPrice || 0;
              refPrice = refPrice || 0;
              openPrice = openPrice || 0;
              floor = floor || 0;
              ceiling = ceiling || 0;

              const symbol = stockSymbol.toUpperCase();
              const market = exchange.toUpperCase();
              const id = stockNo.toLowerCase();
              const type = stockType.toLowerCase();
              return { id, symbol, market, type, refPrice, avgPrice, openPrice, floor, ceiling };
            })
            .sort((a, b) => (a.symbol > b.symbol ? 1 : -1));

          return resolve(companies);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getSystemTime(): Promise<number> {
    const self = this;
    const { graphql = '' } = self;
    const graphqlOptions = { operationName: null, query: `{ systemTime }`, variables: {} };
    return new Promise(resolve => {
      fetch(graphql, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {} } = res;
          let { systemTime = 0 } = data;
          systemTime = parseInt(systemTime, 10) || 0;
          systemTime += 7 * 60 * 60 * 1000;
          resolve(systemTime);
        })
        .catch(error => {
          console.error(error);
          resolve(0);
        });
    });
  }

  public async getRealTimeStockByGroup(group: string): Promise<any> {
    group = group.toLowerCase().trim();
    const groups = ['vn30', 'hnx30', 'hose', 'hnx', 'upcom'];
    if (!groups.includes(group)) group = 'vn30';
    const self = this;
    const { graphql = '' } = self;
    const fields = [
      'stockNo',
      'ceiling',
      'floor',
      'refPrice',
      'stockSymbol',
      'stockType',
      'exchange',
      'matchedPrice',
      'matchedVolume',
      'priceChange',
      'priceChangePercent',
      'highest',
      'avgPrice',
      'lowest',
      'nmTotalTradedQty',
      'best1Bid',
      'best1BidVol',
      'best2Bid',
      'best2BidVol',
      'best3Bid',
      'best3BidVol',
      'best4Bid',
      'best4BidVol',
      'best5Bid',
      'best5BidVol',
      'best6Bid',
      'best6BidVol',
      'best7Bid',
      'best7BidVol',
      'best8Bid',
      'best8BidVol',
      'best9Bid',
      'best9BidVol',
      'best10Bid',
      'best10BidVol',
      'best1Offer',
      'best1OfferVol',
      'best2Offer',
      'best2OfferVol',
      'best3Offer',
      'best3OfferVol',
      'best4Offer',
      'best4OfferVol',
      'best5Offer',
      'best5OfferVol',
      'best6Offer',
      'best6OfferVol',
      'best7Offer',
      'best7OfferVol',
      'best8Offer',
      'best8OfferVol',
      'best9Offer',
      'best9OfferVol',
      'best10Offer',
      'best10OfferVol',
      'buyForeignQtty',
      'buyForeignValue',
      'sellForeignQtty',
      'sellForeignValue',
      'caStatus',
      'tradingStatus',
      'remainForeignQtty',
      'currentBidQty',
      'currentOfferQty',
      'session',
      '__typename'
    ].join(' ');
    const operationName = 'stockRealtimesByGroup';
    const graphqlOptions = {
      operationName,
      query: `query ${operationName}($group: String) {  ${operationName}(group: $group) { ${fields} }}`,
      variables: { group }
    };
    return new Promise(resolve => {
      fetch(graphql, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {} } = res;
          const { stockRealtimesByGroup = [] } = data;
          const result = stockRealtimesByGroup.map(item => {
            let {
              stockNo: id = '',
              ceiling = 0,
              floor = 0,
              refPrice = 0,
              stockSymbol: symbol = 0,
              matchedPrice = 0,
              matchedVolume = 0,
              priceChange = '0',
              priceChangePercent = '0',
              highest = 0,
              avgPrice = 0,
              lowest = 0,
              session = ''
            } = item;
            priceChange = parseFloat(parseFloat(priceChange || '0').toFixed(2));
            priceChangePercent = parseFloat(parseFloat(priceChangePercent || '0').toFixed(2));
            return {
              id,
              ceiling,
              floor,
              refPrice,
              symbol,
              matchedPrice,
              matchedVolume,
              priceChange,
              priceChangePercent,
              highest,
              avgPrice,
              lowest,
              session
            };
          });
          resolve(result);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getStockData(id: string): Promise<any> {
    const self = this;
    const { graphql = '' } = self;
    const fields1 = ['stockNo', 'price', 'vol', 'accumulatedVol', 'time', 'ref'].join(' ');
    const fields2 = [
      'stockNo',
      'ceiling',
      'floor',
      'avgPrice',
      'openPrice',
      'refPrice',
      'highest',
      'lowest'
    ].join(' ');
    const graphqlOptions = {
      operationName: 'leTables',
      query: `query leTables($stockNo: String) { leTables(stockNo: $stockNo) { ${fields1} } stockRealtime(stockNo: $stockNo) { ${fields2} }}`,
      variables: { stockNo: id }
    };
    return new Promise(resolve => {
      fetch(graphql, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {}, errors = [] } = res;
          if (errors.length) {
            console.error(errors);
            return resolve([]);
          }
          return resolve(data);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }

  public async getStockProfile(symbol: string): Promise<any> {
    const url: string = 'https://finfo-iboard.ssi.com.vn/graphql';
    const fields = [
      'symbol',
      'subsectorcode',
      'industryname',
      'supersector',
      'sector',
      'subsector',
      'foundingdate',
      'chartercapital',
      'numberofemployee',
      'banknumberofbranch',
      'companyprofile',
      'listingdate',
      'exchange',
      'firstprice',
      'issueshare',
      'listedvalue',
      'companyname'
    ];
    const graphqlOptions = {
      operationName: 'companyProfile',
      query: `query companyProfile($symbol: String!, $language: String) { companyProfile(symbol: $symbol, language: $language) { ${fields} }}`,
      variables: { symbol, language: 'vn' }
    };
    return new Promise(resolve => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {} } = res;
          const { companyProfile = {} } = data;
          const {
            symbol = '',
            industryname: industry = '',
            supersector = '',
            sector = '',
            subsector = '',
            exchange: market = '',
            companyname: name = '',
            listingdate = ''
          } = companyProfile;
          const [ld] = listingdate.split(' ');
          const listingDate = ld.split('/').reverse().join('-');
          const profile = {
            name,
            symbol,
            market,
            industry,
            supersector,
            sector,
            subsector,
            listingDate
          };
          resolve(profile);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }

  public async getSimilarIndustryCompanies(
    symbol: string,
    pagination: IPagination = {}
  ): Promise<Array<any>> {
    const { offset = 1, size = 100 } = pagination;
    const url: string = 'https://finfo-iboard.ssi.com.vn/graphql';
    const operationName = 'similarIndustryCompanies';
    const types: string = `($symbol: String!, $size: Int, $offset: Int, $language: String)`;
    const params: string = `(symbol: $symbol, size: $size, offset: $offset, language: $language)`;
    const query: string = `query ${operationName}${types} { ${operationName}${params} }`;
    const variables = { language: 'vn', offset, size, symbol };
    const graphqlOptions = { operationName, query, variables };
    return new Promise(resolve => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(graphqlOptions),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { data = {} } = res;
          const { similarIndustryCompanies = {} } = data;
          const { dataList = [] } = similarIndustryCompanies;
          const companies = dataList.map(item => {
            const { companyname: name, symbol } = item;
            return { name, symbol };
          });
          resolve(companies);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }

  public async getStockHistory(symbol: string, options: IHistoryOptions = {}): Promise<any> {
    const _to = Math.floor(Date.now() / 1000);
    const { from = 0, to = _to, resolution = '1D' } = options;
    const historyUrl = 'https://iboard.ssi.com.vn/dchart/api/history';
    const url: string = `${historyUrl}?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`;
    return new Promise(resolve => {
      fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          const { c = [], h = [], l = [], o = [], t = [], v = [] } = res;
          const length = c.length;
          let data = [];
          for (let i = 0; i < length; i++) {
            const close = parseFloat(c[i] || 0) || 0;
            const high = parseFloat(h[i] || 0) || 0;
            const low = parseFloat(l[i] || 0) || 0;
            const open = parseFloat(o[i] || 0) || 0;
            const timestamp = t[i] * 1000;
            const volume = parseFloat(v[i] || 0) || 0;
            const d: Date = new Date(timestamp);
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const date = d.getDate();
            data.push({ close, high, low, open, timestamp, volume, year, month, date });
          }
          resolve(data);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
}
